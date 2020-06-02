function Promise_all(array) {
  return new Promise((resolve, reject) => {
    let result = [];
    for (let length = array.length; length >= 0; length--) {
      if (length == 0) resolve(result);
    }
  });
}

//let exampleArray = [Promise.reject(1), Promise.resolve(2), Promise.resolve(3)];
//let exampleArray2 = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];

Promise_all([]).then(console.log);
