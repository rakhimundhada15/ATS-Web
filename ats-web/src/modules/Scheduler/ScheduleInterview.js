import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import DropdownElement from '../../components/shared/DropdownElement';
import DateTimePicker from './../../components/shared/datePicker';
import TextArea from './../../components/shared/TextArea';
import * as InterviewsApi from '../../api/InterviewsApi';
import * as resources from '../../components/common/resources';
import * as SharedApi from '../../api/sharedApi';

function ScheduleInterview(props) {

    const defaultSchedulerDetails = {
        job_has_candidate_id: "",
        employee_id: "",
        chanel: "",
        location: "",
        schedule_time: "",
        feedback: "",
        comments: ""
    }
    
    const [schedulerDetails, setSchedulerDetails] = useState(defaultSchedulerDetails);
    const [schedulerDetailsErrors, setSchedulerDetailsErrors] = useState({});
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [candidateDetails, setCandidateDetails] = useState([]);
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

    useEffect(() => {
        async function fetchEmployeeDetails() {
            const employeeList = await SharedApi.getDetails('employees');
            if (Object.entries(employeeList).length !== 0) {
                const listOfEmployees = [];
                employeeList.map((list) => {
                    let obj = { "Val": list.id, "Label": list.name, 'key': list.id }
                   return listOfEmployees.push(obj);
                });

                setEmployeeDetails(listOfEmployees);
            }
        }
        // async function fetchCandidateDetails() {
        //     const candidateList = await SharedApi.getDetails('candidates');
        //     if (Object.entries(candidateList).length !== 0) {
        //         const listOfCandidates = [];
        //         candidateList.map((list) => {
        //             let obj = { "Val": list.id, "Label": list.title, 'key': list.id }
        //             listOfCandidates.push(obj);
        //         });

        //         setOpenPositions(listOfCandidates);
        //     }
        // }
        fetchEmployeeDetails();
        //fetchCandidateDetails();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        let scheduleDetails = { ...schedulerDetails};
        let scheduleDetailsErrors = { ...schedulerDetailsErrors };

        Object.keys(scheduleDetails).map(function (key) {
            scheduleDetailsErrors = validate(scheduleDetailsErrors, key,scheduleDetails[key]);
        })
        setSchedulerDetailsErrors(scheduleDetailsErrors);
        if (Object.entries(scheduleDetailsErrors).length === 0) {
            setSchedulerDetails(scheduleDetails);
            const responce = await InterviewsApi.setScheduleInterview(schedulerDetails)
            props.onCancel();
        }
    }
    const resetForm = () => {
        props.onCancel();
    }


    const errorMessages = resources.errorMessages();
    const validate = (schedulerDetailsErrors, elementName, elementValue) => {
        let error = null;
        switch (elementName) {
            case "job_has_candidate_id":
                error = validateSelectedValue(elementValue);
                break;
            case "chanel":
                error = validateSelectedValue(elementValue);
                break;
            case "location":
                error = validateSelectedValue(elementValue);
                break;
            case "schedule_time":
                error = validateSelectedValue(elementValue);
                break;
        }
        if (error) {
            setSchedulerDetailsErrors[elementName] = error;
        }
        return schedulerDetailsErrors;
    }

    const validateSelectedValue = (selectedOption) => {
        if (!selectedOption || selectedOption === "") {
            return errorMessages.invalidFieldselection;
        }
    }
 
    const handleOnChange = (key, value) => {
        let scheduleDetails = { ...schedulerDetails, [key]: value };
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
                        id={schedulerDetails.job_has_candidate_id}
                        label="Candidate Name :"
                        name="job_has_candidate_id"
                        placeHolder="Select Candidate"
                        onChange={(e) => handleOnChange('job_has_candidate_id', e)}
                        isRequired={true}
                        array={employeeDetails}
                        errorMsg={schedulerDetailsErrors.job_has_candidate_id ? schedulerDetailsErrors.job_has_candidate_id +'candidate' : ""}
                    />
                </div>
                <div className='ant-col-12'>
                    <DropdownElement
                        id={schedulerDetails.employee_id} name="employeeName"
                        placeHolder="Select Interviewer"
                        onChange={(e) => handleOnChange('employee_id', e)}
                        isRequired={true}
                        errorMsg={schedulerDetailsErrors.employee_id ? schedulerDetailsErrors.employee_id +'interview panel' : ""}
                        label='Interview panel' array={employeeDetails} />
                </div>
            </div>
            <div className="ant-row">
                <div className='ant-col-12'>
                    <DropdownElement
                        id="chanel" name="chanel"
                        placeHolder="Select mode of Interview"
                        onChange={(e) => handleOnChange('chanel', e)}
                        isRequired={true}
                        errorMsg={schedulerDetailsErrors.chanel ? schedulerDetailsErrors.chanel +'mode of Interview': ""}
                        label='Mode of Interview' array={modeOfInterview} />
                </div>
                <div className="ant-col-12">
                    <DateTimePicker id="schedule_time" name='scheduleTime' isRequired={true}
                        label="Schedule Time" errorMsg={schedulerDetailsErrors.scheduleTime ? schedulerDetailsErrors.scheduleTime + 'Schedule Time' : ""} onChange={(date,dateString)=>handleOnChange('schedule_time',dateString)} />

                </div>
            </div>
            <div className="ant-row">
                <div className='ant-col-12'>
                    <DropdownElement
                        id="location" name="location"
                        placeHolder="Select location"
                        onChange={(e) => handleOnChange('location', e)} label='Interview Location'
                        errorMsg={schedulerDetailsErrors.location ? schedulerDetailsErrors.location +'location': ""}
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
                        minlength={0}
                        value={schedulerDetails.comments ? schedulerDetails.comments : ""}
                        onChange={(e) => handleOnChange('comments',e)}
                    />
                </div>
                <div className="ant-col-12">
                    <TextArea
                        id="feedback"
                        label="Feedback :"
                        name="feedback"
                        rows={5}
                        minlength={0}
                        value={schedulerDetails.feedback ? schedulerDetails.feedback : ""}
                        onChange={(e) => handleOnChange('feedback',e)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ScheduleInterview;