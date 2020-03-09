import React, { useState,useEffect} from 'react';
import DataTable from '../../components/shared/dataTable';
import { Modal} from 'antd';
import DropdownElement from '../../components/shared/DropdownElement';
import * as resources from '../../components/common/resources';
import * as CandidateApi from '../../api/candidateApi';
function AssociatedPosition(props) {
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            render: text => <a>{text}</a>,
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
            const projectList = await CandidateApi.getDetails('/projects');
            if(Object.entries(projectList).length !==0){
                console.log('projectList ',projectList)
                const listOfProject =[];
              projectList.map((list)=>{
                 let obj ={ "Val": list.id, "Label":list.name, 'key':list.id}
                 listOfProject.push(obj);
                });

                setProjectNames(listOfProject);
            }
        }
        async function fetchPositionsDetails() {
            const positionList = await CandidateApi.getDetails('/positions');
            if(Object.entries(positionList).length !==0){
                console.log('positionList ',positionList)
                const listOfPosition =[];
                positionList.map((list)=>{
                 let obj ={ "Val": list.id, "Label":list.title, 'key':list.id}
                 listOfPosition.push(obj);
                });

                setOpenPositions(listOfPosition);
            }
        }
        fetchProjectsDetails();
        fetchPositionsDetails();
    }, [])

    let defaultAssociatePosition = {
        projects: { value: "", errorMessage: "" },
        positions: { value: "", errorMessage: "" }
    }
    const [associatePosition, setAssociatePosition] = useState(defaultAssociatePosition);
    const [visible, setVisible] = useState(false);

    const showUserModal = (showmodel) => {
        if (showmodel) {
            setVisible(true);
        }
    };

    const onCancel = () => {
        setVisible(false);
        console.log('associatePosition', associatePosition ,defaultAssociatePosition)
        setAssociatePosition(defaultAssociatePosition);
       // form.resetFields()
    };

    const onSaveAssociate = (e) => {
        e.preventDefault();
        let associatePositions = { ...associatePosition };
        let errorCount = 0;
        console.log('setAssociatePosition ',associatePositions)
        Object.keys(associatePositions).map(function (key) {
             associatePositions = validate(associatePositions, key, associatePositions[key].value.trim());
            if (associatePositions[key].errorMessage) {
                errorCount++;
            }
        })
        setAssociatePosition(associatePositions);
        if (!errorCount){
            setVisible(false);
        }
           
    };

    const handleOnChange = (key, value) => {
        let associatedPosition = { ...associatePosition, [key]: { "value": value, "errorMessage": "" } };
        setAssociatePosition(associatedPosition);
    }
    const errorMessages = resources.errorMessages();
    const validate = (associatePosition , elementName, elementValue)=>{
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
            associatePosition[elementName].errorMessage = error;
        }
        return associatePosition;
    } 

   const validateSelectedValue =(selectedOption) =>{
        if (!selectedOption || selectedOption === "") {
            return errorMessages.invalidFieldselection;
        }
    }
    return (

        <div>
            <DataTable columns={columns} dataSource={data} modelButtonLabel="Associate Position" showModal={showUserModal} />
            <Modal centered title="Associate Position" okText="Associate" width="500px" visible={visible} onOk={onSaveAssociate} onCancel={onCancel}>
                <div className="ant-row">
                    <div className="ant-col-12">
                        <DropdownElement id="projects"
                            name="projects"
                            placeHolder="Select Project"
                            onChange={(e) => handleOnChange('projects', e)}
                            error={associatePosition.projects.errorMessage ? associatePosition.projects.errorMessage +' project' : ""} label="Project" array={projectNames} />
                    </div>
                </div>
                <div className="ant-row">
                    <div className="ant-col-12">
                        <DropdownElement id="positions" name="positions"
                            placeHolder="Select position"
                            onChange={(e) => handleOnChange('positions', e)}
                            error={associatePosition.positions.errorMessage ? associatePosition.positions.errorMessage+' position' : ""} label='Positions' array={openPositions} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AssociatedPosition;