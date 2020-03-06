import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import modules from './modules';
import './index.css';
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    currentTab: ''
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Router>
        <Layout  >
          <Sider width={'224px'} trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentTab]}>
              {modules.map(module => ( // with a name, and routes
                <Menu.Item key={module.name}>
                  <Link to={module.routeProps.path} onClick={() => (this.state.currentTab = module.name)}>
                    <Icon type="user" />
                    <span className="nav-text">
                      {module.name}
                    </span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
                {modules.map(module => (
                  <Route {...module.routeProps} key={module.name} />
                ))}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Resource Recruitment Planning ©{new Date().getFullYear()} Created by Niyuj Enterprises</Footer>
          </Layout>
        </Layout>
      </Router>
    )
  };
}

export default App;
