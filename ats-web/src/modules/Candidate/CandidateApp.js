import React, { useState, useEffect } from 'react';
import AddCandidate from '../Candidate/AddCandidate';
import Details from '../Candidate/Details';
import * as CandidateApi from '../../api/candidateApi';
import Delete from '../../components/common/Popconfirm';
import DataTable from '../../components/shared/dataTable'


function CandidateApp() {
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [listOfCandidates, setListOfCandidates] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [reloadCandidates, setReloadCandidates] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
        setisLoading(true);
        const _details = await CandidateApi.getCandidates();
        setListOfCandidates(_details);
        setisLoading(false);
        setReloadCandidates(false);
    }
    fetchDetails();
  }, [reloadCandidates])

  const deletePosition = async (del) => {
    await CandidateApi.deleteCandidate(del.id);
    setReloadCandidates(true);
  }
  const showModal = () => {
    setShowAddCandidate(true);
  }
  const closeModal = (loadCandidates) => {
    setSelectedCandidateId("");
    setShowAddCandidate(false);
    if (loadCandidates) {
      setReloadCandidates(true);
    }    
  }

  const handleClick = (candidateId) => {
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
    {
      title: 'Action',
      key: 'key',
      render: (del) => <Delete onYes={deletePosition} item={del} />
    },
  ];

  return (
    <>
      {selectedCandidateId ? <Details selectedCandidateId={selectedCandidateId} /> :
        <>
          {showAddCandidate ? <AddCandidate onCloseModal={closeModal} /> : null}
          {!isLoading && <DataTable columns={columns}
            dataSource={listOfCandidates}
            modelButtonLabel="Add Candidate"
            showModal={showModal}
            rowKey='id' />}
        </>
      }
    </>
  );
}

export default CandidateApp;
