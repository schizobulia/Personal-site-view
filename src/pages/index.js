import styles from './index.css';
import * as React from 'react';
import { Upload, Icon, Input, Row, Col, Button, Tooltip, message, List, Spin } from 'antd';
import axios from 'axios';
import Tools from '../until/Tool';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
const { Search, TextArea } = Input;
const Dragger = Upload.Dragger;

const url = 'http://58.87.85.53:8002/personal-0.1';
// const url = 'http://localhost:8888';


class IndexPage extends React.Component {

  state = {
    jsons: [],
    key: null,
    dowfiles: [],
    spinning: false,
    msgJson: "...",
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
    if (!e || !this.state.key || fileNames.length === 0) {
      message.warning('请检查参数是否输入');
      return;
    }
    if (!this.validationFileSuffer(["a.orc", 'a.json'], ['.json', '.csv', '.parquet', '.orc'])) {
      message.warning('单次只能上传一种类型的文件,细节请查询文档!');
      return;
    }
    this.setState({
      spinning: true
    })
    let ddata = new FormData();
    ddata.append('sql', e);
    ddata.append('key', this.state.key);
    ddata.append('files', JSON.stringify(fileNames));
    axios({
      url: `${url}/parsing`,
      method: 'post',
      dataType: 'json',
      data: ddata
    }).then((req) => {
      const result = req.data;
      const n_data = [];
      result.files.map((e, i) => {
        n_data.push({
          name: e,
          file: url + result.static + e,
        });
        if (i === 0) {
          this.showMsgJson(url + result.static + e);
        }
      })
      this.setState({
        dowfiles: n_data,
        spinning: false
      })
    }).catch((error) => {
      this.setState({
        spinning: false,
      });
      message.error('异常,请检查文件格式是否正确');
    });
  }


  validationFileSuffer(names, suffers) {
    let suf = names[0].slice(names[0].lastIndexOf('.'), names[0].length);
    for (let index = 0; index < names.length; index++) {
      const element = names[index];
      const s = element.slice(element.lastIndexOf('.'), element.length);
      if (suf !== s) {
        return false;
      }
      if (!suffers.includes(s)) {
        return false;
      };
    }
    return true;
  }

  showMsgJson = (filePath) => {
    Tools.httpGetJson(filePath, (data) => {
      let text = '';
      if (typeof data === "string") {
        text = data;
      } else {
        text = JSON.stringify(data);
      }
      if (data) {
        this.setState({
          msgJson: text
        })
      }
    })
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
  rememberKey = (event) => {
    copy(event.target.innerText);
    message.success('复制成功');
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      accept: '.json,.csv,.parquet,.orc',
      action: `${url}/fileupload`,
      onChange: this.onFileChange,
      data: { data: this.state.key }
    }

    return (
      <div>
        <Spin tip="Loading..." spinning={this.state.spinning}>
          <Row>
            <Col span={18} push={6}>
              <div style={{ width: '80%', margin: '0 auto' }}>
                <Search
                  placeholder="Please enter the Sql"
                  enterButton="Query"
                  size="large"
                  defaultValue="select * from qs"
                  onSearch={this.onSearch}
                />

                <p style={{ marginTop: '5px' }}></p>
                <div style={{ position: 'relative' }}>
                  <TextArea style={{ width: '70%', height: 200, position: 'absolute' }}
                    rows={4} value={this.state.msgJson} />
                  <List
                    header={<div>单击下载</div>}
                    bordered
                    style={{ width: '20%', position: 'absolute', left: '75%' }}
                    dataSource={this.state.dowfiles}
                    renderItem={item => (<List.Item>{<a href={item.file} target="blank" download={item.name}>{item.name}</a>}</List.Item>)}
                  />
                </div>

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
                <Button onClick={this.rememberKey} ref={(buttondom) => this.buttondom = buttondom}>{this.state.key}</Button>
              </Tooltip>
              <p></p>
              <Link to="/Instructions" style={{ float: "right" }}>文档说明</Link>
            </Col>}
          </Row>
        </Spin>
      </div >
    );
  }
}


export default IndexPage;
