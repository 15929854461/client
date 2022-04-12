//  分类管理页面

import React from 'react';
import {Input, Button, Space, Table, Modal} from "antd";

import {FormOutlined,CloseOutlined,ExclamationCircleFilled} from "@ant-design/icons";
import ClassifyAdd from "./classifyAdd";
import axios from "axios";


const onSearch = value => console.log(value)
const { Search } = Input;
const {Column} =Table;

class  ClassifyDemo extends React.Component{
constructor(props) {
    super(props);
    this.state={
        data:[],
        pageSize:5,    //分页
        classifyAddVisible:false  //绝对添加组件是否显示
    }
}

//打开添加信息组件
    openClassifyAdd=()=>{
    this.setState({
        classifyAddVisible: true
    })
    }

    //关闭添加信息窗口
    closeClassifyAdd=()=>{
    this.setState({
            classifyAddVisible:false
        })
    }
    // 查询所有

    // 表格中的删除按钮
    deleteRecord=(id)=>{
        //弹出确认窗口
        Modal.confirm({
            title:'确定删除吗？',
            icon:<ExclamationCircleFilled/>,
            content:id,
            okText:'确定',
            okType:'danger',
            cancelText:'取消',
            // onOk:()=>{
            //     axios.delete(`${HOST}:${PORT}/data/del`,{sid:id})
            //         .then(result=>{
            //
            //         })
            // }
        })
    }
render() {
    const {pageSize}=this.state
    return(
        <>
            {/*搜索添加*/}
            <div className={'search'}>
                <Space>
                    <Search
                        placeholder="搜索分类名称"
                        allowClear
                        enterButton="搜索"
                        size="middle"
                        onSearch={onSearch}
                    />
                    <Button type="primary" onClick={this.openClassifyAdd}>添加</Button>
                    <ClassifyAdd classifyAddVisible={this.state.classifyAddVisible}
                    parent={this}
                    />
                </Space>
            </div>
        {/*表格部分*/}
<Table
pagination={{
    pageSize:pageSize,  //分页
    pageSizeOptions:['5','10','15','20','25','30'],
    showSizeChanger:true  //显示分页编辑器
}}
>
    <Column title={'分类id'} dataIndex={'id'} key={'id'} align={'center'}/>
    <Column title={'分类名称'} dataIndex={'classify'} key={'classify'} align={'center'}/>
    <Column title={'图片'} dataIndex={'img'} key={'img'} align={'center'}/>
    <Column title={'创建时间'} dataIndex={'time'} key={'time'} align={'center'}/>
    <Column title={'操作'} key={'action'} align={'center'} render={(record)=>(
        <Space size={"middle"}>
            <Button type={"link"} size={"small"} icon={<FormOutlined/>}>修改</Button>
            <Button danger type={"link"} size={"small"} icon={<CloseOutlined/>}
                    onClick={()=>this.deleteRecord(record.id)}
            >删除</Button>
        </Space>
    )}/>


</Table>
        </>
    )
}
}
export default ClassifyDemo;