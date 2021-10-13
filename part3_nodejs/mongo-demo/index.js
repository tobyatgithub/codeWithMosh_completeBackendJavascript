const mongoose = require("mongoose");

// CONNECTING (may need to run brew start mongodb first - "mon")
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

// DEFINING A SCHEMA
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema); // Course -> class

// ADDING DOCUMENTS
async function createCourse() {
  const course = new Course({
    name: "python course",
    author: "Mosh",
    tags: ["python", "backend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse();

// QUERY with FILTER
async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)

  const courses = await Course.find({
    // we can also add filter
    author: "Mosh",
    isPublished: true,
    // price: { $gt: 10, $lte: 20 }, // find all with 10 < price <= 20
    // price: { $in: [10, 15, 20] }, // find price equals 10 or 15 or 20
  })
    .limit(10)
    .sort({ name: 1 }) // 1 = ascending order, otherwise 01
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();

async function getCoursesOR() {
  // or
  // and
  const courses = await Course.find()
    .or([{ author: "Mosh" }, { isPublished: true }]) // or with two filter objects
    .limit(10)
    .sort({ name: 1 }) // 1 = ascending order, otherwise 01
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCoursesOR();

async function getCoursesRE() {
  // in Regular Expression:
  // ^... == starts with
  // ...$ == ends with
  // .* == we don't mind how many characters there are before or after

  const courses = await Course.find({
    author: /^Mosh/,
  })
    .find({ author: /Hamedani$/i }) // i makes it case insensitive
    .find({ author: /.*Mosh.*/i }) // means find any that contains "mosh"
    .limit(10)
    .sort({ name: 1 }) // 1 = ascending order, otherwise 01
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCoursesRE();
