import { JSX } from "react";
import { Node } from "./Rule.ts";


interface VertexProps 
{
    node : Node;
    parentCoords? : [number, number];
    spacing : [number, number];
    children?: React.ReactNode;
}
export default function Vertex({ node, parentCoords, spacing }: VertexProps): JSX.Element {

    const x =  spacing[0] * (node.x_loc-1);
    const y = spacing[1] * (node.y_loc);
    let children;
if (node.RHS && node.RHS.length === 1 && node.RHS[0].RHS.length === 0) {
    children = (
        <text x={x-10} y={y + 25} fontSize="14" fill="black" alignmentBaseline="middle">
            {node.RHS[0].LHS}
        </text>
    );
} else if (node.RHS && node.RHS.length > 0) {
    children = node.RHS.map((n, index) => (
        <Vertex key={index} node={n} parentCoords={[x, y]} spacing={spacing} />
    ));
}


    return (
        <g>
           {parentCoords && (
                <line x1={parentCoords[0]} y1={parentCoords[1]} x2={x} y2={y} stroke="black" strokeWidth="2" />
            )}

            <circle cx={x} cy={y} r="10" fill="blue" stroke="black" strokeWidth="2" />

            <text x={x + 15} y={y} fontSize="14" fill="black" alignmentBaseline="middle">{node.LHS}</text>

            {children}
        </g>
    );
}