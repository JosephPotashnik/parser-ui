import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'
import tree from '../src/tree.json'

function parseNode(data: any): Node {
  const node = new Node(data.LHS, data.RHS.map(parseNode)); // Recursively create nodes
  return node;
}

function App() {
  
  const node : Node = parseNode(tree);
  node.assignDepths(0);
  node.assignWidths(0);
  const depth : number = node.getMaxDepth();
  return (
    
    <>
      <Vertex node = {node}> </Vertex>
      <p> depth of tree is {depth}</p>
    </>
  )
}

export default App
