type ParsetreeLeaf = string
type ParseTreeNonLeaf = { [index: string]: ParsetreeNode; }

type ParsetreeNode = ParsetreeLeaf | ParseTreeNonLeaf
type ParseTree = ParsetreeNode

//  Given a ParseTree generated from loading a parsetree in yaml, and a position
// calculate the list of same span paths that lead to it and breakit in its components

//  same span paths : [ "TOP/statementlist.0.9", "statement/EXPR/value/number/integer/decint.1.3" ]
// components : [ 
//     [ path: [ "TOP", "statementlist"], span: [0, 9]] , 
//      [ path: [ "statement", "EXPR", "value", "number", "integer", "decint" ], span:[1,3]]

export interface Crumbs {
    span: number[]
    components: string[][]

}

export function calcCrumbs(node: ParseTree, pos: number) : Crumbs {
    const path : string[] = []
    const components : string[][] = []
    let span : number[]
    
    recurse(node, pos)
    for (const subpath in path) {
        const re = /[\w-]+/g
        components.push(subpath.match(re) as string[])
    } 
    return { span: span , components }

    function recurse(node: ParsetreeNode, pos: number) : void {
        if (typeof node == 'string') return
        for (const key in node) {
                        const m = key.match(/(.*?).(\d+)\.(\d+)/) as RegExpMatchArray
            if (+m[2] <= pos && pos <= +m[3]) {
                path.push(m[0])
                if (node[key] == null) return
                recurse(node[key], pos)
                break
            }
        }
        return
    }
}


