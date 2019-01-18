import React from 'react';
import { Modal, Collapse, List } from 'antd';
import Tool from '../until/Tool';
import _Event from '../until/Event';
const Panel = Collapse.Panel;
export default class ModalCom extends React.Component {

    constructor(props) {
        super(props);
    }

    state = { visible: false, sqldir: this.props.sqldir || [] }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    componentWillMount = () => {
        new _Event().on('hisotry', (data) => {
            this.setState({
                visible: data
            })
        });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return true;
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        this.setState({
            sqldir: nextProps.sqldir,
            staticPath: nextProps.staticPath,
            sqlPath: nextProps.sqlPath
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const arr = this.state.sqldir;
        const com = arr.map((e, i) => {
            let sqlu = this.state.sqlPath[i];
            return (
                <Panel header={e.sql} key={i}>
                    <List
                        bordered
                        dataSource={e.files}
                        renderItem={item => (<List.Item>
                            <a href={Tool.getStaticPath() + this.state.staticPath + sqlu + "/" + item} target="blank"
                                download={Tool.getStaticPath() + this.state.staticPath + sqlu + "/" + item}>{item}</a></List.Item>)}
                    />
                </Panel>
            )
        });
        return (
            <div>
                <Modal
                    title="历史数据"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Collapse>
                        {com}
                    </Collapse>
                </Modal>
            </div>
        )
    }
}
