import React, { useState, useEffect } from 'react';
import { Divider, Tag } from 'antd';
import AddPosition from './AddPosition';
import { Button } from 'antd';
import DataTable from '../../components/shared/dataTable';
import * as positionApi from '../../api/positionApi';

  const deletePosition = (del) => {
    //TO DO: Call API to delete position
    console.log(del.key);
  }

function PositionApp() {
  const [positions, setPositions] = useState([]);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const closeModal = () => {
    setShowAddPosition(false);
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Edit</a>
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
    fetchPositions();
  }, []);

  return (

    <div>
      <Button type="primary" onClick={() => setShowAddPosition(true)}>
        Add Position
      </Button>
      <hr></hr>
      {!isLoading && <DataTable columns={columns} dataSource={positions}  />}
      {showAddPosition ? <AddPosition onCloseModal={closeModal} /> : null}
    </div>
  );
}

export default PositionApp;