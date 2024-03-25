import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResearchRequests() {
  const [requests, setRequests] = useState([]);
  const [posts, setPosts] = useState([]); // Define posts state here
  const [completedPosts, setCompletedPosts] = useState([]);

  useEffect(() => {
    // Fetch the research requests when the component mounts
    axios.get('/getresearch')
      .then(response => {
        setRequests(response.data.existingPosts);
        setPosts(response.data.existingPosts); // Set posts state here
      })
      .catch(error => {
        console.error('Error fetching research requests:', error);
      });
  }, []); // The empty array makes sure this effect runs once on mount and not on updates

  const filterPosts = (posts, searchKey) => {
    const result = posts.filter(post =>
      post.title.toLowerCase().includes(searchKey) ||
      post.supervisor.toLowerCase().includes(searchKey) 
    );
    setPosts(result);
  };

  const handleSearch = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get('/getresearch').then(res => {
      if (res.data.success) {
        filterPosts(res.data.existingPosts, searchKey);
      }
    });
  };

//   const markAsComplete = (id) => {
//     axios.put(`/research/markAsComplete/${id}`).then(res => {
//       alert('Marked as Complete');
//       retrievePosts();
//     });
//   };

  return (
    <div className='container' id="pdfdiv">
      <div className='row my-4'>
        <div className='col-lg-12'>
        <div className="mb-4">
    <input
      type="search"
      placeholder="Search"
      name="searchQuery"
      onChange={handleSearch}
      className="w-1/5 p-2 border border-gray-300 rounded-md focus:outline-none"
    />
  </div>
  <h3 className="text-2xl mb-4">Reserch Requests </h3>
          <div className='table-responsive'> 
            <table className="table table-striped text-center" >
              <thead>
                <tr>
                  <th scope='col'> No </th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Student 1</th>
                  <th scope='col'>Student 2</th>
                  <th scope='col'>Student 3</th>
                  <th scope='col'>Student 4</th>
                  <th scope='col'>Co-supervisor</th>
                  <th scope='col'>Supervisor</th>
                  <th scope='col'>Conference Name</th>
                  <th scope='col'>ISSN</th>
                  <th scope='col'>Link 1</th>
                  <th scope='col'>Link 2</th>
                  <th scope='col'>Payment</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody style={{background:'pink'}}>
                {posts.map((request, index) => ( // Use posts state here
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{request.title}</td>
                    <td>{request.student1}</td>
                    <td>{request.student2}</td>
                    <td>{request.student3}</td>
                    <td>{request.student4}</td>
                    <td>{request.cosupervisor}</td>
                    <td>{request.supervisor}</td>
                    <td>{request.conferencename}</td>
                    <td>{request.issn}</td>
                    <td>{request.link1}</td>
                    <td>{request.link2}</td>
                    <td>{request.payment}</td>
                    <td>{request.status}</td>

                    <td>
                <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mr-2">
                  <i className="fa-solid fa-circle-check"></i>&nbsp;Accepted
                </button>
                </td>
                <td>
                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg" >
                  <i className="fas fa-trash-alt"></i>&nbsp;Rejected
                </button>
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchRequests;
