import React, { useState, useEffect } from 'react';
import DataTable from '../../components/shared/dataTable';
import { Modal } from 'antd';
import DropdownElement from '../../components/shared/DropdownElement';
import * as resources from '../../components/common/resources';
import * as SharedApi from '../../api/sharedApi';
import * as CandidateApi from '../../api/candidateApi';
import Loader from '../../components/shared/loader';

function AssociatedPosition(props) {
    const columns = [
       
        {
            title: 'Position',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'No. ofcopenings',
            dataIndex: 'no_of_openings',
            key: 'no_of_openings',
        },
        {
            title: 'Skills',
            dataIndex: 'skills',
            key: 'skills',
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }

    ];

    const [candidateAssociatedPositions,setCandidateAssociatedPositions]=useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const [openPositions, setOpenPositions] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [associatePosition, setAssociatePosition] = useState(defaultAssociatePosition);
    const [associatePositionError, setAssociatePositionError] = useState(defaultAssociatePosition);
    const [visible, setVisible] = useState(false);
    useEffect(() => {

        async function candidateAssociatedPositionDetails() {
            
            const candidateAssociatePostion = await CandidateApi.getCandidate(props.id+'/positions');
            if(Object.keys(candidateAssociatePostion).length !==0){
                setCandidateAssociatedPositions(candidateAssociatePostion);
            }
            setisLoading(false);
           
        }
        async function fetchProjectsDetails() {
            const projectList = await SharedApi.getDetails('projects');
            if (Object.entries(projectList).length !== 0) {
                const listOfProject = [];
                projectList.map((list) => {
                    let obj = { "Val": list.id, "Label": list.name, 'key': list.id }
                     listOfProject.push(obj);
                });

                setProjectNames(listOfProject);
            }
        }
        async function fetchPositionsDetails() {
            const positionList = await SharedApi.getDetails('positions');
            if (Object.entries(positionList).length !== 0) {
                const listOfPosition = [];
                positionList.map((list) => {
                    let obj = { "Val": list.id, "Label": list.title, 'key': list.id }
                     listOfPosition.push(obj);
                });

                setOpenPositions(listOfPosition);
            }
        }
        candidateAssociatedPositionDetails();
        fetchPositionsDetails();
        fetchProjectsDetails();
    }, [])

    let defaultAssociatePosition = {
        candidate_id: props.id,
        position_id:'',
        project_id:''
    }
 

    const showUserModal = (showmodel) => {
        if (showmodel) {
            setVisible(true);
        }
    };

    const onCancel = () => {
        setVisible(false);
        setAssociatePosition(defaultAssociatePosition);
    };

    const onSaveAssociate = (e) => {
        e.preventDefault();
        let associatePositions = { ...associatePosition };
        let errorCount = 0;
        Object.keys(associatePositions).map(function (key) {
          let  _associatePositionError = validate({...associatePositionError}, key, associatePositions[key]);

            if (_associatePositionError[key]) {
                setAssociatePositionError(_associatePositionError);
                errorCount++;
            }
        })
        
        setAssociatePosition(associatePositions);
        if (!errorCount) {
            CandidateApi.saveAssociateCandidate(associatePosition)
            setVisible(false);
        }

    };

    const handleOnChange = (key, value) => {
        let associatedPosition = { ...associatePosition, [key]: value };
        setAssociatePosition(associatedPosition);
        let _associatePositionError = { ...associatePositionError, [key]: "" };
        _associatePositionError = validate(_associatePositionError, [key], value);
        setAssociatePositionError(_associatePositionError);
    }
    const errorMessages = resources.errorMessages();
    const validate = (associatePositionError, elementName, elementValue) => {
        let error = null;
        switch (elementName) {
            case "projects":
                error = validateSelectedValue(elementValue);
                break;
            case "positions":
                error = validateSelectedValue(elementValue);
                break;
        }
        if (error) {
            associatePositionError[elementName] = error;
        }
        return associatePositionError;
    }

    const validateSelectedValue = (selectedOption) => {
        if (!selectedOption || selectedOption === "") {
            return errorMessages.invalidFieldselection;
        }
    }
    return (

        <div>
             {isLoading ? <Loader loading={isLoading}/> : <DataTable columns={columns} dataSource={candidateAssociatedPositions} modelButtonLabel="Associate Position" showModal={showUserModal} />}
            <Modal centered title="Associate Position" okText="Associate" width="500px" visible={visible} onOk={onSaveAssociate} onCancel={onCancel}>
                <div className="ant-row">
                    <div className="ant-col-24">
                        <DropdownElement id="projects"
                            name="projects"
                            placeHolder="Select Project"
                            isRequired={true}
                            onChange={(e) => handleOnChange('project_id', e)}
                            value={associatePosition.project_id ?associatePosition.project_id :''}
                            error={associatePositionError.project_id? associatePositionError.project_id + ' project' : ""} label="Project :" array={projectNames} 
                            fieldClass= "ant-col-24"/>
                    </div>
                </div>
                <div className="ant-row">
                    <div className="ant-col-24">
                        <DropdownElement id="positions" name="positions"
                            placeHolder="Select position"
                            isRequired={true}
                            onChange={(e) => handleOnChange('position_id', e)}
                            value={associatePosition.position_id ?associatePosition.position_id :''}
                            error={associatePositionError.position_id ? associatePositionError.position_id + ' position' : ""} label='Positions :' array={openPositions} fieldClass="ant-col-24"/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AssociatedPosition;