import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import Logger from './components/Logger';
import History from './components/History';
import About from './components/About';
import Locations from './components/Locations';
import './App.css';
import 'antd/dist/antd.css';

const {Header, Footer, Content} = Layout;
class App extends React.Component {
  state = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
    }

  };


  handleMenu = e => {
    this.setState({
      current: e.key,
    });
  };

  addData = entry => {
    this.setState(prevState => {
      const series = prevState.series.map(s => {
        if (entry.Location === s.id) {
            let found = false;
            let updatedData = s.data.map(d => {
              if (d.x === entry.Date) {
                found = true;
                return { y: entry.Orders + d.y, x: d.x };
              } else {
                return { y: d.y, x: d.x };
              }
            });
            if (!found) {
              let i = updatedData.length;
              let len = updatedData.length;
              let entryDate = new Date(entry.Date);
              for (i = len - 1; i >= 0; i --) {
                let arrDate = new Date(updatedData[i].x);
                if (entryDate > arrDate) {
                  break;
                }
              }
              updatedData.splice(i+1, 0, { x: entry.Date, y: entry.Orders });
            }

            return {
              id: s.id,
              color: s.color,
              data: updatedData
            }
        } else {
          return s;
        } 
      });
      let dates = {...prevState.dates}
      dates[entry.Date] = true;
      return { series, dates };
    });
  }


  render() {
    return (
      <Layout style={{ height: "100vh", backgroundColor: "#f0f5ff" }}>
        <Header>
          <div className="headerTitle">Delivery Tracker</div>
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
            <Menu.Item className="selectedClass" key="locations">
            <Icon type="dollar" />
            Orders
            <Link to="/locations"></Link>
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
                <Route path="/history" render={(props) => <History {...props} data={this.state.series} dates={this.state.dates}/>} />
                <Route path="/locations" render={(props) => <Locations {...props} data={this.state.series} dates={this.state.dates}/>} />
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

