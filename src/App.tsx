import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'
import { parseToJSON} from './parseBracketedStrings.ts'
import { JSX, useState } from "react";
import { SentenceInput }from "./components/SentenceInput.tsx";
import CollapsibleCard from "./components/CollapsibleCard.tsx";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5158';

function parseNode(data: any): Node {
  const node = new Node(data.LHS, data.RHS.map(parseNode)); // Recursively create nodes
  return node;
}


const initialGrammarRules = [
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
"VP -> VP PP",
"NP -> D NBAR",
"NBAR -> A NBAR",
"NBAR -> A N"
];

const initialPOSRules = [
  "PN -> John",
  "PN -> Mary",
  "PN -> David",
  "PN -> Eve",
  "V1 -> loved",
  "V1 -> met",
  "V1 -> saw",
  "V0 -> fell",
  "V0 -> cried",
  "V0 -> ran",
  "V2 -> went",
  "V2 -> arrived",
  "V3 -> knew",
  "V3 -> said",
  "D -> the",
  "D -> a",
  "N -> man",
  "N -> woman",
  "N -> girl",
  "N -> child",
  "N -> bells",
  "N -> cat",
  "N -> dog",
  "N -> rabbit",
  "P -> with",
  "P -> to",
  "P -> from",
  "P -> for",
  "A -> pretty",
  "A -> big",
  "A -> small",
  "A -> cheap",
  "A -> expensive"
]

interface EarleyParserParameters
{
  GrammarRules : string[],
  PartOfSpeechRules : string[],
  Sentence : string
}

async function parseSentence(sentence : string, grammarRules : string[], POSRules : string[]) : Promise<string[]> 
{

  const bodyData : EarleyParserParameters = 
  {
    GrammarRules : grammarRules,
    PartOfSpeechRules : POSRules,
    Sentence : sentence
  }

  const response = await fetch(`${API_URL}/ParseSentence/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData) 
  });

  const data = (await response.json()) as string[];
  console.log(data);
  return data;

}
function App() {
  
  const [parsedSentence, setParsedSentence] = useState<string[]|null>(null);
  const [POSRules, setPOSRules] = useState<string[]>(initialPOSRules);
  const [grammarRules, setGrammarRules] = useState<string[]>(initialGrammarRules);

  void function ToSetPOSRules()
  {
    setPOSRules([]);
    setGrammarRules([]);
  }
  async function handleSetSentence(sentence : string) : Promise<void>
  {
    const results : string[] = await parseSentence(sentence, grammarRules, POSRules);
    if (results.length > 0 )
    {
      setParsedSentence(results);
    }
    else
    {
      setParsedSentence(null);
    }
}

  let svg : JSX.Element;

  if (parsedSentence != null)
  {
    const treee = parseToJSON(parsedSentence[0]);
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
            <CollapsibleCard title="Grammar Rules" rules={grammarRules}/>
            <CollapsibleCard title="Vocabulary" rules={POSRules} />
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


