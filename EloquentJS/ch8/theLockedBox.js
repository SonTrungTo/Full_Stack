const box = {
  locked: true,
  unlock() {this.locked = false;},
  lock()   {this.locked = true;},
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  let unlockedAlready = false;
  try {
    if (!box.locked) {
      unlockedAlready = true;
    }
    box.unlock();
    body();
  } finally {
    if (!unlockedAlready)  box.lock();
  }
}

// box.unlock();  // Will remain unlocked if used

withBoxUnlocked( function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked( function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box);
