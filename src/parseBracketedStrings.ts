export class MyTreeNode {
    LHS! : string;
    RHS! : MyTreeNode[];
}
export function parseToJSON(str: string): MyTreeNode {
  function parseRecursive(s: string): MyTreeNode {
    s = s.trim();
    if (s === '') return { LHS: '', RHS: [] };
    if (!s.startsWith('(')) return { LHS: s, RHS: [] };

    let stripped = s.slice(1, -1).trim();
    let spaceIndex = stripped.indexOf(' ');
    let LHS = stripped.slice(0, spaceIndex);
    let RHS: MyTreeNode[] = [];

    let rest = stripped.slice(spaceIndex + 1).trim();
    let stack: string[] = [];
    let current = '';

    for (let i = 0; i < rest.length; i++) {
      if (rest[i] === '(') {
        stack.push('(');
      } else if (rest[i] === ')') {
        stack.pop();
      }
      current += rest[i];
      
      if (stack.length === 0 && (rest[i] === ')' || i === rest.length - 1)) {
        RHS.push(parseRecursive(current.trim()));
        current = '';
      }
    }

    return { LHS, RHS };
  }

  return parseRecursive(str);
}

// export function jsonToBracketString(json: MyTreeNode): string {
//   // Base case: if the JSON object has no RHS, it's a terminal (simple word)
//   if (json.RHS.length === 0) {
//     return json.LHS; // Return the terminal word without brackets
//   }

//   // Otherwise, construct the bracketed string
//   let rhsString = json.RHS.map((sub: MyTreeNode) => jsonToBracketString(sub)).join(' ');
//   return `(${json.LHS} ${rhsString})`; // Only add brackets here, not inside the map
// }