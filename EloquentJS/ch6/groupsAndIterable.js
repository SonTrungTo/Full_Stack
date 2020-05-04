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
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}
// Let's now make an interface, namely instance of GroupIterator, that returns an object
// which has next() method, which, when applied, returns yet another object
// that has *value*, showing the next character, and *done*, showing the Boolean value, properties.
// The interface is called via the method named Symbol.iterator on Group.prototype, which returns the interface.
class GroupIterator {
  constructor(group) { // an idex to keep track of an element and the group members themselves.
    this.index = 0;
    this.member = group.member;
  }
  next() {
    let value = this.member[this.index];
    ++this.index;
    if (value != undefined)
      return  {value, done: false};
    else
      return {value, done: true};
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
let group2 = Group.from([1,3,5,7,9,11,11]);
console.log(group2);
console.log(group);

// Testing the iterator interface
let groupIterator = group[Symbol.iterator]();
console.log(groupIterator);
console.log(groupIterator.next());
console.log(groupIterator.next());
console.log(groupIterator.next());
for (let number of group) {
  console.log(number);
}
