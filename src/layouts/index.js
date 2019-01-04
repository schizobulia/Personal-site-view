import styles from './index.css';
import { Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;
const ROUTERPATH = ["Home", "Instructions", "About"];
// function BasicLayout(props) {
// }
class BasicLayout extends React.Component {

  state = {
    key: "1",
  }

  constructor(props) {
    super(props);
  }
  onClick = (item) => {
    this.changeByKey(item.key)
  }

  changeByKey = (key) => {
    let path = "/";
    switch (key) {
      case "1":
        path = "/"
        break;
      case "2":
        path = "/Instructions";
        break;
      case "3":
        path = "/About";
        break;

      default:
        break;
    }
    this.props.history.push(path);
  }

  componentWillMount = () => {
    let urlpath = window.location.href.split('/');
    let defaultkey = ROUTERPATH.indexOf(urlpath[urlpath.length - 1]) + 1;
    if (!defaultkey) {
      defaultkey += 1;
    }
    this.setState({
      key: defaultkey.toString()
    })

    this.props.history.listen((e) => {
      let key = ROUTERPATH.indexOf(e.pathname.slice(1, e.pathname.length)) + 1;
      this.setState({
        key: new Number(key || 1).toString()
      })
    })
  }


  render() {
    const props = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.key]}
            selectedKeys={[this.state.key]}
            style={{ lineHeight: '64px' }}
            onClick={this.onClick}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Document</Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ margin: '16px 0' }}>
          </div>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Personal-site
        </Footer>
      </Layout>
    );
  }
}



export default BasicLayout;
