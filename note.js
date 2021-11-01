const obj = { a: 22, b: -11.35, c: 41.2, d: "hello" };

function plus(obj) {
  const keyVal = Object.entries(obj);
  const filtered = keyVal.filter(([key, value]) => value >= 0);
  // console.log(filtered);
  const newObj = Object.fromEntries(filtered);

  return newObj;
}

console.log(plus(obj));

let numm = ["123"];
console.log(parseInt(numm));
