import { describe, it, expect } from 'vitest';

import { calcCrumbs } from './utils'
import { parse } from 'yaml'


const paesetreeStr = `a:0.1: ˜\n`

const parseTree =
`OP/statementlist.0.9:                       #  0;say(42)
statement/EXPR.2.9:                        #  say(42)
deflongname.5.9:                         #  (42)
arglist/EXPR/value/number/integer.6.8:    
#  42
decint.6.8: ~                        #  42
args.5.9:                                #  (42)
arglist/EXPR/value/number/integer.6.8:    
#  42
decint.6.8: ~                        #  42
`

describe('yaml', () => {
	it('parses', () => {
		expect(parse(paesetreeStr)).toBeDefined();
	})
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
