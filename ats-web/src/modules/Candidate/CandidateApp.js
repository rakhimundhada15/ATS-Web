import React, { useState, useEffect } from 'react';
import TestComponent from '../../TestComponent'
import HorizontalTabs from '../../components/shared/HorizontalTabs';
import AddCandidate from '../Candidate/AddCandidate';
import { Button } from 'antd';

function CandidateApp() {
  const [TabList, setTabList] = useState([]);
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  const closeModal = () => {
    setShowAddCandidate(false);
  }


  useEffect(() => {
    let tab_list = [];
    tab_list.push({ "title": "Candidate Details", "URL": <TestComponent tabDetails="CandidateDetails" numberOfRows={2} /> });
    tab_list.push({ "title": "Feedback", "URL": <TestComponent tabDetails="Feedback" numberOfRows={5} /> });
    setTabList(tab_list)
  }, []);

  return (
    <>
    <Button type="primary" onClick={() => setShowAddCandidate(true)}>
        Add Candidate
    </Button>
    <hr></hr>
    <HorizontalTabs tabList={TabList} />
    {showAddCandidate? <AddCandidate onCloseModal={closeModal} />: null}
    </>
  );
}

export default CandidateApp;
