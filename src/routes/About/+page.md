# creating a slang secosystem

This site advertise raku grammars and slang.

## some history and concepts

More than 20 years ago, Damian Conway created in Perl a mostly declarative system of
grammars to parse arbitrary program languages. 
He made regular expression composable by making them methods called rules in an OO
system. Grammar are classes that includes rules in addition to regular method.
Perl was good to prototype
such a system but it was dog slow.

Raku, the putative Perl successor use such a grammar to parse itself.
In fact it is the composition of many grammars.
Grammars can be composed and extended dynamically.
One can use a class Actions associated to a grammar to build an AST,
a step to create a language. A language which hooks on an existing language
is called a slang.

This would be fine and dandy if an ecosystem would be build around that
to provide treesitters and syntax highligting.

Currently beside the Comma editor, syntax highlighting is broken.
Nowhere LSP is supported. Finally

