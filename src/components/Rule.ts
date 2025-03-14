export class Rule {
    LHS : string;
    RHS : string[];

    constructor(LHS : string, RHS : string[])
    {
        this.LHS = LHS;
        this.RHS = [...RHS];
    }

}

export class Node {
    LHS : string;
    RHS : Node[];

    constructor(LHS : string, RHS : Node[])
    {
        this.LHS = LHS;
        this.RHS = [...RHS];
    }

}