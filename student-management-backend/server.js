const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  section: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

// Create Model
const Student = mongoose.model('Student', studentSchema);

// Routes

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  const { registerNumber, phone } = req.body;

  try {
    // Check for duplicate registerNumber or phone
    const existingStudent = await Student.findOne({
      $or: [{ registerNumber }, { phone }],
    });

    if (existingStudent) {
      if (existingStudent.registerNumber === registerNumber) {
        return res.status(400).json({ message: 'Register number already exists.' });
      }
      if (existingStudent.phone === phone) {
        return res.status(400).json({ message: 'Phone number already exists.' });
      }
    }

    // Save new student
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student: ' + error.message });
  }
});

// Update a student
app.put('/students/:id', async (req, res) => {
  const { registerNumber, phone } = req.body;

  try {
    // Check for duplicate registerNumber or phone in other records
    const existingStudent = await Student.findOne({
      _id: { $ne: req.params.id }, // Exclude the student being updated
      $or: [{ registerNumber }, { phone }],
    });

    if (existingStudent) {
      if (existingStudent.registerNumber === registerNumber) {
        return res.status(400).json({ message: 'Register number already exists.' });
      }
      if (existingStudent.phone === phone) {
        return res.status(400).json({ message: 'Phone number already exists.' });
      }
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student: ' + error.message });
  }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
