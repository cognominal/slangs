type ParsetreeLeaf = string
type ParseTreeNonLeaf = { [index: string]: ParsetreeNode; }

type ParsetreeNode = ParsetreeLeaf | ParseTreeNonLeaf
type ParseTree = ParsetreeNode

//  Given a Parse Tree and a position
// calculate the list of same span paths that lead to it and breakit in its component
//  same span paths : [ "TOP/statementlist.0.9", "statement/EXPR/value/number/integer/decint.1.3" ]
// components : [ [ "TOP", "statementlist"] , [ "statement", "EXPR", "value", "number", "integer", "decint" ]]

export function calcCrumbs(node: ParsetreeNode, pos: number) : string[][] {
    const path : string[] = []
    const components : string[][] = []
    recurse(node, pos)
    for (const subpath in path) {
        const re = /[\w-]+/g
        components.push(subpath.match(re) as string[])
    } 
    return components

    function recurse(node: ParsetreeNode, pos: number) : void {
        if (typeof node == 'string') return
        for (const key in node) {
            const posLessKey = key.substring(0, key.indexOf('.'))
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


