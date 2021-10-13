const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

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

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);
  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send("Name is required with length >= 3 char.");
  //   return;
  // }
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
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
