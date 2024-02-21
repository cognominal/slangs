import { describe, it, expect } from 'vitest';
import type { Crumbs} from './types'
import {  calcCrumbs } from './utils'
import { parse } from 'yaml'


const YsimpleTree = `a.0.1: ~\n`
const YTreee =
`a.0.4:
  b.0.2: ~
  c/d.3.4: ~
`

describe('yaml parsetrees', () => {
  it('parses simpleTree', () => {
    const p = parse(YsimpleTree)
    expect(p).toBeDefined();
    expect(p["a.0.1"]).toBe(null);

  })
  it('parses tree', () => {
    const p = parse(YTreee)
    expect(p).toBeDefined();
  })
  it('correctly parses tree', () => {
    const p = parse(YTreee)
    expect(p["a.0.4"]).toHaveProperty("b.0.2");

  })

});


describe('calcCrumbs', () => {
  it('generate correct crumbs', () => {
    const p = parse(YTreee)
    const c : Crumbs = calcCrumbs(p, 3)
    expect(c).toEqual(
      [ { span: [0, 4], rules: ['a'] }, { span: [3, 4], rules: ['c', 'd'] } ]
    )


  })
})

