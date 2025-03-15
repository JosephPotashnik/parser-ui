import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'
import { parseToJSON, jsonToBracketString} from './parseBracketedStrings.ts'

function parseNode(data: any): Node {
  const node = new Node(data.LHS, data.RHS.map(parseNode)); // Recursively create nodes
  return node;
}

function App() {
  
  const str1 = "(START (T1 (NP (PN John)) (VP (VP (V1 loved) (NP (D the) (N girl))) (PP (P with) (NP (D the) (N bells))))))";
  //const str1 = "(START (T1 (NP (PN John)) (VP (V1 loved) (NP (NP (D the) (N girl)) (PP (P with) (NP (D the) (N bells)))))))";
  const treee = parseToJSON(str1);

  const node : Node = parseNode(treee);
  node.assignDepths(0);
  const width = node.assignWidths(0);
  const depth : number = node.getMaxDepth();
  const svgWidth : number = 800;
  const svgHeight : number = 600;
  const spacingX : number = svgWidth / (width -1);
  const spacingY : number = svgHeight / (depth -1);

  return (
    <>
   <svg width={svgWidth} height={svgHeight} viewBox={`-50 -50 ${svgWidth+100} ${svgHeight+100}`} xmlns="http://www.w3.org/2000/svg"> 

      <Vertex node = {node} spacing = {[spacingX, spacingY]}> </Vertex>
     </svg>
    </> 
  )
}

export default App
