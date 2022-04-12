import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {Button, Form, Input, message, Modal} from 'antd';
import {InfoCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import {HOST, PORT} from "../config/apiconfig";
import {BrowserRouter} from "react-router-dom";

export const Company = async () => {
    // state = {
    //     editorState: BraftEditor.createEditorState('<p>初始值</p >'), // 设置编辑器初始内容
    //     outputHTML: '<p></p >' // 编辑器输出内容
    // }
    //
    // componentDidMount () {
    //     this.setState({
    //         editorState: BraftEditor.createEditorState('<p>hello，<b>world!</b><p>')
    //     })
    // }

    const handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        }, () => {
            console.log(editorState)
            console.log(this.state.outputHTML)
        })
    }


    const {confirm} = Modal;


    const addCompany = (value) => {
        axios.post(`${HOST}:${PORT}/company/add`, {user: value})
            .then(result => {
                if (result.data.status === 201) {
                    message.success(result.data.msg);
                    // setAddCompanies(false);
                    // setState(!state);
                } else {
                    message.error("添加失败");
                }
            }).catch(err => {
            console.log(err);
        })
    }

    const showAddConfirm = async () => { // 添加订单信息询问框
        confirm({
            title: "添加公司信息",
            icon: <InfoCircleOutlined/>,
            onOk() {
                addCompany();
            },
            okText: "添加",
            cancelText: "取消",
            centered: true
        })
    }

    //富文本编辑器
    const extendControls = [
        {
            key: "font-family",
        },
    ];
    const fontFamily = [
        {
            name: "宋体",
            family: '"宋体",sans-serif',
        },
        {
            name: "Arial",
            family: "Arial, Helvetica, sans-serif",
        },
        {
            name: "Georgia",
            family: "Georgia, serif",
        },
        {
            name: "Impact",
            family: "Impact, serif",
        },
        {
            name: "Monospace",
            family: '"Courier New", Courier, monospace',
        },
        {
            name: "Tacoma",
            family: 'tam, arial, "Hiragana Sans GB", 宋体, sans-serif',
        },
        {
            name: "黑体",
            family: '"黑体",serif',
        },
        {
            name: "楷体",
            family: "楷体",
        },
        {
            name: "幼圆",
            family: "YouYuan",
        },
    ]


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const { editorState } = this.state
    return (

        <BrowserRouter>
            <div style={{width: "900px", height: "500px", textAlign: "center"}}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={addCompany}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                    style={{marginRight: "500px", marginTop: "50px"}}

                    // ref={addRef}
                >
                    <Form.Item
                        label="企业名称"
                        name="username"
                        rules={[{required: true, message: '请输入企业名称'}]}
                    >
                        <Input style={{width: "800px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="地址"
                        name="address"
                        rules={[{required: true, message: '请输入地址'}]}
                    >
                        <Input style={{width: "800px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="电话"
                        name="phone"
                        rules={[{required: true, message: '请输入电话号码'}]}
                    >
                        <Input style={{width: "800px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="经度"
                        name="longitude"
                        rules={[{required: true, message: '请输入经度'}]}
                    >
                        <Input style={{width: "800px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="纬度"
                        name="latitude"
                        rules={[{required: true, message: '请输入纬度'}]}
                    >
                        <Input style={{width: "800px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="简介"
                        name="intro"
                        rules={[{required: true, message: '请输入简介'}]}
                    >
                        <table border={1}>
                            <BraftEditor
                                value={editorState}
                                onChange={handleChange}
                                // onSave={submitContent}
                                extendControls={extendControls}
                                fontFamilies={fontFamily}
                                style={{width: "800px"}}
                            />
                        </table>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" onClick={() => showAddConfirm()}>
                            提交
                        </Button>
                    </Form.Item>

                </Form>
                {/*<Input.Group compact style={{display: "flex",marginTop:"30px",marginLeft:"500px"}} className={"select"}>*/}
                {/*    /!*控制添加按钮显示*!/*/}
                {/*    <Button type="primary">添加</Button>*/}

                {/*</Input.Group>*/}


            </div>
        </BrowserRouter>
    );
};
