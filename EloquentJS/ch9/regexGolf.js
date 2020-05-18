// car and cat
console.log("ThereIsAcatInsideAcar".match(/ca[rt]/g));
console.log(/ca[rt]/.test("ThereIsAcatInsideAcart"));

// prop and pop
console.log(/pr?op/.test("I love prop, pop music"));

// ferret, ferry and ferrari
console.log(/ferr(et|y|ari)/.test("ferry"));

// ending in 'ious'
let anyWordInIous = "CautiousAmbitiousFastidiousHarmonious"
console.log(anyWordInIous.match(/\w+?ious/g));

// whitespace followed by .,;:
console.log(/\s[,.;:]/.test("SUBARU-KUN ."));

// words longer than 6 letters.
console.log(/\w{7,}/.test("alibaba"));

// words without e/E
console.log("Kick asse mayonese MAYURI!".match(/\b[^eE ]+\b/g));
