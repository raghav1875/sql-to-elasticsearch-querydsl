import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Spinner from './components/Spinner';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const commands = [
  "select * from table"
];

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      apiData: {}
    }
  }


  hitQuery = (query) => {

    console.log(query);
    axios.post('http://localhost:3001/', {
      sql: query
    })
    .then((apiData)=>{
      console.log(apiData.data);
      this.setState({apiData: apiData.data});
    }).catch((error)=>{
      console.log(error);
    });
  }


  render() {

    const { apiData } = this.state;

    return (

      <Layout>

        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" >
            {
              commands.map((command, index)=>{
                return(
                  <Menu.Item key={index}  >
                    <span onClick={()=>{this.hitQuery(command)}} className="nav-text">{command}</span>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>

         <Layout style={{ marginLeft: 200 }}>

           <Header style={{ background: '#fff', padding: 0 }}>
            Choose SQL Query from Left and find Query DSL in right.
           </Header>

           <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
             <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>

                {apiData.success ? (
                  <div>
                    <h1>{apiData.verb.toString()}</h1>
                    <p>{JSON.stringify(apiData.queryDSL, null, 4)}</p>
                  </div>
                ):(<Spinner />)}

             </div>
           </Content>

           <Footer style={{ textAlign: 'center' }}>
             ©2018 Created at CIC
           </Footer>

         </Layout>
      </Layout>

    );
  }
}

export default App;
