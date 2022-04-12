//  分类管理页面的上传组件
import React from "react";
import {Form,Upload,Modal,Input} from "antd";
import {DatePicker} from "antd/es";
import zhCN from 'antd/es/locale/zh_CN'
import {PlusOutlined} from "@ant-design/icons";

class ClassifyAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state={

            ImgList:[],  //图片文件列表
            previewVisible:false ,  //控制图片预览窗口是否显示
            previewTitle:''   ,  //上传图片的标题，通常是文件名
        previewImage:''  //预览的图片
        }
    }

    render() {
        const {ImgList,previewVisible,previewTitle,previewImage}=this.state  //解构
        const uploadButton=(
            <div>
                <PlusOutlined/>
                <div style={{marginTop:8}}>Upload</div>
            </div>
        )
        return (
            <div>
                <Modal title={<div style={{
                    width:'100%',
                    cursor:'move'
                }}>添加信息</div>}
                visible={this.props.classifyAddVisible}
                       onCancel={()=>{
                       this.props.parent.closeClassifyAdd()
                       }
                       }
                       okText="提交"
                       cancelText="取消"
                >
                    <Form  labelCol={{ span: 4 }}>
                        <Form.Item label='分类id'
                        name='sid'
                          rules={[{
                                       require:true,
                              message:'请输入分类id'
                                   }
                                   ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label='分类名称'
                                   name='sname'
                                   rules={[{
                                       require:true,
                                       message:'请输入分类名称'
                                   }
                                   ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item label='图片'
                                   name='simg'
                                   rules={[{
                                       require:true,
                                       message:'请选择图片'
                                   }
                                   ]}
                        >
                          <Upload
                          name={'ImageName'}
                          listType={'picture-card'}
                          fileList={ImgList}  //上传图片的列表
                              onPreview={''}
                          onChange={''}
                          action={''}
                          data={''}
                          beforeUpload={''}
                          >
                              {ImgList.length>=1?null:uploadButton}
                          </Upload>
                            {/*图片预览窗口*/}
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={''}
                            >
                                <img alt={'example'} style={{width:'100%'}} src={previewImage}/>
                            </Modal>
                        </Form.Item>
                        <Form.Item label='创建时间'
                                   name='stime'
                                   rules={[{
                                       require:true,
                                       message:'请输入创建时间'
                                   }
                                   ]}
                        >
                            <DatePicker locale={zhCN}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

}

export default ClassifyAdd;