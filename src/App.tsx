import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'
import { parseToJSON} from './parseBracketedStrings.ts'
import { JSX, useState } from "react";
import { SentenceInput }from "./components/SentenceInput.tsx";
import CollapsibleCard from "./components/CollapsibleCard.tsx";

function parseNode(data: any): Node {
  const node = new Node(data.LHS, data.RHS.map(parseNode)); // Recursively create nodes
  return node;
}


const grammarRules = [
  "START -> T1",
"T1 -> NP VP",
"VP -> V0",
"VP -> V1 NP",
"VP -> V2 PP", 
"VP -> V3 T1",
"PP -> P NP",
"NP -> D N",
"NP -> PN",
"NP -> NP PP",
"VP -> VP PP"
];

const PartOfSpeechRules = [
  "PN -> John",
  "V1 -> loved",
  "D -> the",
  "N -> girl",
  "P -> with",
  "N -> bells"
]

interface EarleyParserParameters
{
  GrammarRules : string[],
  PartOfSpeechRules : string[],
  Sentence : string
}

async function parseSentence(sentence : string) : Promise<string[]> 
{

  const bodyData : EarleyParserParameters = 
  {
    GrammarRules : grammarRules,
    PartOfSpeechRules : PartOfSpeechRules,
    Sentence : sentence
  }

  const url = "http://localhost:5158/";
  const response = await fetch(url+"ParseSentence/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData) 
  });

  const data = (await response.json()) as string[];
  console.log(data);
  return data;

}
function App() {
  
  const [data, setData] = useState<string[]|null>(null);

  async function handleSetSentence(sentence : string) : Promise<void>
{
  const results : string[] = await parseSentence(sentence);
  if (results.length > 0 )
  {
    setData(results);
  }
  else
  {
    setData(null);
  }
}

  let svg : JSX.Element;

  if (data != null)
  {
    const treee = parseToJSON(data[0]);
    const node : Node = parseNode(treee);
    node.assignDepths(0);
    const width = node.assignWidths(0);
    const depth : number = node.getMaxDepth();
    const svgWidth : number = 800;
    const svgHeight : number = 600;
    const spacingX : number = svgWidth / (width -1);
    const spacingY : number = svgHeight / (depth -1);

    svg = <svg width={svgWidth} height={svgHeight} viewBox={`-50 -50 ${svgWidth+100} ${svgHeight+100}`} xmlns="http://www.w3.org/2000/svg"> 

    <Vertex node = {node} spacing = {[spacingX, spacingY]}> </Vertex>
   </svg>;
  }
  else
  {
    svg = <p> No parse tree found ... </p>;
  }


   

  return (
    
    <>
    <div className="container">
      <SentenceInput aria-label='sentence' onSubmit={handleSetSentence}/> 
    </div>
    <div className="content">

        <div className="sidebar">
              
            <CollapsibleCard title="Grammar Rules" />
            <CollapsibleCard title="Vocabulary" />
        </div>

        <div className="parse-tree">
          <h3>Parse Tree</h3>
          {svg}
        </div>

    </div>
    </> 
  )
}

export default App


