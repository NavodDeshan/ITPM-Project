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
      <div className='mx-auto max-w-7xl mt-16 p-8' style={{ backgroundColor: '#6B7280', color: '#333' }}>
        <div className="flex items-center justify-between mb-8">
          <div className='flex items-center'>
          
            <input className='ml-3 py-2 px-4 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-900' type="search" placeholder='Search' name='searchQuery' onChange={handleSearch} />
          </div>
          <div className='flex space-x-4'>
            <button className="py-2 px-4 bg-gray-200 hover:bg-blue-500 text-gray-900 rounded-md">
              <Link to='/add/emp' className='text-gray-900'>Add Project member</Link>
            </button>
          </div>
        </div>

        {/* <a className="bg-yellow-300 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-lg" href={`/empR`}>Get Report</a>  */}
        <h3 className='mb-4 mt-8 text-3xl font-medium'>Project members</h3>

        <table className='w-full border-collapse border border-gray-300 p-3 ' style={{ backgroundColor: '#fff' }}>
          <thead>
            <tr className="bg-gray-500">
              <th className="px-4 py-2 text-left border border-gray-300">No</th>
              <th className="px-4 py-2 text-left border border-gray-300">Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Email Address</th>
              <th className="px-4 py-2 text-left border border-gray-300">Lecturer ID</th>
              <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className='bg-gray-500'>
                <td className="px-4 py-2 text-left border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 text-left border border-gray-300">{post.name}</td>
                <td className="px-4 py-2 text-left border border-gray-300">{post.email}</td>
                <td className="px-4 py-2 text-left border border-gray-300">{post.lecId}</td>  
                <td className="px-4 py-2 text-left border border-gray-300 font-bold">
                  <Link to={`/Editemp/${post._id}`} className='text-yellow-400 hover:underline mr-6'>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </Link>
                  <button className='text-red-600 hover:underline' onClick={() => deletePost(post.userId)}>
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
