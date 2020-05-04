let set = new Set();
set.add(2);
set.add(3);
set.add(0);
console.log(set.has(1));
console.log(set);
// Group class
class Group {
  constructor() {
    this.member = [];
  }
  add(value) {
    if (this.member.indexOf(value) == -1) this.member.push(value);
  }
  delete(value) {
    this.member = this.member.filter(n => n != value);
  }
  has(value) {
    return this.member.indexOf(value) == -1 ? false : true;
  }
  static from(object) {
    let newGroup = new Group();
    for (let element of object) {
      newGroup.member.push(element);
    }
    return newGroup;
  }
}

let group = new Group();
group.add(1);
group.add(2);
group.add(3);
group.add(1);
group.add(5);
group.delete(2);
group.delete(1);
console.log(group);
console.log(group.has(4));
let group2 = Group.from([1,3,5,7,9,11]);
console.log(group2);
console.log(group);
