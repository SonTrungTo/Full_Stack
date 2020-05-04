let set = new Set();
set.add(2);
set.add(3);
set.add(0);
console.log(set.has(1));
console.log(set);
class Group {
  constructor() {
    this.member = [];
  }
  add(value) {
    if (!this.member.includes(value)) return this.member.push(value);
  }
}

let group = new Group();
group.add(1);
group.add(1);
console.log(group);
