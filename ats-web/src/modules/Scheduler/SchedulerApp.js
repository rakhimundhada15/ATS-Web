import React, { useState, useEffect } from 'react';
import * as InterviewsApi from '../../api/InterviewsApi';
import ScheduleInterview from './ScheduleInterview';
import DataTable from '../../components/shared/dataTable';
import Loader from '../../components/shared/loader';
function SchedulerApp() {
    const [listOfInterviews, setListOfInterviews] = useState([]);
    const [showScheduleInterview, setShowScheduleInterview] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        async function fetchScheduleInterviewDetails() {
            const list = await InterviewsApi.getScheduleInterviewList();
            if(Object.keys(list).length !==0){
                setListOfInterviews(list);
            }
            setisLoading(false);
        }
        fetchScheduleInterviewDetails();
    },[])
    const columns = [
        {
            title: 'Opening',
            dataIndex: 'comment',
            key: 'comment',
            render: text => <a>{text}</a>
        },
        {
            title: 'Interview Panel',
            dataIndex: 'employee_id',
            key: 'employee_id',
        },
        {
            title: 'Candidate',
            dataIndex: 'job_has_candidate_id',
            key: 'job_has_candidate_id',
        },
        {
            title: 'Interview Date',
            dataIndex: 'schedule_time',
            key: 'schedule_time',
        },
        {
            title: 'Mode of Interview',
            dataIndex: 'channel',
            key: 'channel',

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        }
    ];



    const showModal = () => {
        setShowScheduleInterview(true);
    }
    const closeModal = () => {
        // setSelectedCandidateId("");
        // setListOfCandidates(CandidateApi.getCandidates());
        setShowScheduleInterview(false);
    }


    return (
        <>
            {showScheduleInterview ? <ScheduleInterview onCancel={closeModal} /> : null}
            {isLoading ? <Loader loading={isLoading}/> :<DataTable columns={columns}
                dataSource={listOfInterviews}
                modelButtonLabel="Schedule Interview"
                showModal={showModal}
                rowKey='id'/>}
        </>
    );
}

export default SchedulerApp;
