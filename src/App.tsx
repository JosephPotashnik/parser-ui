import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'

function App() {
  const node4 = new Node("V", []);
  const node5 = new Node("NP", []);
  const node6 = new Node("D", []);
  const node7 = new Node("N", []);
  const node2 = new Node("NP", [node6, node7]);
  const node3 = new Node("VP", [node4, node5]);
  const node = new Node("START", [node2, node3]);

  const depth = 1;
  return (
    
    <>
      <h1>Vite + React</h1>
      {console.log(node)}
      <Vertex node = {node} depth ={depth}> </Vertex>
    </>
  )
}

export default App
