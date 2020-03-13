import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import Position from './Position';
import { Button } from 'antd';
import DataTable from '../../components/shared/dataTable';
import * as positionApi from '../../api/positionApi';
import * as SharedApi from '../../api/sharedApi';
import PositionModel from './PositionModel';

const deletePosition = (del) => {
  //TO DO: Call API to delete position
  console.log(del.key);
}

function PositionApp() {
  const [positions, setPositions] = useState([new PositionModel()]);
  const [position, setPosition] = useState(new PositionModel());
  const [showPosition, setShowPosition] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const closeModal = () => {
    setShowPosition(false);
  }

  const getPosition = (id, isDisabled = false) => {
    async function fetchPosition(id) {
      const _position = await positionApi.getPosition(id);
      setPosition(_position);
      setIsDisabled(isDisabled);
      setShowPosition(true);
    }
    fetchPosition(id);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record = new PositionModel()) => (
        <span>
          <a onClick={() => getPosition(record.id, true)}>{text}</a>
        </span>
      ),
    },
    {
      title: 'Required Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'No. of Positions',
      dataIndex: 'no_of_openings',
      key: 'no_of_openings',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record = new PositionModel()) => (
        <span>
          <a onClick={() => getPosition(record.id)}>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];
  useEffect(() => {
    async function fetchPositions() {
      const _positions = await positionApi.getPositions();
      setPositions(_positions);
      setisLoading(false);
    }
    async function fetchProjects() {
      const _projectsobj = await SharedApi.getDetails('projects');
           console.log(_projectsobj);
      if(Object.entries(_projectsobj).length !== 0){
        let _projects = _projectsobj.map(function (project) {
            return { Val: project.id, Label: project.name };
        });
        setProjects(_projects);
        setisLoading(false);
      }
    
     
    }
    async function fetchEmployees() {
      const _empobj = await SharedApi.getDetails('employees');
      if(Object.entries(_empobj).length !== 0){
        let _employee = _empobj.map(function (emp) {
            return { Val: emp.id, Label: emp.name };
        });
        setEmployees(_employee);
        setisLoading(false);
      }
    
     
    }
    fetchPositions();
    fetchProjects();
    fetchEmployees();
  }, []);

  return (

    <div>
      <Button type="primary" onClick={() => {
        setPosition(new PositionModel());
        setShowPosition(true);
        setIsDisabled(false);
      }}>
        Add Position
      </Button>
      <hr></hr>
      {!isLoading && <DataTable columns={columns} dataSource={positions} rowKey="id" />}
      {showPosition ? <Position onCloseModal={closeModal} {...position} disabled={isDisabled} projects={projects} employees={employees}/> : null}
    </div>
  );
}

export default PositionApp;