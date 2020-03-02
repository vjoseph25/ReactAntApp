import React from 'react';
import { Layout, Menu, Icon, Radio } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import Logger from './components/Logger';
import History from './components/History';
import About from './components/About';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

const {Header, Footer, Content} = Layout;
class App extends React.Component {
  state = {
    current: 'logger',
    value1: 'Running',
    series: [
      {
        Activity: "Running",
        data: [
          {Minutes: 30, Date:'03/31/2020' },
          {Minutes: 0, Date:'04/01/2020' },
          {Minutes: 15, Date:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        Activity: "Biking",
        data: [
          {Minutes: 45, Date:'03/31/2020' },
          {Minutes: 15, Date:'04/01/2020' },
          {Minutes: 60, Date:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        Activity: "Weightlifting",
        data: [
          {Minutes: 20, Date:'03/31/2020' },
          {Minutes: 0, Date:'04/01/2020' },
          {Minutes: 75, Date:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ]
  };


  handleMenu = e => {
    this.setState({
      current: e.key,
    });
  };

  addData = entry => {
    let running = this.state.series[0].data;
    let biking = this.state.series[1].data;
    let weightlifting = this.state.series[2].data;
    
    switch(entry.Activity) {
      case 'Running': running = running.concat([{Minutes: entry.Minutes, Date: entry.Date}]); running.sort((a,b) => { 
        let aDate = new Date(a.Date); 
        let bDate = new Date(b.Date);
        return aDate - bDate;
      }); break;
      case 'Biking': biking = biking.concat([{Minutes: entry.Minutes, Date: entry.Date}]); biking.sort((a,b) => { 
        let aDate = new Date(a.Date); 
        let bDate = new Date(b.Date);
        return aDate - bDate;
      });break;
      case 'Weightlifting': weightlifting = weightlifting.concat([{Minutes: entry.Minutes, Date: entry.Date}]); weightlifting.sort((a,b) => { 
        let aDate = new Date(a.Date); 
        let bDate = new Date(b.Date);
        return aDate - bDate;
      }); break;
    }
    this.setState({
      series: [
        {
          Activity: 'Running',
          data: running,
          color: '#13c2c2'
        },
        {
          Activity: 'Biking',
          data: biking,
          color: "#ff7a45"
        },
        {
          Activity: 'Weightlifting',
          data: weightlifting,
          color: '#9254de'
        }
      ]
    }, () => console.log(this.state.series));
  }


  render() {
    return (
      <Layout style={{ height: "100vh", backgroundColor: "#f0f5ff" }}>
        <Header>
          <div className="headerTitle">Fitness Tracker</div>
          <Menu theme="dark" onClick={this.handleMenu} selectedKeys={[this.state.current]} mode="horizontal"
            style={{ lineHeight: "64px"}}>
            <Menu.Item className="selectedClass" key="logger">
              <Icon type="read" />
              Logger
              <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item className="selectedClass" key="history">
            <Icon type="history" />
            History
            <Link to="/history"></Link>
            </Menu.Item>
            <Menu.Item className="selectedClass" key="about">
            <Icon type="info-circle" />
            About
            <Link to="/about"></Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Content style={{ backgroundColor: "#f0f5ff" }}>
            <Switch>
                <Route path="/" exact render={(props) => <Logger {...props} handleSubmit={this.addData}/>} />
                <Route path="/history" render={(props) => <History {...props} data={this.state.series}/>} />
                <Route path="/about" component={About} />
            </Switch>
            
          </Content>
        </Layout>
        <Footer style={{ backgroundColor: "black" }}>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

