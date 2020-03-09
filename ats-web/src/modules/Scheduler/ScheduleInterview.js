import React, { useState } from 'react';
import { Modal } from 'antd';
import DropdownElement from '../../components/shared/DropdownElement';
import TextInput from './../../components/shared/TextInput';
import DateTimePicker from './../../components/shared/datePicker';
import TextArea from './../../components/shared/TextArea';
import * as InterviewsApi from '../../api/InterviewsApi';

function ScheduleInterview(props) {

    const defaultSchedulerDetails = {
        candidateName: '',
        employeeName: '',
        chanel: '',
        location:'',
        scheduleTime: '',
        feedback: '',
        comments: ''
    }

    const [schedulerDetails, setSchedulerDetails] = useState(defaultSchedulerDetails);
    const [schedulerDetailsErrors, setSchedulerDetailsErrors] = useState({});
    const openPositions = [];
    const modeOfInterview = [{
        Val: 'f2f',
        Label: 'Face to Face'
    },
    {
        Val: 'telephonic',
        Label: 'Telephonic'
    }];
    const interviewLocation = [
        {
            Val: 'Niyuj SAT',
            Label: 'Niyuj SAT'
        },
        {
            Val: 'Niyuj HQ',
            Label: 'Niyuj HQ'
        }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        let scheduleDetails= { ...schedulerDetails };
        let scheduleDetailsErrors = { ...schedulerDetailsErrors };
    
        Object.keys(scheduleDetails).map(function (key) {
            scheduleDetailsErrors = validate(scheduleDetailsErrors, key, scheduleDetails[key]);
        })
        setSchedulerDetailsErrors(scheduleDetailsErrors);
        if(Object.entries(scheduleDetailsErrors).length === 0){
           console.log('scheduleDetails ',scheduleDetails)
            setSchedulerDetails(scheduleDetails);
            InterviewsApi.setScheduleInterview()
            props.onCancel();
        }
    }
    const resetForm = () => {
        props.onCancel();
    }

    const handleOnChange = (e) => {
        let schedulerDetails = { ...schedulerDetails, [e.target.name]: e.target.value} ;
        setSchedulerDetails(schedulerDetails);
    
    //     let scheduleDetailsErrors = { ...schedulerDetailsErrors, [e.target.name]: "" };
    //   // _candidateDetailErrors = CandidateDetails.validate(scheduleDetailsErrors, e.target.name, e.target.value.trim());    
    //     setCandidateDetailErrors(scheduleDetailsErrors);
    }

    const validate = (schedulerDetailsErrors,key , value)=>{

    }
    const listOfCandidates =[]
    const handleDropDownChange =(key ,value)=>{
        let scheduleDetails = { ...schedulerDetails, [key]: [value] };
        setSchedulerDetails(scheduleDetails);
    }
    return (
        <Modal title="Schedule Interview"
            centered
            visible={true}
            okText="Save"
            cancelText="Cancel"
            onOk={(e) => handleSubmit(e)}
            onCancel={(e) => resetForm(e)}
            width="1000px">
            <div className="ant-row">
                <div className="ant-col-12">
                    <DropdownElement
                        id="candidateName"
                        label="Candidate Name :"
                        name="candidateName"
                        placeHolder="Select Candidate"
                        onChange={(e) => handleDropDownChange(e)}
                        isRequired={true}
                        array={modeOfInterview}
                        errorMsg={schedulerDetailsErrors.candidateName ? schedulerDetailsErrors.candidateName : ""}
                    />
                </div>
                <div className='ant-col-12'>
                    <DropdownElement
                        id="employeeName" name="employeeName"
                        placeHolder="Select Interviewer"
                        onChange={(e) => handleDropDownChange('positions', e)}
                        isRequired={true}
                        errorMsg={schedulerDetailsErrors.employeeName ? schedulerDetailsErrors.employeeName : ""}
                        label='Interview panel' array={modeOfInterview} />
                </div>
            </div>
            <div className="ant-row">
                <div className='ant-col-12'>
                    <DropdownElement
                        id="chanel" name="chanel"
                        placeHolder="Select mode of Interview"
                        onChange={(e) => handleDropDownChange('positions', e)}
                        isRequired={true}
                        errorMsg={schedulerDetailsErrors.chanel ? schedulerDetailsErrors.chanel : ""}
                        label='Mode of Interview' array={modeOfInterview} />
                </div>
                <div className="ant-col-12">
                    <DateTimePicker id="scheduleTime" name='scheduleTime' isRequired={true}
                        label="Schedule Time" errorMsg={schedulerDetailsErrors.scheduleTime ? schedulerDetailsErrors.scheduleTime : ""} onChange={(date) => console.log("Interview schedule on ", date)} />

                </div>
            </div>
            <div className="ant-row">
                <div className='ant-col-12'>
                    <DropdownElement
                        id="location" name="location"
                        placeHolder="Select location"
                        onChange={(e) => handleDropDownChange('location', e)} label='Interview Location'
                        errorMsg={schedulerDetailsErrors.location ? schedulerDetailsErrors.location : ""}
                        array={interviewLocation}
                        isRequired={true} />
                </div>
            </div>
            <div className="ant-row">
                <div className='ant-col-12'>
                    <TextArea
                        id="comments"
                        label="Comments :"
                        name="comments"
                        rows={5}
                        disable ={false}
                        value={schedulerDetails.comments ? schedulerDetails.comments : ""}
                        onChange={(e) => handleOnChange(e)}
                        
                    />
                </div>
                <div className="ant-col-12">
                    <TextArea
                        id="feedback"
                        label="Feedback :"
                        name="feedback"
                        rows={5}
                        disable ={false}
                        value={schedulerDetails.feedback ? schedulerDetails.feedback : ""}
                        onChange={(e) => handleOnChange(e)}
                       
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ScheduleInterview;