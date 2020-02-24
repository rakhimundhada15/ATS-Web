import React, { useState, useEffect } from 'react';
import TextInput from './components/shared/TextInput';
import TestComponent from './TestComponent'
import HorizontalTabs from './components/shared/HorizontalTabs';
import Loader from './components/shared/loader';
import FileSelector from './components/shared/FileSelector';
import InputSpinner from './components/shared/InputSpinner';
import TextArea from './components/shared/TextArea';
import DateTimePicker from './components/shared/datePicker';

function App() {
    document.title = 'ATS';
    const [TabList, setTabList] = useState([]);
    // added below variable to render error message conditionally
    const selectDate = true
    useEffect(() => {
        let tab_list = [];
        tab_list.push({ "title": "Candidate Details", "URL": <TestComponent tabDetails="CandidateDetails" numberOfRows={2} /> });
        tab_list.push({ "title": "Feedback", "URL": <TestComponent tabDetails="Feedback" numberOfRows={5} /> });
        setTabList(tab_list)
    }, []);

    return (
        <>
            <div className="ant-row">
                <div className="ant-col-12">
                    <TextInput
                        id="first-name"
                        label="First Name"
                        labelclassName=""
                        name="firstName"
                        value=""
                        onChange={(e) => console.log(e.target.value)}
                        isRequired={false}
                    />
                </div>
            </div>
            <div className="ant-row">
                <div className="ant-col-24">
                    <TextInput
                        id="email"
                        label="Email"
                        labelclassName=""
                        name="email"
                        value=""
                        onChange={(e) => console.log(e.target.value)}
                        isRequired={true}
                        errorMsg="Please enter valid email"
                        labelWrapperClass="ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-5"
                        fieldContainerClass="ant-col ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12"
                    />
                </div>  

            </div>
            <div className="ant-row">
                <div className="ant-col-6">
                    <Loader loading={true} />
                </div>
                <div className="ant-col-6">
                    <DateTimePicker id="date-picker"
                        label="Date Picker" error={selectDate ? 'Please select a date' : ''} onChange={(date) => console.log("Interview schedule on ", date)} />
                </div>
            </div>
            <div className="ant-row">
                <div className="ant-col-6">
                    <FileSelector
                        id="file-selector"
                        label="Select : "
                        labelclassName=""
                        name="fileSelector"
                        value=""
                        onChange={(e) => console.log("On Change --->", e.target.files[0])}
                        isRequired={true}
                        errorMsg="Please select a file"
                        acceptFilesOfType="*.*"
                    />
                </div>
            </div>

            <div className="ant-row">
                <div className="ant-col-6">
                    <InputSpinner
                        id="spinner1"
                        name="inputSpinner"
                        min={0}
                        max={20}
                        isRequired={true}
                        label="Left Input Spinner"
                        errorMsg="Please select valid experience years"
                        onChange={(e) => console.log("On Change --->", e)}
                    />
                </div>
                <div className="ant-col-6">
                    <InputSpinner
                        id="spinner2"
                        name="input1Spinner"
                        min={0}
                        max={15}
                        isRequired={true}
                        label="Right Input Spinner"
                        errorMsg="Please select valid experience years"
                        onChange={(e) => console.log("On Change --->", e)}
                    />
                </div>
            </div>
            <div className="tab-container">
                <HorizontalTabs tabList={TabList} />
            </div>

          <div className="ant-row">
        <div className="ant-col-24">
          <TextArea
            id="jobDescription"
            label="Job Description"
            labelclassName=""
            name="jobDescription"
            value=""
            onChange={(e) => console.log("On Change --->", e)}
            isRequired={true}
            errorMsg="Please enter valid job desciption"
            labelWrapperClass="ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-5"
            fieldContainerClass="ant-col ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12"
            cols="70"
            rows="10"
            maxlength="200"
            minlength="20"
          />
        </div>
        </div>
        </>
    );
}

export default App;
