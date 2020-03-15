import React, { useState, useEffect, useContext } from 'react';
import './CandidateInfo.css';
import {Button} from 'antd';
import * as candidatesAPI from "../../api/candidateApi";
import AddCandidate from "./AddCandidate";
import  EmployeeContext from '../../contexts/EmployeeContext';

export default function CandidateInfo(props) {
    const employeeList = useContext(EmployeeContext);
    const [details, setDetails] = useState({});
    const [showEditCandidate, setShowEditCandidate] = useState(false);
    const [referrerName, setReferrerName] = useState("");
    const [reloadCandidate, setReloadCandidate] = useState(true);
    
    useEffect(() => {
        async function fetchDetails() {
            if (reloadCandidate) {
                const _details = await candidatesAPI.getCandidate(props.id);
                setDetails(_details);

                if (_details && _details.reffered_by != null && employeeList) {
                    let _referrerName = employeeList.filter(employee => employee.id == _details.reffered_by)[0].name;
                    setReferrerName(_referrerName);
                }
                setReloadCandidate(false);
            }
        }
        fetchDetails();
    }, [reloadCandidate]);


    const toggleEditPopup = () => {
        setShowEditCandidate(!showEditCandidate);
        setReloadCandidate(true);
    }

    return (
        <>
        {showEditCandidate ? <AddCandidate onCloseModal={toggleEditPopup} selectedCandidateDetails={details}/>: null}

            <div className="ant-row">
                <Button className="btn" type="primary" onClick={toggleEditPopup}>Edit</Button>
            </div>
            <div className="ant-row ant-col-24">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">
                        Email:
                    </label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.email}</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Name:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.name}</label>
                </div>
            </div>
            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Phone No:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.mobileno}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Address:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.address}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Resume:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item"><a href={candidatesAPI.baseUrl+"/"+details.id+"/resume"}>Download</a></label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Experience (yrs):</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.experience}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Current Organisation:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.current_organization}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Skillset:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.skills}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Expected Ctc:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.expected_ctc}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Current Ctc:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.current_ctc}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Notice Period:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.notice_period} days</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Referred By:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && referrerName }</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Source:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.source}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Status:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.status}</label>
                </div>
            </div>
        </>
    )
}
