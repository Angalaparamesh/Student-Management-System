import React, { useState, useEffect } from "react";

const StudentForm = ({ student = {}, onSubmit, isEditing, existingRegisterNumbers = [] }) => {
  const [form, setForm] = useState({
    registerNumber: "",
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    gender: "",
    grade: "",
    section: "",
    fatherName: "",
    motherName: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // To hold validation error messages

  // Populate form with student data if editing
  useEffect(() => {
    if (isEditing && student) {
      setForm({
        registerNumber: student.registerNumber || "",
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        age: student.age || "",
        dob: student.dob || "",
        gender: student.gender || "",
        grade: student.grade || "",
        section: student.section || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        address: student.address || "",
        phone: student.phone || "",
      });
    }
  }, [isEditing, student]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Register Number Validation
    if (!form.registerNumber.trim()) {
      newErrors.registerNumber = "Register number is required.";
    } else if (
      existingRegisterNumbers.includes(form.registerNumber.trim()) &&
      (!isEditing || form.registerNumber !== student.registerNumber)
    ) {
      newErrors.registerNumber = "Register number already exists.";
    }

    // Name Validation
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";

    // Age Validation
    if (!form.age || isNaN(form.age) || form.age < 3 || form.age > 20) {
      newErrors.age = "Age must be a number between 3 and 20.";
    }

    // DOB Validation
    if (!form.dob) newErrors.dob = "Date of birth is required.";

    // Gender Validation
    if (!form.gender) newErrors.gender = "Gender is required.";

    // Grade and Section Validation
    if (!form.grade.trim()) newErrors.grade = "Grade is required.";
    if (!form.section.trim()) newErrors.section = "Section is required.";

    // Parent Name Validation
    if (!form.fatherName.trim()) newErrors.fatherName = "Father's name is required.";
    if (!form.motherName.trim()) newErrors.motherName = "Mother's name is required.";

    // Address Validation
    if (!form.address.trim()) newErrors.address = "Address is required.";

    // Phone Validation
    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be a valid 10-digit number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      // Clear the form after submission
      setForm({
        registerNumber: "",
        firstName: "",
        lastName: "",
        age: "",
        dob: "",
        gender: "",
        grade: "",
        section: "",
        fatherName: "",
        motherName: "",
        address: "",
        phone: "",
      });
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-500 p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-6 text-black"
    >
      {/* Register Number */}
      <div className="mb-4">
        <input
          type="text"
          name="registerNumber"
          value={form.registerNumber}
          onChange={handleChange}
          placeholder="Register Number"
          className="p-2 border border-slate-500 rounded w-full"
        />
        {errors.registerNumber && <p className="text-red-500">{errors.registerNumber}</p>}
      </div>

      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      {/* Age and Date of Birth */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>
        <div>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.dob && <p className="text-red-500">{errors.dob}</p>}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-4">
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="p-2 border border-slate-500 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
      </div>

      {/* Other Fields */}
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            placeholder="Grade"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.grade && <p className="text-red-500">{errors.grade}</p>}
        </div>
        <div>
          <input
            type="text"
            name="section"
            value={form.section}
            onChange={handleChange}
            placeholder="section"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.section && <p className="text-red-500">{errors.section}</p>}
        </div>
      </div>


      {/* Parent Details */}
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            placeholder="Father Name"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.fatherName && <p className="text-red-500">{errors.fatherName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="motherName"
            value={form.motherName}
            onChange={handleChange}
            placeholder="mother Name"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.motherName && <p className="text-red-500">{errors.motherName}</p>}
        </div>
      </div>


      {/* Address and Phone */}
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="address"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="phone"
            className="p-2 border border-slate-500 rounded w-full"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
      </div>


      <button
        type="submit"
        className="bg-orange-400 text-white p-2 rounded hover:translate-y-1 w-full"
      >
        {isEditing ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
