import React, { useState, useEffect } from 'react';
import './CandidateInfo.css';
import {Button} from 'antd';
import * as candidatesAPI from "../../api/candidateApi";

export default function CandidateDetails(props) {
    const [details, setDetails] = useState({});

    useEffect(() => {
        async function fetchDetails() {
            const _details =  await candidatesAPI.getCandidateById(props.id);
            setDetails(_details);
        }
        fetchDetails();
    }, [])

    return (
        <>
            <div className="ant-row">
            <Button className="btn2" type="primary">Delete</Button>
            <Button className="btn1" type="primary">Edit</Button>
            </div>
            <div className="ant-row ant-col-24 row1">
                <div className="ant-col-6">
                    <label>Email:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.emailAddress}]</span>
                </div>
                <div className="ant-col-6">
                    <label>Resume:</label>
                </div>
                <div className="ant-col-6">
                    <a href="abc.txt">[abc]</a>
                </div>
            </div>
            <div className="ant-row ant-col-24 row1">
                <div className="ant-col-6">
                    <label>Phone No.:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.phoneNumber}]</span>
                </div>

                <div className="ant-col-6">
                    <label>Location:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.location}]</span>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col-6">
                    <label>First Name:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.firstName}]</span>
                </div>

                <div className="ant-col-6">
                    <label>Experience (yrs):</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.experience}]</span>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col-6">
                    <label>Middle Name:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.middleName}]</span>
                </div>

                <div className="ant-col-6">
                    <label>Skillset:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.skillSet}]</span>
                </div>
            </div>

            <div className="ant-row ant-col-24 row1">
                <div className="ant-col-6">
                    <label>Last Name:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.lastName}]</span>
                </div>

                <div className="ant-col-6">
                    <label>Referrer:</label>
                </div>
                <div className="ant-col-6">
                    <span>[{details && details.referrer}]</span>
                </div>
            </div>
        </>
    )
}
