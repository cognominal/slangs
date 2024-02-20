# Notes on refactoring

A syntax is created to drive refactoring using the yaml parsetree. The
refactoring rules are parsed by a raku program that generates ts for a given
rule. A transform rule is compiled into a ts program called a ttransform.
ttransforms are stored in a map keyed by rulenames. For any rules names there
may be many ttransforms. We start simple by refactoring pairs.

A `:t(True)` pair is huffmanized into `:t`


# dehuffmanize

colonpair identifier --> ':' $identifier '(True)'  # :t --> :t(true)
colonpair{identifier} --> ':' $identifier '(True)'  # :t --> :t(true)

#huffmanize

colonpair{coloncircumfix...[...longname eq 'True'], identifier --> ':' $identifier

-



colonpair{$identifier} --> ':' $identifier '(True)'  # :t --> :t(true)


