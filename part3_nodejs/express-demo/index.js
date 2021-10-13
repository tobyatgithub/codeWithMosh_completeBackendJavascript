const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "python" },
  { id: 2, name: "rust" },
  { id: 3, name: "java" },
];

app.get("/", (req, res) => {
  res.send("hi mom!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID can not be found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  //http://localhost:3000/api/posts/2019/2?sortBy=Name
  res.send({ query: req.query, params: req.params });
});

// PORT
// if we set the mac port environment via export PORT=5000
const port = process.env.PORT || 3000; // this line will make const port = 5000!
app.listen(port, () => console.log(`Listening on port ${port}...`));
