import React, { useState, useEffect } from 'react';
import auth from '../config';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const StudentManagement = () => {
  const [students, setStudents] = useState([]); // List of students
  const [editId, setEditId] = useState(null); // Track the student being edited
  const navigate = useNavigate();

  // Fetch students when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Function to add or update a student
  const handleAddOrUpdate = async (studentData) => {
    if (editId) {
      // Update student
      try {
        const response = await axios.put(
          `http://localhost:5000/students/${editId}`,
          studentData
        );
        setStudents((prevStudents) =>
          prevStudents.map((s) => (s._id === editId ? response.data : s))
        );
        alert('Student updated successfully.');
      } catch (error) {
        console.error('Error updating student:', error);
        if (error.response?.data?.message) {
          alert(error.response.data.message); // Show backend error
        } else {
          alert('Failed to update student. Please try again.');
        }
      }
    } else {
      // Add new student
      try {
        const response = await axios.post('http://localhost:5000/students', studentData);
        setStudents((prevStudents) => [...prevStudents, response.data]);
        alert('Student added successfully.');
      } catch (error) {
        console.error('Error adding student:', error);
        if (error.response?.data?.message) {
          alert(error.response.data.message); // Show backend error
        } else {
          alert('Failed to add student. Please try again.');
        }
      }
    }
    setEditId(null); // Reset editId after adding or updating
  };

  // Function to set the student for editing
  const handleEdit = (id) => {
    setEditId(id);
  };

  // Function to delete a student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
      alert('Student deleted successfully.');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    signOut(auth)
      .then(() => navigate('/Login'))
      .catch((error) => console.error('Error during logout:', error));
  };

  return (
    <div className="p-6 bg-blue-950 text-center text-white">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-orange-300 text-blue-950 px-4 py-2 rounded hover:bg-orange-400"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl mb-6">Student Management</h1>

      {/* StudentForm to add or update students */}
      <StudentForm
        student={students.find((student) => student._id === editId) || {}}
        onSubmit={handleAddOrUpdate}
        isEditing={Boolean(editId)}
      />

      {/* StudentList to display all students */}
      <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default StudentManagement;
