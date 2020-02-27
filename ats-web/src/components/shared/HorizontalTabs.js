import React from "react";
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function HorizontalTabs(props) {
  return (
    <div className="card-container">
      <Tabs type="card">
        {props.tabList.map((tabItem, index) =>
          <TabPane key={index} tab={tabItem.title}>
            {tabItem.URL}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default HorizontalTabs;