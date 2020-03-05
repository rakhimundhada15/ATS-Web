import React, { useState, useEffect } from 'react';
import AddCandidate from '../Candidate/AddCandidate';
import { Button, Table } from 'antd';
import * as CandidateApi from '../../api/candidateApi';
import DataTable from '../../components/shared/dataTable'

function CandidateApp() {
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [listOfCandidate, setListOfCandidate] = useState(CandidateApi.getCandidates());

  const showModal = () => {
    setShowAddCandidate(true);
  }
  const closeModal = () => {
    setSelectedCandidate("");
    setListOfCandidate(CandidateApi.getCandidates());
    setShowAddCandidate(false);
  }

  const handleClick = (candidateId)=>{
    setShowAddCandidate(true);
    setSelectedCandidate(candidateId);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',     
      render: (text, record) => (
        <span>
          <a onClick={() => handleClick(record.id)}>{text}</a>
        </span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
  ];


  return (
    <>
    {showAddCandidate? <AddCandidate onCloseModal={closeModal} selectedCandidate={selectedCandidate}/>: null}
    <DataTable columns={columns} 
            dataSource={listOfCandidate} 
            modelButtonLabel="Add Candidate" 
            showModal={showModal}
            rowKey='id' /> 
    </>
  );
}

export default CandidateApp;
