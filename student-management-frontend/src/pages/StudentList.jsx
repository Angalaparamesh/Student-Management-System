import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="bg-blue-950 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="table-auto w-full text-left text-white bg-slate-500">
          <thead>
            <tr className="bg-blue-950">
              <th className="p-2 border">Register Number</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-blue-950">
                <td className="p-2 border">{student.registerNumber}</td>
                <td className="p-2 border">{student.firstName}</td>
                <td className="p-2 border">{student.lastName}</td>
                <td className="p-2 border">{student.grade}</td>
                <td className="p-2 border">{student.section}</td>
                <td className="p-2 border flex space-x-2">
                  <button
                    onClick={() => onEdit(student._id)}
                    className="bg-orange-300 text-white p-1 rounded hover:bg-blue-950"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;