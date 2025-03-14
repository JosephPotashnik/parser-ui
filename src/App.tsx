import './App.css'
import Vertex from './components/Vertex.tsx'
import { Node } from './components/Rule.ts'

function parseNode(data: any): Node {
  const node = new Node(data.LHS, data.RHS.map(parseNode)); // Recursively create nodes
  return node;
}

function App() {
  const tree = {
    "LHS": "START",
    "RHS": [
      {
        "LHS": "NP",
        "RHS": [
          {
            "LHS": "D",
            "RHS": [
              {
                LHS: "The",
                RHS: []
              }
            ]
          },
          {
            "LHS": "N",
            "RHS": [
              {
                LHS: "man",
                RHS: []
              }
            ]
          }
        ]
      },
      {
        "LHS": "VP",
        "RHS": [
          {
            "LHS": "V",
            "RHS": [
              {
                LHS: "saw",
                RHS: []
              }
            ]
          },
          {
            "LHS": "NP",
            "RHS": [
              {
                LHS: "Mary",
                RHS: []
              }
            ]
          }
        ]
      }
    ]
  }

  const node : Node = parseNode(tree);
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
