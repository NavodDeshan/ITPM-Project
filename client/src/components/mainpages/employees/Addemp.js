import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = ' Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email password';
    }

    if (!formData.password) {
      newErrors.password = 'password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios.post('/Emp/save', formData)
      axios.post('/user/adduser', {
        name: formData.name, 
        email: formData.email, 
        password: formData.password, 
        role: 2})
        .then((res) => {
          if (res.data.success) {
            alert('New Employee added Successfully!');
            setFormData({
              name: '',
              email: '',
              password: '',
              // role: '',
            });
            setErrors({});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new Employee</h1>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            className={`form-control ${errors.name && 'is-invalid'}`}
            name="name"
            placeholder="Enter First Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>password</label>
          <input
            type="text"
            className={`form-control ${errors.password && 'is-invalid'}`}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {errors.password}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginTop: '15px' }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;

