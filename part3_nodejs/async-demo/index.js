console.log("Before");
getUser(1, function (user) {
  console.log("User", user);

  getRepo(user, function (repo) {
    console.log(repo);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout((id) => {
    console.log("Reading a user from a database... ");
    callback({ id: id, githubUsername: "Toby" });
  }, 2000); // this setTimeout is aync!
}

function getRepo(user, callback) {
  setTimeout((user) => {
    console.log("calling github api...");
    callback(["repo1", "repo2", "repo3"]);
  });
}

console.log("Before");
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repo, displayCommit);
}

function displayCommit(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout((id) => {
    console.log("Reading a user from a database... ");
    callback({ id: id, githubUsername: "Toby" });
  }, 2000); // this setTimeout is aync!
}

function getRepo(user, callback) {
  setTimeout((user) => {
    console.log("calling github api...");
    callback(["repo1", "repo2", "repo3"]);
  });
}
