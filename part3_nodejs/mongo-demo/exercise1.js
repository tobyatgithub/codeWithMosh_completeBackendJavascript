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

async function getCourses() {
  const result = await Course.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(result);
}

getCourses();
