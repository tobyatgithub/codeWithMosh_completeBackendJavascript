const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB ...", err));

// DEFINING A SCHEMA
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

// get all published backend courses, sort by name in ascending
// pick only name and author, display
async function exercise1() {
  const result = await Course.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(result);
}

// exercise1();

// get all published frontend and backend courses, sort by price
// in descending, pick only name and author, display
async function exercise2() {
  const result = await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });

  console.log(result);
}

// exercise2();

async function exercise2_another() {
  const result = await Course.find({
    isPublished: true,
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");

  console.log(result);
}

// exercise2_another();

// get all the published courses that are $15 or more,
// or have the word 'by' in their title
async function exercise3() {
  const result = await Course.find({ isPublished: true })
    .or([
      { price: { $gte: 15 } },
      { name: /.*by.*/i }, // . == character, * == 0 or more, i == case insensitive
    ])
    .sort("-price")
    .select("name author price");
  console.log(result);
}

exercise3();
