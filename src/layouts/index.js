import styles from './index.css';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router';
const { Header, Content, Footer } = Layout;
const ROUTERPATH = ["Home", "Instructions", "About"];
function BasicLayout(props) {

  const onClick = (item) => {
    changeByKey(item.key)
  }

  let urlpath = window.location.href.split('/');
  let defaultkey = ROUTERPATH.indexOf(urlpath[urlpath.length - 1]) + 1;
  if (!defaultkey) {
    defaultkey += 1;
  }
  
  let changeByKey = (key) => {
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
    props.history.push(path);
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultkey.toString()]}
          style={{ lineHeight: '64px' }}
          onClick={onClick}
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




export default BasicLayout;
