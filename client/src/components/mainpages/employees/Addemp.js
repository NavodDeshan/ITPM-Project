import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    lecId: '',
    role: '2',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      password: name === 'lecId' ? value : formData.password,
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
      newErrors.email = 'Invalid email';
    }

    if (!formData.password) {
      newErrors.password = 'password is required';
    }

    if (!formData.lecId) {
      newErrors.lecId = 'Lecturer Id is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try{
        validate();

        await axios.post('/add/emp', formData)
      // axios.post('/user/adduser', {
      //   name: formData.name, 
      //   email: formData.email, 
      //   password: formData.password, 
      //   role: 2})
        
          
            alert('New Project Manager added Successfully!');
            setFormData({
              name: '',
              email: '',
              password: '',
              lecId: '',
              role: '2',
            });
            setErrors({});
            window.location.href = "/Emp";
          }
        catch(error) {
          console.error(error);
        };
    
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new Project Member</h1>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            className={`form-control text-zinc-950 ${errors.name && 'is-invalid'}`}
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
            className={`form-control text-zinc-950 ${errors.email && 'is-invalid'}`}
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
          <label style={{ marginBottom: '5px' }}>Lec Id</label>
          <input
            type="text"
            className={`form-control text-zinc-950 ${errors.lecId && 'is-invalid'}`}
            name="lecId"
            placeholder="Enter Lecturer Id"
            value={formData.lecId}
            onChange={handleInputChange}
          />
          {errors.lecId && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {errors.lecId}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>password</label>
          <input
            type="password"
            className={`form-control text-zinc-950 ${errors.password && 'is-invalid'}`}
            name="password"
            placeholder="Enter password"
            value={formData.lecId}
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

