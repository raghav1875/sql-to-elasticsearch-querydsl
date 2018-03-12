import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';


const { Header, Content, Footer, Sider } = Layout;

const commands = [
  "select * from table"
];

class App extends Component {




  render() {
    return (

      <Layout>

        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" >
            {
              commands.map((command, index)=>{
                return(
                  <Menu.Item key={index} >
                    <span className="nav-text">{command}</span>
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
               Really
               <br />...<br />...<br />...<br />
               long content
             </div>
           </Content>

           <Footer style={{ textAlign: 'center' }}>
             Ant Design ©2016 Created by Ant UED
           </Footer>

         </Layout>
      </Layout>

    );
  }
}

export default App;
