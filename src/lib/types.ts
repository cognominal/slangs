// A path is a list of list of rulenames with the same span
export type Path = string[][] 


export type RuleLongName = string
export type RuleName = string
export type FactorizeRule =  ( ) => string | false

type FactorizeForRuleName = {
    [index: RuleLongName]: FactorizeRule[]
}
export type FactorizeTree = {
    [index: RuleName]: FactorizeForRuleName
}

export type ParsetreeLeaf = string
export type ParsetreeNonLeaf = { [index: string]: ParsetreeNode; }

export type ParsetreeNode = ParsetreeLeaf | ParsetreeNonLeaf
export type Parsetree = ParsetreeNode

// crumbs allow

export type SameSpanSubPath = {
    span: number[]; // from, to
    rules: string[];

}
export type Crumbs = SameSpanSubPath[]  


// export type Crumbs = {
//     span: number[]
//     components: Path
// }   


