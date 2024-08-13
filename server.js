const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CourseModel = require('./model/user'); // Make sure this path is correct
// Example CORS configuration for an Express server
// const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*', 
}));

// app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ayushsharma:root@freecrud.zxoftwk.mongodb.net/?retryWrites=true&w=majority&appName=freeCRUD")
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log("Error in database startup"));



app.delete('/course/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CourseModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/getCourses', async (req, res) => {
  try {
    
    const courses = await CourseModel.find();
    console.log("This is the data: ", courses)
    res.json(courses);
    console.log("getcourse")
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/course/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, startDate, endDate,ageGroup } = req.body; // Include startDate
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, { name, description, price, startDate, endDate, ageGroup }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.post('/course/new', async (req, res) => {
  const { name, description, price, startDate,endDate,ageGroup } = req.body; // Include startDate
  try {
    const newCourse = new CourseModel({ name, description, price, startDate, endDate, ageGroup });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
