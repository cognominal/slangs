
import type { Crumbs, Parsetree, ParsetreeNode } from './types.js'

/*  
Given a T.ParseTree generated from loading a parsetree in yaml, and a position
calcCrumbs find the path to the position. It returns the span of the path leaf
node, and the list of same span paths that lead to it and break it in its
components.
   
At position 3 with the following parsetree:
    
    a.0.4:
      b.0.2: ~
      c/d.3.4: ~

It gives:  

    { span: [3, 4], components: [ ['a' ], [ 'c', 'd' ] ] }
 */


export function calcCrumbs(node: Parsetree, pos: number): Crumbs {
    const crumbs: Crumbs = [];
    recurse(node, pos)
    return crumbs


    function recurse(node: ParsetreeNode, pos: number): void {
        if (typeof node == 'string') return
        for (const key in node) {
            const m = key.match(/(.*?)\.(\d+)\.(\d+)/) as RegExpMatchArray
            // console.log(JSON.stringify(m));

            if (+m[2] <= pos && pos < +m[3]) {
                const re = /[\w-]+/g;
                const rules = m[1].match(re) as string[]
                const span = [+m[2], +m[3]]
                crumbs.push({ span, rules })
                if (node[key] == null) return
                recurse(node[key], pos)
                break
            }
        }
        return
    }
}

