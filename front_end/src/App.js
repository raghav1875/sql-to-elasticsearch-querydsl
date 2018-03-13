import React, { Component } from "react";
import { Layout, Menu, Collapse } from 'antd';
import 'antd/dist/antd.css';
import Spinner from './components/Spinner';
import axios from 'axios';
import './assets/css/SearchBar.css';

const { Content, Sider } = Layout;

const commands = [
  {
    display: "SQL Select *",
    command: "select * from table"
  },
  {
    display: "SQL Where",
    command: "select * from table where value='react'"
  }
];


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      apiData: {},
      sql: "",
      message: "Please select a command from Sidebar"
    }
  }


  hitQuery = (query) => {

    this.setState({
      message: "Loading..."
    });

    var delayInMilliseconds = Math.random(); //1 second

    setTimeout(() => {

      console.log(query);
      axios.post('http://localhost:3001/', {
        sql: query
      })
      .then((apiData)=>{
        console.log(apiData.data);

        if(apiData.data.success){
          this.setState({
            apiData: apiData.data,
            sql: query,
            message: "Fetching successful"
          });
        }else{
          this.setState({
            apiData: {},
            sql: query,
            message: "API unavailable. Please come back later"
          });
        }



      }).catch((error)=>{
        console.log(error);
        this.setState({
          apiData: {},
          message: "Error from server"
        });
      });

    }, delayInMilliseconds);

  }


  render() {

    const { apiData, message, sql } = this.state;

    return (

      <Layout>

        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} width={300} >
          <Menu theme="dark" mode="inline" >
            <Menu.Item className="it" disabled>
              <span className="nav-text">SQL QUERIES</span>
            </Menu.Item>
            {
              commands.map((item, index)=>{
                return(
                  <Menu.Item className="men" key={index}  >
                    <span onClick={()=>{this.hitQuery(item.command)}} className="nav-text">{item.display}</span>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>

         <Layout style={{ marginLeft: 300 }}>



           <Content style={{ overflow: 'initial' }}>
             <div style={{ padding: 110, background: '#fff', textAlign: 'center' }}>

                {apiData.success ? (
                  <div>
                  <h1> SQL Query </h1>
                  <pre>
                    {sql}
                  </pre>
                  <br />
                  <br />
                  <h1> Elasticsearch Query DSL</h1>
                  <pre>
                    {apiData.verb.toString()}
                    <br />
                    {JSON.stringify(apiData.queryDSL, undefined, 2)}
                  </pre>

                  </div>
                ):(<Spinner text={message} />)}

             </div>
           </Content>

         </Layout>
      </Layout>

    );
  }
}

export default App;
