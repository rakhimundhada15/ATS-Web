import React, { useState, useEffect } from 'react';
import './CandidateInfo.css';
import { Button } from 'antd';
import * as candidatesAPI from "../../api/candidateApi";
import AddCandidate from "./AddCandidate";

export default function CandidateDetails(props) {
    const [details, setDetails] = useState({});
    const [showEditCandidate, setShowEditCandidate] = useState(false);

    useEffect(() => {
        async function fetchDetails() {
            const _details = await candidatesAPI.getCandidate(props.id);
            setDetails(_details);
        }
        fetchDetails();
    }, []);

    const toggleEditPopup = () => {
        setShowEditCandidate(!showEditCandidate);
    }

    return (
        <>
        {showEditCandidate ? <AddCandidate onCloseModal={toggleEditPopup} selectedCandidateDetails={details}/>: null}

            <div className="ant-row">
                <Button className="btn" type="primary">Delete</Button>
                <Button className="btn" type="primary" onClick={setShowEditCandidate}>Edit</Button>
            </div>
            <div className="ant-row ant-col-24">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">
                        Email:
                    </label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.email}]</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Name:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.name}]</label>
                </div>
            </div>
            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Phone No.:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.mobileno}]</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Address:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.address}]</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Resume:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <a href="abc.txt">[{details && details.resume}]</a>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Experience (yrs):</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.experience}]</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Current Organisation:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.current_organization}]</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Skillset:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.skills}]</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Expected Ctc:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.expected_ctc}]</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Current Ctc:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.current_ctc}]</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Notice Period:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.notice_period}]</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Referred By:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.reffered_by}]</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Source:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.source}]</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>Status:</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label>[{details && details.status}]</label>
                </div>
            </div>
        </>
    )
}
