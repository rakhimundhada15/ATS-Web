import React, { useState, useEffect } from 'react';
import DataTable from '../../components/shared/dataTable';
import { Modal } from 'antd';
import DropdownElement from '../../components/shared/DropdownElement';
import * as resources from '../../components/common/resources';
import * as SharedApi from '../../api/sharedApi';
import * as CandidateApi from '../../api/candidateApi';
import DefaultProps from '../../components/common/defaultProps';
function AssociatedPosition(props) {
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Last Interview Date',
            dataIndex: 'lastInterviewDate',
            key: 'lastInterviewDate',
        }

    ];

    const data = [
        {
            key: '1',
            position: 'Java Developer',
            project: 'Project 1',
            lastInterviewDate: '1-02-2020',
            status: 'cv sholisted'
        },
        {
            key: '2',
            position: 'web Developer',
            project: 'Project 2',
            lastInterviewDate: '2-02-2020',
            status: 'cv Rejected'
        },
        {
            key: '3',
            position: 'C++ Developer',
            project: 'Project 1',
            lastInterviewDate: '2-02-2020',
            status: 'offered'
        },
    ];

    const [projectNames, setProjectNames] = useState([]);
    const [openPositions, setOpenPositions] = useState([]);

    useEffect(() => {
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
        fetchPositionsDetails();
        fetchProjectsDetails();
    }, [])

    let defaultAssociatePosition = {
        candidate_id: props.id,
        position_id:'',
        project_id:''
    }
    const [associatePosition, setAssociatePosition] = useState(defaultAssociatePosition);
    const [associatePositionError, setAssociatePositionError] = useState({});
    const [visible, setVisible] = useState(false);

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
            CandidateApi.saveAssociateCandidate(associatePosition)
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
            <DataTable columns={columns} dataSource={data} modelButtonLabel="Associate Position" showModal={showUserModal} />
            <Modal centered title="Associate Position" okText="Associate" width="500px" visible={visible} onOk={onSaveAssociate} onCancel={onCancel}>
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