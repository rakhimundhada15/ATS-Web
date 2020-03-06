import React, { useState, useEffect } from 'react';
import HorizontalTabs from '../../components/shared/HorizontalTabs';
import CandidateInfo from './CandidateInfo';
import CandidateApp from './CandidateApp';
//import AssociatedPosition from './../Position';
import { Button,Divider } from 'antd';
function Details(props) {
  const [TabList, setTabList] = useState([]);
    const [showAllCandidate ,setShowAllCandidate] = useState(false);

  useEffect(() => {
    let tab_list = [];
    tab_list.push({ "title": "Candidate Details", "URL": <CandidateInfo id={props.selectedCandidateId}/> });
   // tab_list.push({ "title": "Associated Positions", "URL": <AssociatedPosition /> });
    setTabList(tab_list)
  }, []);

  return (

    <>
{
    showAllCandidate ? <CandidateApp></CandidateApp>
    
    : 
    <>
        <Button type="primary" onClick={() => setShowAllCandidate(true)}>
            All Candidates
        </Button> 
        <Divider></Divider>
        <HorizontalTabs tabList={TabList} />
    </>
}
            </>
   
  );
}

export default Details;
