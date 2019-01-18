import styles from './index.css';
import { Layout, Menu, Input, message, Modal } from 'antd';
import React from 'react';
import Tools from '../until/Tool';
import ModalCom from '../component/ModalCom';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const Search = Input.Search;
const ROUTERPATH = ["Home", "Instructions", "About", "Apipage"];
class BasicLayout extends React.Component {

  state = {
    key: "1",
    visible: false,
    sqldir: [],
    staticPath: "",
    sqlPath: []
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
      case "4":
        path = "/Apipage";
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
  /**
   * 历史查询
   */
  historySearch = (value) => {
    if (!value) { message.warning('输入不能为空'); return };
    Tools.httpGet(`historysql?key=${value}`, ((data) => {
      if (!data) { message.warning('无数据'); return };
      this.setState({
        visible: true,
        sqldir: data.sqls,
        staticPath: data.static,
        sqlPath: data.sqlpath
      })
    }))
  }

  render() {
    const props = this.props;
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Search
            style={{ position: 'absolute', width: '250px', right: '100px', top: '16px' }}
            placeholder="query by key"
            onSearch={this.historySearch}
            enterButton
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.key]}
            selectedKeys={[this.state.key]}
            style={{ lineHeight: '64px' }}
            onClick={this.onClick}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <SubMenu title="Document">
              <Menu.Item key="2">Basis</Menu.Item>
              <Menu.Item key="4">Api</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">About</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ margin: '16px 0' }}>
          </div>
          <div style={{ background: '#fff', padding: 24, height: 'auto' }}>
            {props.children}
          </div>
          <ModalCom visible={this.state.visible} sqldir={this.state.sqldir} staticPath={this.state.staticPath}
            sqlPath={this.state.sqlPath}
          />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Personal-site
        </Footer>
      </Layout>
    );
  }
}



export default BasicLayout;
