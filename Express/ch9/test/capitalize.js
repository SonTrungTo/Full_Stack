const capitalize = require("../capitalize");

const chai   = require("chai");
const expect = chai.expect;

describe("capitalize", () => {

  it("capitalizes single words", () => {
    expect(capitalize("express")).to.equal("Express");
    expect(capitalize("cats")).to.equal("Cats");
  });

});
