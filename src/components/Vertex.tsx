import { JSX } from "react";
import { Node } from "./Rule.ts";


interface VertexProps 
{
    node : Node;
    depth : number;
    children?: React.ReactNode;
}
export default function Vertex( { node, depth} : VertexProps): JSX.Element {
    const lhs :string = node.LHS;
    const paddedLHS = lhs.padStart(lhs.length + depth*4, "-");
    const currentDepth : number = depth;
    console.log(paddedLHS);
    console.log(currentDepth);
    return (
    <>
    <p>{paddedLHS}</p>
        {node.RHS && node.RHS.length > 0 &&
            node.RHS.map(x => <Vertex node = {x} depth={currentDepth+1}></Vertex>)
        }
    </>
    )
}