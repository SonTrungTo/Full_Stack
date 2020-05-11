class PGroup {
  constructor(value) {
    this.member = value;
  }

  add(value) {
    return new PGroup(this.member.concat(value));
  }
}

let testPGroup = new PGroup();
console.log(testPGroup);
let newPGroup = testPGroup.add(1);
console.log(newPGroup);
console.log(testPGroup);
