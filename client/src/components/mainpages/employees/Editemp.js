
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({
    name: '',
    email: '',
    lecId: '',
    password: '',
    // role: '',
    // userId: '',
  });

  useEffect(() => {
    axios.get(`/Emp/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
        setUpdatedPost((res.data.post));
      }
    });
  }, [id]);
  console.log(post);

  const {name, email, lecId, password } = updatedPost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedPost({
      ...updatedPost,
      [name]: value,
      password: name === 'lecId' ? value : updatedPost.password,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      lecId,
      password,
    };

    axios.put(`/Emp/update/${id}`, data).then((res) => {
      console.log(res.data);
      alert('Post updated successfully!');
      navigate('/Emp');
    });
  };

  return (
    <div className='max-w-lg mx-auto my-8'>
      <h4 className='text-3xl font-bold mb-4'>Edit Projecy Members</h4>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label>Lecturer name</label>
          <input
            type='text'
            className='form-control text-black'
            name='name'
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label>Email:</label>
          <input
            type='text'
            className='form-control text-black'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label>lecId:</label>
          <input
            type='text'
            className='form-control text-black'
            name='lecId'
            value={lecId}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            className='form-control text-black'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          style={{ marginTop: '15px' }}
        >
          <i className='far fa-check-square'></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
}
