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

    let defaultAssociatePosition = {
        candidate_id: props.id,
        position_id:'',
        project_id:''
    }
    const [candidateAssociatedPositions,setCandidateAssociatedPositions]=useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const [openPositions, setOpenPositions] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [associatePosition, setAssociatePosition] = useState(defaultAssociatePosition);
    const [associatePositionError, setAssociatePositionError] = useState({});
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

    const showUserModal = (showmodel) => {
        if (showmodel) {
            setVisible(true);
        }
    };

    const onCancel = () => {
        setAssociatePosition(defaultAssociatePosition);
        setAssociatePositionError({});
        setVisible(false);
    };

    const onSaveAssociate = async(e) => {
        e.preventDefault();
        let associatePositions = { ...associatePosition };
        let _associatePositionError = { ...associatePositionError };
        let errorCount = 0;
        Object.keys(associatePositions).map(function (key) {
            _associatePositionError = validate(_associatePositionError, key, associatePositions[key]);

            if (_associatePositionError[key]) {                
                errorCount++;
            }
        })
        setAssociatePositionError(_associatePositionError);        
        setAssociatePosition(associatePositions);
        if (!errorCount) {
         let responce =   CandidateApi.saveAssociateCandidate(associatePosition);
         if(responce.id){
            //candidateAssociatedPositionDetails();
         }
            setVisible(false);
        }

    };

    const handleOnChange = (key, value) => {
        let associatedPosition = { ...associatePosition, [key]: value };
        setAssociatePosition(associatedPosition);
        let _associatePositionError = { ...associatePositionError, [key]: "" };
        setAssociatePositionError(_associatePositionError); 
    }
    const errorMessages = resources.errorMessages();
    const validate = (associatePositionError, elementName, elementValue) => {
        let error = null;
        switch (elementName) {
            case "project_id":
                error = validateSelectedValue(elementValue);
                break;
            case "position_id":
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
            <Modal centered title="Associate Position" okText="Associate" width="500px" visible={visible} onOk={onSaveAssociate} onCancel={e =>onCancel(e)}>
                <div className="ant-row">
                    <div className="ant-col-24">
                        <DropdownElement id="projects"
                            name="projects"
                            placeHolder="Select Project"
                            onChange={(e) => handleOnChange('project_id', e)}
                            value={associatePosition.project_id ?associatePosition.project_id :''}
                            error={associatePositionError.project_id? associatePositionError.project_id + ' project' : ""} label="Project" array={projectNames} 
                            fieldClass= "ant-col-24"/>
                    </div>
                </div>
                <div className="ant-row">
                    <div className="ant-col-24">
                        <DropdownElement id="positions" name="positions"
                            placeHolder="Select position"
                            onChange={(e) => handleOnChange('position_id', e)}
                            value={associatePosition.position_id ?associatePosition.position_id :''}
                            error={associatePositionError.position_id ? associatePositionError.position_id + ' position' : ""} label='Positions' array={openPositions} fieldClass="ant-col-24"/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AssociatedPosition;