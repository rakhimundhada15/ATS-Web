import React, { useState, useEffect } from 'react';
import './CandidateInfo.css';
import {Button} from 'antd';
import * as candidatesAPI from "../../api/candidateApi";

export default function CandidateDetails(props) {
    const [details, setDetails] = useState({});

    useEffect(() => {
        async function fetchDetails() {
            const _details =  await candidatesAPI.getCandidate(9);
            setDetails(_details);
        }
        fetchDetails();
    }, [])

    return (
        <>
            <div className="ant-row">
                {/* <Button className="btn" type="primary">Delete</Button> */}
                <Button className="btn" type="primary">Edit</Button>
            </div>
            <div className="ant-row ant-col-24">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">
                        Email
                    </label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.email}</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Name</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.name}</label>
                </div>
            </div>
            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Phone No</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.mobileno}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Address</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.address}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Resume</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item"><a href="abc.txt">{details && details.resume}</a></label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Experience (yrs)</label>
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
                    <label className="ant-form-item">Skillset</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.skills}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Expected Ctc</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.expected_ctc}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Current Ctc</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.current_ctc}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Notice Period</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.notice_period}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Referred By</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.reffered_by}</label>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Source</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.source}</label>
                </div>

                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">Status</label>
                </div>
                <div className="ant-col ant-form-item-label ant-col-6">
                    <label className="ant-form-item">{details && details.status}</label>
                </div>
            </div>
        </>
    )
}
