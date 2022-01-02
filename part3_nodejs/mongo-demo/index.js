const mongoose = require("mongoose");

// CONNECTING (may need to run brew start mongodb first - "mon")
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

// DEFINING A SCHEMA
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: { type: String, enum: ["web", "mobile", "network"] },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        // Do some async work
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
        // return v && v.length > 0; // v&& for null point check
      },
      message: "A course shall have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema); // Course -> class

// ADDING DOCUMENTS
async function createCourse() {
  const course = new Course({
    name: "node course",
    category: "webb",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
    // price: 20,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (exception) {
    for (field in exception.errors)
      console.log(exception.errors[field].message);
  }
}

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

async function removeCourse(id) {
  // delete directly
  // const result = await Course.deleteOne({ _id: id }); // vs.deleteMany
  // console.log(result);

  // delete and show
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

createCourse();

// getCourses();
// getCoursesOR();
// getCoursesRE();
// updateCourseQueryFirst("61cfa78bf758f787d19ca676");
// updateCourseUpdateFirst("61cfa78bf758f787d19ca676");
// removeCourse("61cfa78bf758f787d19ca676");
