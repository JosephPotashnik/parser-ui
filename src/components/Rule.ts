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
    y_loc : number;
    x_loc : number;

    constructor(LHS : string, RHS : Node[])
    {
        this.LHS = LHS;
        this.RHS = [...RHS];
        this.x_loc = 0;
        this.y_loc = 0;
    }
      
    assignDepths(currentDepth : number) : void
    {
        this.y_loc = currentDepth;
        this.RHS.map((x : Node) => x.assignDepths(currentDepth+1))
    }

    assignWidths(currentWidth : number) : number
    {
        if (this.RHS && this.RHS.length > 0)
        {
            if (this.RHS.length == 1)
            {

                const widthOfOnlyChild : number = this.RHS[0].assignWidths(currentWidth);
                currentWidth = widthOfOnlyChild;
                this.x_loc = this.RHS[0].x_loc;
                return currentWidth;
            }
            else
            {
                const widthOfFirstChild = this.RHS[0].assignWidths(currentWidth);
                currentWidth = widthOfFirstChild + 1;
                this.x_loc = currentWidth;

                for(let i = 1;i<this.RHS.length;i++)
                {
                    currentWidth = this.RHS[i].assignWidths(currentWidth);
                }
                return currentWidth;
            }
        }
        else
        {
            this.x_loc = currentWidth + 1;
            return this.x_loc;
        }
        
    }

    getMaxDepth() : number
    {
        if (this.RHS && this.RHS.length)
        {
            let maxDepth = 0;
            for(let i = 0;i<this.RHS.length;i++)
            {
                const depthFromChild = this.RHS[i].getMaxDepth();
                if (depthFromChild > maxDepth)
                {
                    maxDepth = depthFromChild;
                }
            }
            return maxDepth + 1; //depth of current node is depth of deepest child + 1.
        }
        else
        {
            return 1;
        }
    }
}