import React from 'react';
import { Steps, Table, Divider, Tag } from 'antd';
const Step = Steps.Step;
class InstructionsPage extends React.Component {
    render() {

        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
        }];

        const data = [{
            key: '1',
            name: '文件类型',
            desc: 'json'
        }, {
            key: '2',
            name: 'sql',
            desc: 'Mysql'
        }, {
            key: '3',
            name: '版本',
            desc: 'v1.0'
        }];
        return (
            <div>
                <p style={{padding: "16px 0"}}>流程说明</p>
                <Steps direction="horizontal" current={1}>
                    <Step title="上传文件" description="请上传指定格式." />
                    <Step title="输入sql语句" description="目前支持Mysql" />
                    <Step title="最终等待生成" description="服务器最多保存一周." />
                </Steps>
                <p style={{height: '1px', width: '100%', 
                    marginTop: '32px',backgroundColor: 'rgba(200, 190, 190, 0.85)'}}></p>
                <Table columns={columns} dataSource={data} pagination={false} title={() => '项目说明'} />
            </div>
        )

    }
}

export default InstructionsPage;