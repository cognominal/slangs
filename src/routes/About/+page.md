# creating a slang secosystem

This site will advertise raku grammars and slang.
It is currently in its early state.

## some history and concepts

More than 20 years ago, [Damian
Conway](https://en.wikipedia.org/wiki/Damian_Conway) created in Perl a mostly
declarative system of
[grammars](https://en.wikipedia.org/wiki/Parsing_expression_grammar) to parse
programs written in languages using rich syntax. He made regular expressions
composable by making them methods in an OO system. He called such mehods
[rules](https://en.wikipedia.org/wiki/Raku_rules). Grammar are classes that include rules in addition to regular methods.
Perl was good to prototype such a system but it was dog slow.

Grammars are a main part of Raku [\[1\]](https://en.wikipedia.org/wiki/Raku_(programming_language)) [\[2\]](https://docs.raku.org/) the putative Perl successor.
And its current implementation is very close to the original
[design](https://github.com/Raku/old-design-docs/blob/master/S05-regex.pod)
uses such a grammar to parse itself. 

In fact it is the composition of many grammars. Grammars can be composed and
extended dynamically. One can use a class Actions associated to a grammar to
build an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), a step to create a language compiler from the parse tree. A language which hooks on an
existing language is called a slang. Liz created [Slangify](https://raku.land/zef:lizmat/Slangify) 
to streamline the process of creating a slang.

This would be fine and dandy if an ecosystem would be build around that
to provide treesitters and syntax highligting.

Currently beside the [Comma](https://commaide.com/) editor, syntax highlighting is broken for raku is broken in all editor
even for trivial programs. So writing program in a given slang is a non start for anyone 
expecting decent support from the editor.
Nowhere [LSP](https://microsoft.github.io/language-server-protocol/) is supported.

## Ongoing

- from any code, generating a [parsetree](https://eng.libretexts.org/Bookshelves/Computer_Science/Programming_and_Computation_Fundamentals/Foundations_of_Computation_(Critchlow_and_Eck)/04%3A_Grammars/4.03%3A_Parsing_and_Parse_Trees) dump in yaml from nqp and raku
- using the generated yaml to drive the navigation of code displayed
in a codemirror widget using a crumbbar 

## TBD 

- Porting raku grammar engine in rust [\[1\]](https://en.wikipedia.org/wiki/Rust_(programming_language))
[\[2\]](https://www.rust-lang.org/) to run in [wasm](https://en.wikipedia.org/wiki/WebAssembly)
- Given the production rule of code under the cursor, display the code of the fule.
- Implementing the crumbar in vscode. That can't be an extension but a modif to the core.
