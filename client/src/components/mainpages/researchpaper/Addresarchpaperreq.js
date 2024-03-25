import React, { useState } from 'react'
import axios from 'axios';

function Addresarchpaperreq() {

const [error, setError] = useState({});

const validate = () => {
  const newError = {};

  if (!formData.title) {
    newError.title = 'title is required';
  }

  if (!formData.student1) {
    newError.student1 = 'student 1 name is required';
  }

  if (!formData.student2) {
    newError.student2 = 'student 2 name is required';
  }

  if (!formData.student3) {
    newError.student3 = 'student 3 name is required';
  }

  if (!formData.student4) {
    newError.student4 = 'student 4 name is required';
  }

  if (!formData.supervisor) {
    newError.supervisor = 'supervisor name is required';
  }

  if (!formData.cosupervisor) {
    newError.cosupervisor = 'cosupervisor name is required';
  }
  if (!formData.conferencename) {
    newError.conferencename = 'conferencename name is required';
  }
  if (!formData.issn) {
    newError.issn = 'issn number is required';
  }

  if (!formData.link1) {
    newError.link1 = 'link1 is required';
  }

  if (!formData.link2) {
    newError.link2 = 'link2 is required';
  }

  if (!formData.payment) {
    newError.payment = 'payment amount is required';
  }
  
//   if (!formData.phoneNo) {
//     newError.phoneNo = 'Phone Number is required';
//   } else if (!/^[0-9]{10}$/i.test(formData.phoneNo)) {
//     newError.phoneNo = 'Phone Number is invalid';
//   }

  setError(newError);
  return Object.keys(newError).length === 0;
};

  const [formData, setFormData] = useState({
    title:"",
    student1: "",
    student2: "",
    student3: "",
    student4: "",
    supervisor: "",
    cosupervisor: "",
    conferencename:"",
    issn: "",
    link1: "",
    link2: "",
    payment: ""
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log(formData);
  
      axios.post('/postresearch/save', formData).then((res) => {
        if (res.data.success) {
          alert('New research Request added Successfully!');
          setFormData({
            title:'',
            student1: '',
            student2: '',
            student3: '',
            student4: '',
            supervisor: '',
            cosupervisor: '',
            conferencename: '',
            issn: '',
            link1: '',
            link2: '',
            payment: ''
          });
          setError({});
        }
      });
    }
  };
  
    return (
      <div className="flex justify-center items-center h-screen">
  <div className="bg-opacity-10 bg-gray-100 backdrop-filter backdrop-blur-lg p-6 rounded-md">
    <h1 className="text-3xl mb-4">Add Research Request</h1>
    <form noValidate className="flex">
      <div className="mr-6">
        <div className="mb-5">
          <label className="mb-1 block">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.title && <div className="text-red-500">{error.title}</div>}
        </div>
        <div className="mb-5">
          <label className="mb-1 block">Student name 1</label>
          <input
            type="text"
            name="student1"
            placeholder="Enter student name"
            value={formData.student1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.student1 && <div className="text-red-500">{error.student1}</div>}
        </div>

       

        <div className="mb-5">
          <label className="mb-1 block">Student name 2</label>
          <input
            type="text"
            name="student2"
            placeholder="Enter student name"
            value={formData.student2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.student2 && <div className="text-red-500">{error.student2}</div>}
        </div>

        <div className="mb-5">
          <label className="mb-1 block">Student name 3</label>
          <input
            type="text"
            name="student3"
            placeholder="Enter student name"
            value={formData.student3}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.student3 && <div className="text-red-500">{error.student3}</div>}
        </div>

        <div className="mb-5">
          <label className="mb-1 block">Student name 4</label>
          <input
            type="text"
            name="student4"
            placeholder="Enter student name"
            value={formData.student4}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.student4 && <div className="text-red-500">{error.student4}</div>}
        </div>
      </div>
      <div>
        <div className="mb-5">
          <label className="mb-1 block">Supervisor Name</label>
          <input
            type="text"
            name="supervisor"
            placeholder="Enter Supervisor Name"
            value={formData.supervisor}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.supervisor && <div className="text-red-500">{error.supervisor}</div>}
        </div>
        <div className="mb-5">
          <label className="mb-1 block">Co-Supervisor</label>
          <input
            type="text"
            name="cosupervisor"
            placeholder="Enter Co-Supervisor"
            value={formData.cosupervisor}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.cosupervisor && <div className="text-red-500">{error.cosupervisor}</div>}
        </div>
        <div className="mb-5">
          <label className="mb-1 block">Conference Name</label>
          <input
            type="text"
            name="conferencename"
            placeholder="Enter Conference Name"
            value={formData.conferencename}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.conferencename && <div className="text-red-500">{error.conferencename}</div>}
        </div>
        <div className="mb-5">
          <label className="mb-1 block">ISSN Number</label>
          <input
            type="text"
            name="issn"
            placeholder="Enter Issn Number"
            value={formData.issn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.issn && <div className="text-red-500">{error.issn}</div>}
        </div>
        <div className="mb-5">
          <label className="mb-1 block">Link 1</label>
          <input
            type="text"
            name="link1"
            placeholder="Enter Link 1"
            value={formData.link1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.link1 && <div className="text-red-500">{error.link1}</div>}
        </div>

        <div className="mb-5">
          <label className="mb-1 block">Link 2</label>
          <input
            type="text"
            name="link2"
            placeholder="Enter Link 2"
            value={formData.link2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.link2 && <div className="text-red-500">{error.link2}</div>}
        </div>

        <div className="mb-5">
          <label className="mb-1 block">Payment Amount</label>
          <input
            type="text"
            name="payment"
            placeholder="Enter payment amount"
            value={formData.payment}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none"
          />
          {error.payment && <div className="text-red-500">{error.payment}</div>}
        </div>

      </div>
    </form>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-5"
      onClick={onSubmit}
    >
      <i></i>&nbsp;Save
    </button>
  </div>
</div>

    );

}
export default Addresarchpaperreq
