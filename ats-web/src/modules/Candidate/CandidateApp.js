import React, { useState, useEffect } from 'react';
import TestComponent from '../../TestComponent'
import HorizontalTabs from '../../components/shared/HorizontalTabs';

function CandidateApp() {
  const [TabList, setTabList] = useState([]);
  useEffect(() => {
    let tab_list = [];
    tab_list.push({ "title": "Candidate Details", "URL": <TestComponent tabDetails="CandidateDetails" numberOfRows={2} /> });
    tab_list.push({ "title": "Feedback", "URL": <TestComponent tabDetails="Feedback" numberOfRows={5} /> });
    setTabList(tab_list)
  }, []);

  return (
    <HorizontalTabs tabList={TabList} />
  );
}

export default CandidateApp;
