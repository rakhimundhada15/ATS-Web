import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TextInput from './../../components/shared/TextInput';
import HorizontalTabs from './../../components/shared/HorizontalTabs';
import ReactLoader from './../../components/shared/loader';
import FileSelector from './../../components/shared/FileSelector';
import InputSpinner from './../../components/shared/InputSpinner';
import { Modal } from 'antd';
import * as CandidateDetails from './CandidateDetails';
import * as CandidateApi from '../../api/candidateApi';

let _defaultCandidateDetails = {
  email: "",
  mobileNumber: "",
  address: "",
  firstName: "",
  middleName: "",
  skills: [],
  lastName: "",
  referrer: "",
  source: "",
  status: "",
  currentCtc: "",
  expectedCtc: "",
  currentOrganisation: "",
  noticePeriod: "",
};

function AddCandidate(props) {
  document.title = 'Add Candidate';
    
  if(props.selectedCandidate){
    _defaultCandidateDetails = CandidateApi.getCandidateById(props.selectedCandidate);
  }

  const [candidateDetails, setCandidateDetails] = useState(_defaultCandidateDetails);
  const [candidateDetailErrors, setCandidateDetailErrors] = useState({});

  const resetForm = () => {
    props.onCloseModal();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let _candidateDetails = { ...candidateDetails };
    let _candidateDetailErrors = { ...candidateDetailErrors };

    Object.keys(_candidateDetails).map(function (key) {
      _candidateDetailErrors = CandidateDetails.validate(_candidateDetailErrors, key, _candidateDetails[key]);
    })
    
    setCandidateDetailErrors(_candidateDetailErrors);
    if(Object.entries(_candidateDetailErrors).length === 0){
      //console.log(_candidateDetails.skills);
      _candidateDetails.skills = _candidateDetails.skills.toString().split(',');
      setCandidateDetails(_candidateDetails);
      CandidateApi.saveCandidate(_candidateDetails);
      props.onCloseModal();
    }
  };

  const handleOnChange = e => {
    let _candidateDetails = { ...candidateDetails, [e.target.name]: e.target.value} ;
    setCandidateDetails(_candidateDetails);

    let _candidateDetailErrors = { ...candidateDetailErrors, [e.target.name]: "" };
   _candidateDetailErrors = CandidateDetails.validate(_candidateDetailErrors, e.target.name, e.target.value.trim());    
    setCandidateDetailErrors(_candidateDetailErrors);
  }

  return (
    <>
    <Modal
          className="add-candidate-modal"
          wrapClassName="wrap-add-candidate"
          title="Add Candidate"
          centered
          visible={true}
          okText="Save"
          cancelText="Cancel"
          onOk={(e) =>  handleSubmit(e)}
          onCancel={(e) => resetForm(e)}
          width="1000px"
        >
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="email"
            label="Email Address:"
            labelclassName=""
            name="email"
            value={candidateDetails.email ? candidateDetails.email: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.email ? candidateDetailErrors.email : ""}
          />
        </div>
        <div className="ant-col-12">
          <FileSelector
            id="file-selector"
            label="Select : "
            labelclassName=""
            name="fileSelector"
            value=""
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg="Please select a file"
            acceptFilesOfType="*.*"
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="mobileNumber"
            label="Phone Number:"
            labelclassName=""
            name="mobileNumber"
            value={candidateDetails.mobileNumber ? candidateDetails.mobileNumber: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.mobileNumber ? candidateDetailErrors.mobileNumber : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="address"
            label="Location:"
            labelclassName=""
            name="address"
            value={candidateDetails.address ? candidateDetails.address: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.address ? candidateDetailErrors.address : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="firstName"
            label="First Name:"
            labelclassName=""
            name="firstName"
            value={candidateDetails.firstName ? candidateDetails.firstName: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.firstName ? candidateDetailErrors.firstName : ""}
          />
        </div>
        <div className="ant-col-12">
          <InputSpinner
            id="experience"
            name="experience"
            min={0}
            max={100}
            isRequired={false}
            label="Experience:"
            errorMsg=""
            onChange={(e) => console.log(e)}
            controlClass=""
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="middleName"
            label="Middle Name:"
            labelclassName=""
            name="middleName"
            value={candidateDetails.middleName ? candidateDetails.middleName: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={false}
            errorMsg={candidateDetailErrors.middleName ? candidateDetailErrors.middleName : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="skills"
            label="Skill Set:"
            labelclassName=""
            name="skills"
            value={candidateDetails.skills ? candidateDetails.skills.toString() : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.skills ? candidateDetailErrors.skills : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="lastName"
            label="Last Name:"
            labelclassName=""
            name="lastName"
            value={candidateDetails.lastName ? candidateDetails.lastName: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={false}
            errorMsg={candidateDetailErrors.lastName ? candidateDetailErrors.lastName : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="referrer"
            label="Referrer:"
            labelclassName=""
            name="referrer"
            value={candidateDetails.referrer ? candidateDetails.referrer: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.referrer ? candidateDetailErrors.referrer : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="source"
            label="Source:"
            labelclassName=""
            name="source"
            value={candidateDetails.source ? candidateDetails.source: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.source ? candidateDetailErrors.source : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="status"
            label="Status:"
            labelclassName=""
            name="status"
            value={candidateDetails.status ? candidateDetails.status: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.status ? candidateDetailErrors.status : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="currentCtc"
            label="Current CTC:"
            labelclassName=""
            name="currentCtc"
            value={candidateDetails.currentCtc ? candidateDetails.currentCtc: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.currentCtc ? candidateDetailErrors.currentCtc : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="expectedCtc"
            label="Expected CTC:"
            labelclassName=""
            name="expectedCtc"
            value={candidateDetails.expectedCtc ? candidateDetails.expectedCtc: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.expectedCtc ? candidateDetailErrors.expectedCtc : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="currentOrganisation"
            label="Current Organization:"
            labelclassName=""
            name="currentOrganisation"
            value={candidateDetails.currentOrganisation ? candidateDetails.currentOrganisation: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.currentOrganisation ? candidateDetailErrors.currentOrganisation : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="noticePeriod"
            label="Notice Period:"
            labelclassName=""
            name="noticePeriod"
            value={candidateDetails.noticePeriod ? candidateDetails.noticePeriod: ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetailErrors.noticePeriod ? candidateDetailErrors.noticePeriod : ""}
          />
        </div>
      </div>
      </Modal>
    </>
  );
}

export default AddCandidate;
