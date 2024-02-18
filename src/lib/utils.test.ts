import { describe, it, expect } from 'vitest';

import { calcCrumbs } from './utils'
import { parse } from 'yaml'


const parsetreeStr = `a.0.1: ~\n`
const parsetreeStr1 =
`a.0.4:
  b.0.2: ~
  c/d.3.4: ~
`

describe('yaml', () => {
  it('parses parsetreeStr', () => {
    const p = parse(parsetreeStr)
    expect(p).toBeDefined();
    expect(p["a.0.1"]).toBe(null);

  })
  it('parses parsetreeStr1', () => {
    const p = parse(parsetreeStr1)
    expect(p).toBeDefined();
  })
  it('correctly parses parsetreeStr1', () => {
    const p = parse(parsetreeStr1)
    expect(p["a.0.4"]).toHaveProperty("b.0.3");

  })

});

describe('calcCrumbs', () => {
  it('parses', () => {
    const p = parse(parsetreeStr1)
    const c = calcCrumbs(p, 3)
    expect(c).toEqual({ span: [3, 4], components: [ ['a' ], [ 'c', 'd' ] ] });

  })
})

