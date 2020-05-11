class PGroup {
  constructor(members) {
    this.member = members;
  }

  add(value) {
    if (this.has(value)) return  new PGroup(this.member); // or *this* is ok since new instance every time.
    return new PGroup(this.member.concat(value));
  }

  delete(value) {
    return new PGroup(this.member.filter(m => m !== value));
  }

  has(value) {
    if (this.member.some(m => m == value)) {
      return true;
    }
    return false;
  }
}
PGroup.empty = new PGroup([]);

let testPGroup = PGroup.empty;
console.log(testPGroup);
let newPGroup = testPGroup.add(1);
let newPGroup2 = newPGroup.add(1);
let newPGroup3 = newPGroup2.add(2);
let newPGroup4 = newPGroup3.add("S");
let newPGroup5 = newPGroup4.delete(2);
console.log(newPGroup4);
console.log(newPGroup3);
console.log(newPGroup5);
console.log(newPGroup4);
console.log(testPGroup);
