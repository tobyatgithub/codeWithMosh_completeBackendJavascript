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
    name: "node course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse();

// QUERY with FILTER
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
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
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 1 = ascending order, otherwise 01
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

// getCourses();

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

// getCoursesOR();

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

// getCoursesRE();

async function updateCourseQueryFirst(id) {
  // Approach: Query first
  // findById()
  const course = await Course.findById(id);
  if (!course) return;
  // Modify its properties way 1
  course.set({
    isPublished: true,
  });
  // Modify its properties way 2
  course.author = "Another Author";
  // save()
  const result = await course.save();
  console.log(result);
}

// updateCourseQueryFirst("61cfa78bf758f787d19ca676");

async function updateCourseUpdateFirst(id) {
  // Approach: Update first
  // Update directly
  const result = await Course.update(
    { _id: id },
    {
      $set: { author: "Mosh", isPublished: false },
    }
  );

  // Optionally: get or print the updated document
  console.log(result);
}

// updateCourseUpdateFirst("61cfa78bf758f787d19ca676");

async function removeCourse(id) {
  // delete directly
  // const result = await Course.deleteOne({ _id: id }); // vs.deleteMany
  // console.log(result);

  // delete and show
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeCourse("61cfa78bf758f787d19ca676");
