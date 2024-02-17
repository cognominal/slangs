grammar A {
  rule TOP { <signedInteger> <op> <signedInteger>}
   token signedInteger { $<sign>=<[\-\+]>? $<VALUE>=<decint> }
   token decint  { [\d+]+ % '_'  }
   token op { <[\+\-\*\/]> }
}

my $m := A.parse('-42 + 1_000_000');
say($m.dump);
