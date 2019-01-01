import styles from './index.css';
import * as React from 'react';
import { Upload, Icon, Input, Mention, Row, Col, Button, Tooltip } from 'antd';
import axios from 'axios';
const { Search } = Input;
const Dragger = Upload.Dragger;

const url = 'http://localhost:8080';


class IndexPage extends React.Component {

  state = {
    jsons: [],
    key: null,
  }

  componentWillMount = () => {
    axios.get(`${url}/createkey`, {})
      .then((data) => {
        this.setState({
          key: data.data
        })
      }).catch((error) => {
        console.log(error);
      })
  }



  onChange = (e) => {

  }

  onSearch = (e) => {
    const fileNames = this.state.jsons.map((ele) => {
      return ele.name;
    });
    axios.post(`${url}/parsing`, {
      sql: e,
      lastName: 'Flintstone',
      key: this.state.key
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  onFileChange = (info) => {
    const status = info.file.status;
    if (status === 'done' && info.file.response.status == 1) {
      this.setState({
        jsons: info.fileList
      })
    }

  }
  /**
   * 在单击时将key复制到粘贴板中
   */
  rememberKey = () => {

  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      accept: '.json',
      action: `${url}/fileupload`,
      onChange: this.onFileChange,
      data: { data: this.state.key }
    }

    return (
      <div>
        <Row>
          <Col span={18} push={6}>
            <div style={{ width: '80%', margin: '0 auto' }}>
              <Search
                placeholder="Please enter the Sql"
                enterButton="Query"
                size="large"
                defaultValue="select * from qs;"
                onSearch={this.onSearch}
              />
              <p style={{ marginTop: '5px' }}></p>

              <Mention
                style={{ width: '100%', height: 300 }}
                onChange={this.onChange}
                suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
                multiLines
              />

            </div>
          </Col>
          {this.state.key && <Col span={6} pull={18}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
            <p style={{ marginTop: '5px' }}></p>
            <Tooltip title="Please remember it, This is the Key that needs to be used in the query.">
              <Button onClick={this.rememberKey}>{this.state.key}</Button>
            </Tooltip>
          </Col>}
        </Row>
      </div >
    );
  }
}


export default IndexPage;
