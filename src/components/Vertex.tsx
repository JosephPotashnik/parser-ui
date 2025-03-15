import { JSX } from "react";
import { Node } from "./Rule.ts";


interface VertexProps 
{
    node : Node;
    children?: React.ReactNode;
}
export default function Vertex( { node } : VertexProps): JSX.Element {
    const lhs :string = node.LHS;
    const paddedLHS = lhs.padStart(lhs.length + node.y_loc*4, "-");
    return (
    <>
    <p>{paddedLHS} width = {node.x_loc}</p>
        {node.RHS && node.RHS.length > 0 &&
            node.RHS.map(x => <Vertex node = {x} ></Vertex>)
        }
    </>
    )
}