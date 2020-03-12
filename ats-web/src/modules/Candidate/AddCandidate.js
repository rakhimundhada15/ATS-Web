import React, { useState, useEffect, useContext } from 'react';
import TextInput from './../../components/shared/TextInput';
import DropdownElement from './../../components/shared/DropdownElement';
import FileSelector from './../../components/shared/FileSelector';
import InputSpinner from './../../components/shared/InputSpinner';
import { Modal } from 'antd';
import * as CandidateDetails from './CandidateDetails';
import * as CandidateApi from '../../api/candidateApi';
import  EmployeeContext from '../../contexts/EmployeeContext';

let _defaultCandidateDetails = {
  email: "",
  mobileno: "",
  address: "",
  name: "",
  skills: "",
  reffered_by: "",
  source: "",
  status: "",
  current_ctc: "",
  expected_ctc: "",
  current_organization: "",
  notice_period: "",
  experience: "0"
};

function AddCandidate(props) {
  document.title = 'Add Candidate';

  const statuses = [
    { Val: 'Shortlisted', Label: 'Shortlisted' },
    { Val: 'Selected', Label: 'Selected' },
    { Val: 'Hold', Label: 'Hold' },
    { Val: 'InProgress', Label: 'In Progress' },
    { Val: 'Rejected', Label: 'Rejected' }
  ];
  const sources = [
    { Val: 'LinkedIn', Label: 'LinkedIn' },
    { Val: 'Naukri', Label: 'Naukri' },
    { Val: 'Referral', Label: 'Referral' },
    { Val: 'Direct', Label: 'Direct' },
    { Val: 'OtherSource', Label: 'Other Source' }
  ];

  const employeeList = useContext(EmployeeContext);
  
  const [candidateDetails, setCandidateDetails] = useState(_defaultCandidateDetails);
  const [candidateDetailErrors, setCandidateDetailErrors] = useState({});
  const [referrerList, setReferrerList] = useState([]);
  const [candidateResume, setCandidateResume] = useState(null);

  useEffect(() => {
    if(props.selectedCandidateDetails){
       const candidate_details = props.selectedCandidateDetails;
      setCandidateDetails(candidate_details);
    }else{
      setCandidateDetails(_defaultCandidateDetails);
    }
  }, [])

  useEffect(()=>{
    if(Object.entries(employeeList).length !== 0){
      let _referrerList = employeeList.map(function (employee) {
          return { Val: employee.id, Label: employee.name };
      });
      setReferrerList(_referrerList);
    }
  },[employeeList])

  const resetForm = () => {
    props.onCloseModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _candidateDetails = { ...candidateDetails };
    let _candidateDetailErrors = { ...candidateDetailErrors };

    Object.keys(_candidateDetails).map(function (key) {
      if((key !== "resume" && key !== "reffered_by") || (key === "reffered_by" && _candidateDetails.source === "Referral"))
        _candidateDetailErrors = CandidateDetails.validate(_candidateDetailErrors, key, _candidateDetails[key]);
    })

    if(_candidateDetails && !_candidateDetails.id){
      _candidateDetailErrors = CandidateDetails.validate(_candidateDetailErrors,"resume",candidateResume);
    }
    setCandidateDetailErrors(_candidateDetailErrors);
    if (Object.entries(_candidateDetailErrors).length === 0) {
      setCandidateDetails(_candidateDetails);
      const response = await CandidateApi.saveCandidate(_candidateDetails,candidateResume);
  
      if(response.id){
        props.onCloseModal(true);
      }     
    }
  };

  const handleOnChange = e => {
    let _candidateDetails = { ...candidateDetails, [e.target.name]: e.target.value };
    setCandidateDetails(_candidateDetails);
    let _candidateDetailErrors = { ...candidateDetailErrors, [e.target.name]: "" };
    _candidateDetailErrors = CandidateDetails.validate(_candidateDetailErrors, e.target.name, e.target.value.trim());
    setCandidateDetailErrors(_candidateDetailErrors);
  }

  const handleOnFileChange = e => {
    setCandidateResume(e.target.files[0]);
  }

  const handleOnSelectChange = (field, value) => {
    let _candidateDetails = { ...candidateDetails, [field]: value };
    if (field === "source" && value !== "Referral") {
      _candidateDetails.reffered_by = 0;
    }
    setCandidateDetails(_candidateDetails);
    let _candidateDetailErrors = { ...candidateDetailErrors, [field]: "" };
    setCandidateDetailErrors(_candidateDetailErrors);
  }

  const handleExperience = (experience) => {
    let _candidateDetails = { ...candidateDetails, "experience": experience };
    setCandidateDetails(_candidateDetails);
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
        onOk={(e) => handleSubmit(e)}
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
              value={candidateDetails.email ? candidateDetails.email : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.email ? candidateDetailErrors.email : ""}
            />
          </div>
          <div className="ant-col-12">
            <FileSelector
              id="resume"
              label="Resume: "
              labelclassName=""
              name="resume"
              value={candidateDetails.resume ? candidateDetails.resume : ""}
              onChange={(e) => handleOnFileChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.resume ? candidateDetailErrors.resume : ""}
              acceptFilesOfType="*.*"
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <TextInput
              id="mobileno"
              label="Phone Number:"
              labelclassName=""
              name="mobileno"
              value={candidateDetails.mobileno ? candidateDetails.mobileno : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.mobileno ? candidateDetailErrors.mobileno : ""}
            />
          </div>
          <div className="ant-col-12">
            <TextInput
              id="address"
              label="Location:"
              labelclassName=""
              name="address"
              value={candidateDetails.address ? candidateDetails.address : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.address ? candidateDetailErrors.address : ""}
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <TextInput
              id="name"
              label="Name:"
              labelclassName=""
              name="name"
              value={candidateDetails.name ? candidateDetails.name : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.name ? candidateDetailErrors.name : ""}
            />
          </div>
          <div className="ant-col-12">
            <InputSpinner
              id="experience"
              name="experience"
              min={0}
              max={100}
              isRequired={true}
              label="Experience:"
              onChange={handleExperience}
              controlClass=""
              value={candidateDetails.experience ? candidateDetails.experience : "0"}
              errorMsg={candidateDetailErrors.experience ? candidateDetailErrors.experience : ""}
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <DropdownElement
              id="source"
              name="source"
              label="Source :"
              placeHolder="Select Source"
              isRequired={true}
              onChange={(e) => handleOnSelectChange("source", e)}
              value={candidateDetails.source ? candidateDetails.source : ""}
              error={candidateDetailErrors.source ? candidateDetailErrors.source : ""}
              array={sources}
              containerClass="ant-col-24"
              containerErrorClass="ant-col-24 has-error"
              divLabelClass="ant-col ant-form-item-label ant-col-8"
              divSelectClass="ant-col-16"
              fieldClass="ant-col-18"
            />
          </div>
          <div className="ant-col-12">
            <DropdownElement
              id="reffered_by"
              name="reffered_by"
              label="Referrer :"
              placeHolder="Select Referrer"
              isRequired={true}
              isDisabled={candidateDetails.source !== "Referral"}
              onChange={(e) => handleOnSelectChange("reffered_by", e)}
              value={candidateDetails.reffered_by ? candidateDetails.reffered_by : ""}
              error={candidateDetailErrors.reffered_by ? candidateDetailErrors.reffered_by : ""}
              array={referrerList}
              containerClass="ant-col-24"
              containerErrorClass="ant-col-24 has-error"
              divLabelClass="ant-col ant-form-item-label ant-col-8"
              divSelectClass="ant-col-16"
              fieldClass="ant-col-18"
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <TextInput
              id="skills"
              label="Skill Set:"
              labelclassName=""
              name="skills"
              value={candidateDetails.skills ? candidateDetails.skills : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.skills ? candidateDetailErrors.skills : ""}
            />
          </div>
          <div className="ant-col-12">
            <DropdownElement
              id="status"
              name="status"
              label="Status :"
              placeHolder="Select Status"
              isRequired={true}
              onChange={(e) => handleOnSelectChange("status", e)}
              value={candidateDetails.status ? candidateDetails.status : ""}
              error={candidateDetailErrors.status ? candidateDetailErrors.status : ""}
              array={statuses}
              containerClass="ant-col-24"
              containerErrorClass="ant-col-24 has-error"
              divLabelClass="ant-col ant-form-item-label ant-col-8"
              divSelectClass="ant-col-16"
              fieldClass="ant-col-18"
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <TextInput
              id="current_ctc"
              label="Current CTC:"
              labelclassName=""
              name="current_ctc"
              value={candidateDetails.current_ctc ? candidateDetails.current_ctc : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.current_ctc ? candidateDetailErrors.current_ctc : ""}
            />
          </div>
          <div className="ant-col-12">
            <TextInput
              id="expected_ctc"
              label="Expected CTC:"
              labelclassName=""
              name="expected_ctc"
              value={candidateDetails.expected_ctc ? candidateDetails.expected_ctc : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.expected_ctc ? candidateDetailErrors.expected_ctc : ""}
            />
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col-12">
            <TextInput
              id="current_organization"
              label="Current Organization:"
              labelclassName=""
              name="current_organization"
              value={candidateDetails.current_organization ? candidateDetails.current_organization : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.current_organization ? candidateDetailErrors.current_organization : ""}
            />
          </div>
          <div className="ant-col-12">
            <TextInput
              id="notice_period"
              label="Notice Period (in days):"
              labelclassName=""
              name="notice_period"
              value={candidateDetails.notice_period ? candidateDetails.notice_period : ""}
              onChange={(e) => handleOnChange(e)}
              isRequired={true}
              errorMsg={candidateDetailErrors.notice_period ? candidateDetailErrors.notice_period : ""}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddCandidate;
