import React, { useState, useEffect } from 'react';
import { Table, Divider, Tag } from 'antd';
import HorizontalTabs from '../../components/shared/HorizontalTabs';
import AddPosition from './AddPosition';
import { Button } from 'antd';

function PositionApp() {
  const [TabList, setTabList] = useState([]);
  const [showAddPosition, setShowAddPosition] = useState(false);

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
      dataIndex: 'reqExp',
      key: 'reqExp',
    },
    {
      title: 'No. of Position',
      dataIndex: 'noOfPosition',
      key: 'noOfPosition',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.title}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      title: 'Java Developer',
      reqExp: '5-10',
      noOfPosition: 10,
      location: 'Niyuj HQ',
      tags: ['urgent'],
    },
    {
      key: '2',
      title: 'Web Developer',
      reqExp: '6-10',
      noOfPosition: 2,
      location: 'Niyuj Sat',
      tags: ['full stack'],
    },
    {
      key: '3',
      title: 'C++ Developer',
      reqExp: '7-10',
      noOfPosition: 7,
      location: 'Niyuj HQ',
      tags: [],
    },
  ];
  useEffect(() => {
    let tab_list = [];
    tab_list.push({ "title": "Open Positions", "URL": <Table columns={columns} dataSource={data} /> });
    setTabList(tab_list)
  }, []);

  return (
    
<div>
    <Button type="primary" onClick={() => setShowAddPosition(true)}>
    Add Position
    </Button>
    <hr></hr>
    <HorizontalTabs tabList={TabList} />
    {showAddPosition? <AddPosition onCloseModal={closeModal} />: null}
    </div>
  );
}

export default PositionApp;
