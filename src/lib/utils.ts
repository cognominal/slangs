type ParsetreeLeaf = string
type ParseTreeNonLeaf = { [index: string]: ParsetreeNode; }

type ParsetreeNode = ParsetreeLeaf | ParseTreeNonLeaf
type ParseTree = ParsetreeNode

export interface Crumbs {
    span: number[]
    components: string[][]
}   

/*  Given a ParseTree generated from loading a parsetree in yaml, and a position
    calcCrumbs find the path to the position. It returns the span of the
    path leaf node, and  the list of same span paths 
    that lead to it and breakit in its components.
   
    At position 3 with the following parsetree:
    
    a.0.4:
      b.0.2: ~
      c/d.3.4: ~

    It gives:  

    { span: [3, 4], components: [ ['a' ], [ 'c', 'd' ] ] }
 */

export function calcCrumbs(node: ParseTree, pos: number) : Crumbs {
    const path : string[] = []
    const components : string[][] = []
    let span : number[]
    
    recurse(node, pos)
    for (const subpath of path) {
        const re = /[\w-]+/g
        components.push(subpath.match(re) as string[])
    }
    // @ts-expect-error span is set in recurse
    return { span , components }

    function recurse(node: ParsetreeNode, pos: number) : void {
        if (typeof node == 'string') return
        for (const key in node) {
            const m = key.match(/(.*?)\.(\d+)\.(\d+)/) as RegExpMatchArray
            console.log(JSON.stringify(m));
            
            if (+m[2] <= pos && pos < +m[3]) {
                span = [+m[2], +m[3]]
                path.push(m[1])
                if (node[key] == null) return
                recurse(node[key], pos)
                break
            }
        }
        return
    }
}


