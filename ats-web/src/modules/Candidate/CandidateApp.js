import React, { useState, useEffect } from 'react';
import AddCandidate from '../Candidate/AddCandidate';
import Details from '../Candidate/Details';
import * as CandidateApi from '../../api/candidateApi';
import DataTable from '../../components/shared/dataTable'

function CandidateApp() {
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [listOfCandidates, setListOfCandidates] = useState([]);
  const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            const _details = await CandidateApi.getCandidates();
            setListOfCandidates(_details);
            setisLoading(false);
        }
        fetchDetails();
    }, [])
    
  const showModal = () => {
    setShowAddCandidate(true);
  }
  const closeModal = () => {
    setSelectedCandidateId("");
    // setListOfCandidates(CandidateApi.getCandidates());
    setShowAddCandidate(false);
  }

  const handleClick = (candidateId)=>{
    setShowAddCandidate(false);
    setSelectedCandidateId(candidateId);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',     
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
      dataIndex: 'mobileno',
      key: 'mobileno',
    },
  ];

  return (
    <>
    {selectedCandidateId ? <Details selectedCandidateId={selectedCandidateId}/> : 
      <>
      {showAddCandidate ? <AddCandidate onCloseModal={closeModal} />: null}
      {!isLoading && <DataTable columns={columns} 
              dataSource={listOfCandidates} 
              modelButtonLabel="Add Candidate" 
              showModal={showModal}
              rowKey='id' /> }
              </>
    }
    </>
  );
}

export default CandidateApp;
