import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TextInput from './../../components/shared/TextInput';
import HorizontalTabs from './../../components/shared/HorizontalTabs';
import ReactLoader from './../../components/shared/loader';
import FileSelector from './../../components/shared/FileSelector';
import InputSpinner from './../../components/shared/InputSpinner';
import { Modal } from 'antd';
import * as CandidateDetails from './CandidateDetails';

function AddCandidate(props) {
  document.title = 'Add Candidate';

  let _defaultCandidateDetails = {
    emailAddress: { value: "", errorMessage: "" },
    phoneNumber: { value: "", errorMessage: "" },
    location: { value: "", errorMessage: "" },
    firstName: { value: "", errorMessage: "" },
    middleName: { value: "", errorMessage: "" },
    skillSet: { value: "", errorMessage: "" },
    lastName: { value: "", errorMessage: "" },
    referrer: { value: "", errorMessage: "" },
    source: { value: "", errorMessage: "" },
    status: { value: "", errorMessage: "" },
    currentCtc: { value: "", errorMessage: "" },
    expectedCtc: { value: "", errorMessage: "" },
    currentOrg: { value: "", errorMessage: "" },
    noticePeriod: { value: "", errorMessage: "" },
  };

  const [candidateDetails, setCandidateDetails] = useState(_defaultCandidateDetails);

  const resetForm = () => {
    props.onCloseModal();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let _candidateDetails = { ...candidateDetails };
    let errorCount = 0;
    Object.keys(_candidateDetails).map(function (key) {
      _candidateDetails = CandidateDetails.validate(_candidateDetails, key, _candidateDetails[key].value.trim());
      if(_candidateDetails[key].errorMessage){
        errorCount++;
      }
    })
    setCandidateDetails(_candidateDetails);
    if(errorCount==0)
    props.onCloseModal();
  };

  const handleOnChange = e => {
    let _candidateDetails = { ...candidateDetails, [e.target.name]: { "value": e.target.value, "errorMessage": "" } };
    let candidate_details = CandidateDetails.validate(_candidateDetails, e.target.name, e.target.value.trim());
    setCandidateDetails(candidate_details);
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
            id="emailAddress"
            label="Email Address:"
            labelclassName=""
            name="emailAddress"
            value={candidateDetails.emailAddress ? candidateDetails.emailAddress.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.emailAddress ? candidateDetails.emailAddress.errorMessage : ""}
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
            id="phoneNumber"
            label="Phone Number:"
            labelclassName=""
            name="phoneNumber"
            value={candidateDetails.phoneNumber ? candidateDetails.phoneNumber.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.phoneNumber ? candidateDetails.phoneNumber.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="location"
            label="Location:"
            labelclassName=""
            name="location"
            value={candidateDetails.location ? candidateDetails.location.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.location ? candidateDetails.location.errorMessage : ""}
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
            value={candidateDetails.firstName ? candidateDetails.firstName.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.firstName ? candidateDetails.firstName.errorMessage : ""}
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
            value={candidateDetails.middleName ? candidateDetails.middleName.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={false}
            errorMsg={candidateDetails.middleName ? candidateDetails.middleName.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="skillSet"
            label="Skill Set:"
            labelclassName=""
            name="skillSet"
            value={candidateDetails.skillSet ? candidateDetails.skillSet.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.skillSet ? candidateDetails.skillSet.errorMessage : ""}
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
            value={candidateDetails.lastName ? candidateDetails.lastName.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={false}
            errorMsg={candidateDetails.lastName ? candidateDetails.lastName.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="referrer"
            label="Referrer:"
            labelclassName=""
            name="referrer"
            value={candidateDetails.referrer ? candidateDetails.referrer.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.referrer ? candidateDetails.referrer.errorMessage : ""}
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
            value={candidateDetails.source ? candidateDetails.source.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.source ? candidateDetails.source.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="status"
            label="Status:"
            labelclassName=""
            name="status"
            value={candidateDetails.status ? candidateDetails.status.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.status ? candidateDetails.status.errorMessage : ""}
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
            value={candidateDetails.currentCtc ? candidateDetails.currentCtc.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.currentCtc ? candidateDetails.currentCtc.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="expectedCtc"
            label="Expected CTC:"
            labelclassName=""
            name="expectedCtc"
            value={candidateDetails.expectedCtc ? candidateDetails.expectedCtc.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.expectedCtc ? candidateDetails.expectedCtc.errorMessage : ""}
          />
        </div>
      </div>
      <div className="ant-row">
        <div className="ant-col-12">
          <TextInput
            id="currentOrg"
            label="Current Organization:"
            labelclassName=""
            name="currentOrg"
            value={candidateDetails.currentOrg ? candidateDetails.currentOrg.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.currentOrg ? candidateDetails.currentOrg.errorMessage : ""}
          />
        </div>
        <div className="ant-col-12">
          <TextInput
            id="noticePeriod"
            label="Notice Period:"
            labelclassName=""
            name="noticePeriod"
            value={candidateDetails.noticePeriod ? candidateDetails.noticePeriod.value : ""}
            onChange={(e) => handleOnChange(e)}
            isRequired={true}
            errorMsg={candidateDetails.noticePeriod ? candidateDetails.noticePeriod.errorMessage : ""}
          />
        </div>
      </div>
      </Modal>
    </>
  );
}

export default AddCandidate;
