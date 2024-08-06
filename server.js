const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const CourseModel  = require('./model/user')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://ayushsharma:root@freecrud.zxoftwk.mongodb.net/?retryWrites=true&w=majority&appName=freeCRUD")
.then(()=>console.log("Db Connected"))
.catch((err)=>console.log("Error in database startup"))


const User = require('./model/user')


app.delete('/course/delete/:id', async (req, res) => {
        const { id } = req.params;
    try {
      const result = await CourseModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.get('/getCourses',async(req,res)=>{
    CourseModel.find()
    .then(courses=> res.json(courses))
    .catch(err=>res.json(err))
})

  app.put('/course/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
      const updatedUser = await CourseModel.findByIdAndUpdate(id, { name, description, price }, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  app.post('/course/new', async (req, res) => {
    const newItem = req.body;
    await CourseModel.create(newItem);
    res.status(201).json(newItem);
  });




app.listen(3001,()=>{
    console.log("server is running")
})