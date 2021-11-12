const Joi = require("joi");
const logger = require("./logger");
const auth = require("./auth");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

/*
Allow serving static files. For example,
with the current set up with -public-readme.txt,
if we go to localhost:PORT/readme.txt,
we shall see the text content in the readme.txt
*/
app.use(express.static("public"));

app.use(logger);

app.use(auth);

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
  const { error } = validateCourses(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
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
    return res
      .status(404)
      .send("The course with the given ID can not be found.");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The course with the given ID can not be found.");

  // validate
  // since we only care about the error property of result,
  // we can use object deconstructor here.
  // const result = validateCourses(req.body);
  const { error } = validateCourses(req.body);
  // if (result.error) {
  if (error) {
    // res.status(400).send(result.error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  // update courses
  course.name = req.body.name;
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  //http://localhost:3000/api/posts/2019/2?sortBy=Name
  res.send({ query: req.query, params: req.params });
});

app.delete("/api/courses/:id", (req, res) => {
  // look up
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The course with the given ID can not be found.");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return
  res.send(course);
});

// PORT
// if we set the mac port environment via export PORT=5000
const port = process.env.PORT || 3000; // this line will make const port = 5000!
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourses(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
