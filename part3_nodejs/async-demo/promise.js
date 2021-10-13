// // Simple promise example 1

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve(1); // pending -> fulfilled
//     reject(new Error("message")); // pending -> rejected
//   }, 2000);
// });

// p.then((result) => console.log("Result:", result)).catch((err) =>
//   console.log("Error:", err.message)
// );

// changing callbakcs to promises.
function getUser(id) {
  return new Promise((resolve, rejcet) => {
    setTimeout(() => {
      console.log("Reading a user from database...");
      resolve({ id: id, githubUsername: "Toby" });
    }, 2000);
  });
}

console.log("Before");
const user = getUser(2);
user
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits:", commits))
  .catch((err) => console.log("Error:", err.message));
// always a good practice to catch erros

console.log("After");

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github api...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github api...");
      resolve(["commit"]);
    }, 2000);
  });
}

// Async and Await
// -> a way to write async function that looks like sync functions
// -> when js see keyword await, it will release the thread
// -> await keyword has to be paired with async decorator
async function displayCommits() {
  try {
    const user2 = await getUser(1);
    const repos = await getRepositories(user2.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log("error:", error.message);
  }
}
