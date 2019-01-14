import React from 'react';
import { List, Card } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

class ApiPage extends React.Component {
    render() {
        const data = [
            {
                title: '动态生成key',
                content: `/**node示例**/\nconst http = require('http');\nhttp.get("http://www.jcbsb.com:8002/personal-0.1/createkey", (res) => {\n\0\0\0\0let data = '';\n\0\0\0\0res.on('data', (chunk) => {\n\0\0\0\0\0\0\0\0data += chunk;\n\0\0\0\0});\n\0\0\0\0res.on('end', (err) => {\n\0\0\0\0\0\0\0\0console.log(data);\n\0\0\0\0});\n});\n`,
                key: 1,
            },
            {
                title: '使用sql将文件过滤',
                content: `/**node示例**/\nconst http = require('http');\nlet data = require('querystring').stringify({\n\0\0\0\0"sql":"select * from qs",\n\0\0\0\0"key":"1546925380105-662838",\n\0\0\0\0"files":JSON.stringify(["a.json","b.json"]),\n});\nlet opt = {\n\0\0\0\0method:'POST',\n\0\0\0\0host:'www.jcbsb.com',\n\0\0\0\0port:'8002',\n\0\0\0\0path:'/personal-0.1/parsing',\n\0\0\0\0headers:{\n\t"Content-Type":"application/x-www-form-urlencoded",\n\t"Content-Length":data.length,\n\0\0\0\0},\n};\n`
                    + `const post = http.request(opt,(res) => {\n\0\0\0\0if(res.statusCode === 200){\n\tlet chuck="";\n\tres.on('data',(data)=>{\n\t\0\0\0\0chuck+=data;\n\t});\n\tres.on('end',()=>{\n\t\0\0\0\0console.log(chuck)\n\t});\n\0\0\0\0}\n});\npost.write(data);\npost.end();\n`,
                key: 2,
            },
            {
                title: '上传文件',
                content: `/**node示例**/\nlet FormData = require('form-data');\nlet fs = require('fs');\nlet http = require('http');\nlet form = new FormData();\nform.append('data','1547176310885-816408');\nform.append('file',fs.createReadStream(__dirname + '/a.json'));\nlet opt = {\n\0\0\0\0method:'POST',\n\0\0\0\0host:'www.jcbsb.com',\n\0\0\0\0port:'8002',\n\0\0\0\0path:'/personal-0.1/fileupload',\n\0\0\0\0headers:form.getHeaders()\n};\nlet request = http.request(opt);\nform.pipe(request);\nrequest.on('response',function(res){\n\0\0\0\0if(res.statusCode===200){\n\tlet chuck="";\n\tres.on('data',(data)=>{\n\t\0\0\0\0chuck += data;\n\t});\n\tres.on('end',()=>{\n\t\0\0\0\0console.log(chuck)\n\t});\n\0\0\0\0}\n});`,
                key: 3,
            },
        ];
        return (
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title}><SyntaxHighlighter language='javascript' style={docco}>
                            {item.content}
                        </SyntaxHighlighter></Card>
                    </List.Item>
                )}
            />
        )
    }
}

export default ApiPage;