// import React from "react";
// // 引入编辑器组件
// import BraftEditor from 'braft-editor'
// // 引入编辑器样式
// import 'braft-editor/dist/index.css'
// import {SearchOutlined, UserOutlined} from '@ant-design/icons';
// import {BrowserRouter} from "react-router-dom";
// import {Button, Form, Input, message, Modal, Radio, Select, Space, Table} from "antd";
// import axios from "axios";
// import {HOST, PORT} from "../config/apiconfig";
// import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
// // import BraftEditor from "_braft-editor@2.3.9@braft-editor";
//
//
// export const Company = () => {
//     const [orders, setOrders] = React.useState([]); // 存放所有的订单数据，形式数组中存放对象
//     const [state, setState] = React.useState(false); // 记录当前页面是否修改
//     const [company, setCompany] = React.useState({}); // 记录要修改的订单的值
//     const [modifyOrders, setModifyOrders] = React.useState(false); // 是否显示修改信息的模态框
//     const [addOrders, setAddOrders] = React.useState(false); // 是否显示添加的模态框
//
//     const modifyRef = React.createRef(); // 与修改模态框绑定
//     const addRef = React.createRef(); // 与添加模态框绑定
//
//     const {confirm} = Modal;
//
//
//     //富文本编辑框
//
//     // 打开模态框
//     const showModifyModal = (record) => {
//         console.log(record)
//         setCompany(record);
//         setModifyOrders(true);
//     }
//     const showAddModal = () => {
//         setAddOrders(true);
//     }
//
//     // 关闭模态框
//     const handleModifyCancel = () => {
//         setModifyOrders(false);
//     }
//     const handleAddCancel = () => {
//         setAddOrders(false);
//     }
//
//
//     const columns = [ // 定义表格的列
//         {
//             title: "编号",
//             dataIndex: "id",
//             key: "id",
//             sorter: (a, b) => a.id - b.id,
//             align: "center"
//         },
//         {
//             title: "企业名称",
//             dataIndex: "name",
//             key: "name",
//             editable: true,
//             align: "center"
//         },
//         {
//             title: "地址",
//             dataIndex: "address",
//             key: "address",
//             editable: true,
//             align: "center"
//         },
//         {
//             title: "电话",
//             dataIndex: "tel",
//             key: "tel",
//             editable: true,
//             align: "center"
//         },
//         {
//             title: "简介",
//             dataIndex: "intro",
//             key: "intro",
//             editable: true,
//             align: "center"
//         },
//         {
//             title: "经度",
//             dataIndex: "longitude",
//             key: "longitude",
//             align: "center"
//         },
//         {
//             title: "纬度",
//             dataIndex: "latitude",
//             key: "latitude",
//             align: "center"
//         },
//         {
//             title: "创建时间",
//             dataIndex: "created_at",
//             key: "created_at",
//             align: "center"
//         },
//         {
//             title: "更新时间",
//             dataIndex: "updated_at",
//             key: "updated_at",
//             align: "center"
//         },
//         {
//             title: "操作",
//             key: "action",
//             width: '30px',
//             render: (text, record) => (
//                 <Space size={"middle"}>
//                     <Button type={"link"} icon={<EditOutlined/>}
//                             onClick={() => showModifyModal(record)}>修改</Button>
//                     <Button type={"link"} icon={<DeleteOutlined/>} danger
//                             onClick={() => showDeletConfirm(record.id)}>删除</Button>
//                 </Space>
//             )
//
//         }
//     ];
//
//     //富文本编辑器
//     const extendControls = [
//         {
//             key:"font-family",
//         },
//     ];
//     const fontFamily = [
//         {
//             name: "宋体",
//             family: '"宋体",sans-serif',
//         },
//         {
//             name: "Arial",
//             family: "Arial, Helvetica, sans-serif",
//         },
//         {
//             name: "Georgia",
//             family: "Georgia, serif",
//         },
//         {
//             name: "Impact",
//             family: "Impact, serif",
//         },
//         {
//             name: "Monospace",
//             family: '"Courier New", Courier, monospace',
//         },
//         {
//             name: "Tacoma",
//             family: 'tam, arial, "Hiragana Sans GB", 宋体, sans-serif',
//         },
//         {
//             name: "黑体",
//             family: '"黑体",serif',
//         },
//         {
//             name: "楷体",
//             family: "楷体",
//         },
//         {
//             name: "幼圆",
//             family: "YouYuan",
//         },
//     ]
//
//
//     // 查询所有的订单
//     const allOrder = () => {
//         axios.get(`${HOST}:${PORT}/company/all`)
//             .then(result => {
//                 if (result.data.status === 200) {
//                     setOrders(result.data.data);
//                 }
//                 if (result.data.status === 400) {
//                     message.error(result.data.msg);
//                 }
//             })
//     }
//
//     //添加订单
//     const addOrder = async () => {
//         await addRef.current.validateFields()
//             .then(value => {
//                 axios.post(`${HOST}:${PORT}/company/add`, {user: value})
//                     .then(result => {
//                         if (result.data.status === 201) {
//                             message.success(result.data.msg);
//                             setAddOrders(false);
//                             setState(!state);
//                         } else {
//                             message.error("添加失败");
//                         }
//                     }).catch(err => {
//                     console.log(err);
//                 })
//             })
//     }
//
//     const modify = async () => { // 修改订单信息
//         await modifyRef.current.validateFields()
//             .then(value => { // 修改后的数据
//                 axios.put(`${HOST}:${PORT}/company/modify`, {user: value, id: company.id})
//                     .then(result => {
//                         if (result.data.status === 201) {
//                             message.success(result.data.msg);
//                             setModifyOrders(false);
//                             setState(!state);
//                         }
//                     }).catch(err => {
//                     console.log(err);
//                 })
//             })
//     }
//
//     const deleteOrder = (id) => { // 删除某个订单
//         // console.log(typeof id) // id是获取到的索引number类型
//         axios.delete(`${HOST}:${PORT}/company/delete`, {data: {id: id}})
//             .then(result => {
//                 // console.log(result);
//                 if (result.data.status === 204) {
//                     setState(!state); // 刷新
//                     message.success(result.data.msg);
//                 } else {
//                     message.error("删除失败");
//                 }
//             }).catch(err => {
//             console.log(err);
//         })
//     }
//
//     const showModifyConfirm = () => { // 修改时弹出的确定框
//         confirm({
//             title: "确定修改",
//             icon: <ExclamationCircleOutlined/>,
//             onOk() {
//                 modify()
//             },
//             okText: "确定",
//             cancelText: "取消",
//             centered: true
//         })
//     }
//
//     const showDeletConfirm = (id) => { // 删除时弹出的提示框
//         confirm({
//             title: "确定删除",
//             icon: <ExclamationCircleOutlined/>,
//             onOk() {
//                 deleteOrder(id);
//             },
//             okText: "删除",
//             cancelText: "取消",
//             centered: true,
//             okType: "danger"
//         })
//     }
//
//     const showAddConfirm = async () => { // 添加订单信息询问框
//         confirm({
//             title: "添加订单",
//             icon: <InfoCircleOutlined/>,
//             onOk() {
//                 addOrder();
//             },
//             okText: "添加",
//             cancelText: "取消",
//             centered: true
//         })
//     }
//
//     const onSearch = () => { // 搜索订单信息
//         let value = document.getElementById("input").value; // 获取输入框的值
//         if (value == "") {
//             setState(!state);
//             return;
//         }
//         axios.get(`${HOST}:${PORT}/company/one`, {params: {name: value}})
//             .then(result => {
//                 if (result.data.status === 200) {
//                     setOrders(result.data.data);
//                 }
//             }).catch(err => {
//             console.log(err);
//         })
//     }
//
//     React.useEffect(() => allOrder(), [state]); // 设置刷新当前页面的条件
//
//     return (
//         <BrowserRouter>
//             <div style={{padding: "30px 20px"}}>
//                 {/*搜索添加*/}
//                 <Input.Group compact style={{display: "flex"}} className={"select"}>
//                     <div width={100}>
//                         <Input id={'input'} placeholder="请输入查询名称" prefix={<UserOutlined/>}/>
//                     </div>
//                     <Button type="primary" icon={<SearchOutlined/>} onClick={() => onSearch()}>
//                     </Button>
//                     &nbsp;&nbsp;&nbsp;
//                     {/*控制添加按钮显示*/}
//                     <Button type="primary" onClick={() => showAddModal()}>添加</Button>
//                 </Input.Group>
//
//                 <Table rowKey={record => record.id} columns={columns} dataSource={orders}
//                        style={{marginTop: "20px"}} pagination={{
//                     pageSize: 5, // 每页显示条数
//                     hideOnSinglePage: true, // 一页时不隐藏分页器，
//                     showQuickJumper: true,
//                 }}></Table>
//
//
//                 <Modal style={{display:"block", width:'800px',height:'800px'}} title={"修改企业信息"} visible={modifyOrders} okText={"修改"} cancelText={"取消"}
//                        onCancel={handleModifyCancel}
//                        destroyOnClose onOk={() => showModifyConfirm()} centered={true}>
//                     <Form ref={modifyRef}>
//                         <Form.Item label='企业名称' name='name' initialValue={company.name}
//                                    rules={[{require: true, message: '请输入名称'
//                                    }]}>
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="地址" name="address" initialValue={company.address}
//                             rules={[{ required: true, message: '请输入地址' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="电话" name="phone" initialValue={company.phone}
//                                    rules={[
//                                        {
//                                            required: true,
//                                            // pattern: /^1[3|4|5|7|8][0-9]{9}$/,
//                                            message: '请输入正确电话号码'
//                                        }
//                                    ]}>
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="经度" name="longitude" initialValue={company.longitude}
//                             rules={[{ required: true, message: '请输入经度' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="纬度" name="latitude" initialValue={company.latitude}
//                             rules={[{ required: true, message: '请输入纬度' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="简介" name="intro" initialValue={company.intro}
//                             rules={[{ required: true, message: '请输入简介' }]}
//                         >
//                             <table border={1}>
//                                 <BraftEditor
//                                     extendControls={extendControls}
//                                     fontFamilies={fontFamily}
//
//                                 />
//                             </table>
//                         </Form.Item>
//                     </Form>
//                 </Modal>
//
//                 <div style={{display:"block", width:'1500px'}}>
//                 <Modal  title={"添加订单"} visible={addOrders} okText={"添加"} cancelText={"取消"} onCancel={handleAddCancel}
//                        destroyOnClose centered={true} onOk={() => showAddConfirm()}>
//                     <Form ref={addRef}>
//                         <Form.Item label='企业名称' name='name' initialValue={company.name}
//                                    rules={[{require: true, message: '请输入名称'
//                                    }]}>
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="地址" name="address" initialValue={company.address}
//                                    rules={[{ required: true, message: '请输入地址' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="电话" name="phone" initialValue={company.phone}
//                                    rules={[
//                                        {
//                                            required: true,
//                                            // pattern: /^1[3|4|5|7|8][0-9]{9}$/,
//                                            message: '请输入正确电话号码'
//                                        }
//                                    ]}>
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="经度" name="longitude" initialValue={company.longitude}
//                                    rules={[{ required: true, message: '请输入经度' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="纬度" name="latitude" initialValue={company.latitude}
//                                    rules={[{ required: true, message: '请输入纬度' }]}
//                         >
//                             <Input/>
//                         </Form.Item>
//
//                         <Form.Item label="简介" name="intro" initialValue={company.intro}
//                                    rules={[{ required: true, message: '请输入简介' }]}
//                         >
//                             <table border={1}>
//                                 <BraftEditor
//                                     extendControls={extendControls}
//                                     fontFamilies={fontFamily}
//
//                                 />
//                             </table>
//                         </Form.Item>
//
//                     </Form>
//                 </Modal>
//                 </div>
//             </div>
//         </BrowserRouter>
//     )
// }