This blog explains my progress in the slang project. And demonstrates the
tools I develop, mostly the parse tree browser.
Also it allows me to experiment [slugs](https://kit.svelte.dev/docs/routing) in svelte.


The parse tree browser will offer a `rules` pane which will display
the code of the rules used for the reduction in the path.
So I need a data structure to drive the display of that pane.


As test data, I designed a grammar to match the string `1234` that uses  multi.

```raku
grammar A {
    token TOP { 
         <b> 3 <c> 
    }
    token b { 
        12 {? 1 }
    } # comment 
    token c { <d>  } # comment
    proto token d { <...> }
    token d:sym<4> { <sym> }
    token d:sym<5> { <sym> }
}
```

Part of the data generated will be.

```
{  
    TOP: 
      TOP: { path: ..., span: ... }
    d: 
      'd:sym<4>': { path: ..., span: ...   }
      'd:sym<5>': { path: ..., span: ...   }
    ...
}
```

In the parse tree yaml, there is not the long name of the multi, I will
have to deduce it from the content of the matched rule.


I do want to extract name info about the rules in a grammar, the span of
the rule, and nothing more. Having implemented a parse tree in yaml, I could have dig
down in it to extract the info but I tried an alternative way.

the code is interesting because it uses at once techniques usually used in
parsing and tehcniques using in classical regex. It is parsing because I
combine rules in a grammar. It is regexing because I skip stuff I am
uninterested in using the non greedy matcher `.*?`.

Also I could have separated the actions in a special class.
I choosed to do it inline.
The rule `start-rule` contains `$indent=$<indent> ` to save
the `$<indent>` capture variable. `$indent` is then used in the rule
`end-rule-different-line` to match a closing brace with the same indentation
as the start of the rule.

As a long term solution, this code will need to be extended or dropped
altogether to exploit the parse tree instead. Indeed in the real world grammars
use inheritance to derive from each other, mix other grammars declared as
rules.

