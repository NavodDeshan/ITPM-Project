import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Emp = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    axios.get('/Emp').then(res => {
      if (res.data.success) {
        setPosts(res.data.existingPosts);
      }
    });
  };

  const deletePost = (userId) => {
    axios.delete(`/Emp/delete/${userId}`).then(res => {
      alert('Deleted Successfully');
      retrievePosts();
    }).catch(error => {
      console.error(error);
      // Handle error if any
    });
  };


  const filterPosts = (posts, searchKey) => {
    const result = posts.filter(post =>
      post.name.toLowerCase().includes(searchKey)||
      post.email.toLowerCase().includes(searchKey) 
    );
    setPosts(result);
  };

  const handleSearch = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    if (!searchKey) {
      // If the search key is empty, retrieve all posts again
      retrievePosts();
    } else {
      // If there's a search key, filter the posts based on it
      axios.get('/Emp').then(res => {
        if (res.data.success) {
          filterPosts(res.data.existingPosts, searchKey);
        }
      });
    }
  };

  return (
    <div className='mx-auto max-w-7xl mt-16'>
      <div className="flex items-center justify-between mb-8">
        <div className='flex items-center'>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <i className='fas fa-search text-gray-500'></i>
          </div>
          <input className='ml-3 py-2 px-4 w-80 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-cyan-500 text-gray-950' type="search" placeholder='Search' name='searchQuery' onChange={handleSearch} />
        </div>
        <div className='flex space-x-4'>
          <button className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md">
            <Link to='/add/emp' style={{ textDecoration: 'none', color: 'white' }}>Add Project member</Link>
          </button>
        </div>
      </div>

      <a className="bg-yellow-400 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg" style={{textDecoration:'none'}} href={`/empR`}>Get Report</a> 
      <h3 className='mb-4 mt-8 text-3xl font-medium'>Project members</h3>

      <table className='w-full border-collapse border border-gray-400'>
        <thead>
          <tr className="bg-purple-950">
            <th className="px-4 py-2 text-left border border-gray-400">No</th>
            <th className="px-4 py-2 text-left border border-gray-400">Name</th>
            <th className="px-4 py-2 text-left border border-gray-400">Email Address</th>
            <th className="px-4 py-2 text-left border border-gray-400">Lecturer ID</th>
            <th className="px-4 py-2 text-left border border-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id} className='bg-transparent'>
              <td className="px-4 py-2 text-left border border-gray-400">{index + 1}</td>
              <td className="px-4 py-2 text-left border border-gray-400">{post.name}</td>
              <td className="px-4 py-2 text-left border border-gray-400">{post.email}</td>
              <td className="px-4 py-2 text-left border border-gray-400">{post.lecId}</td>  
              <td className="px-4 py-2 text-left border border-gray-400 font-bold">
                <Link to={`/Editemp/${post._id}`} className='text-amber-400 hover:underline mr-6'>
                  <i className='fas fa-edit'></i>&nbsp;Edit
                </Link>
                <button className='text-red-800 hover:underline' onClick={() => deletePost(post.userId)}>
                  <i className='fas fa-trash-alt'></i>&nbsp;Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emp;
