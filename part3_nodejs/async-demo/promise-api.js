const p = Promise.resolve({ id: 1 });

p.then((result) => console.log(result));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 2");
    resolve(2);
  }, 2000);
});

// return as soon as all async operations complete
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error:", err.message));

// return as soon as any async operation completes
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error:", err.message));
