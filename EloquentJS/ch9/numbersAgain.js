verify(/^[+-]?(\d+[.]?(\d+)?([Ee][+-]?(\d+)?|)|[.]\d+)$/,
      ["-5E+33","13e-54444444444","-.53", "5.","235.65",
      "1", "-1", "+15", "1.55", ".5", "5.","1.3e2", "1E-4", "1e+12"],
      [".+5",".",".-5","-.","Love","E",
      "1a", "+-1", "1.2.3", "1+1", "1e4.5",".5.","1f5","."]);

// Verify function to test
function verify(regexp, yes, no) {
  // Ignore empty test
  if (regexp.source == "...") return;
  for (let numberStr of yes) {
    if (!regexp.test(numberStr)) {
      console.log(`Failed to match '${numberStr}'`);
    }
  }
  for (let numberStr of no) {
    if (regexp.test(numberStr)) {
      console.log(`Unexpected match '${numberStr}'`);
    }
  }
}
