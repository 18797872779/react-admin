import {
    Form,
    Input,
    Button,
    Upload,
    Image
  } from 'antd';
  import { UploadOutlined } from '@ant-design/icons';
import React ,{useState} from 'react'

import {addBanner} from '../../api/Banner'
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  

  const AddBanner = (props) => {
  const [Url, setUrl] = useState([])
    const onFinish = (values) => {
      // console.log('Received values of form: ', values);
      values.bannerimg=values.bannerimg[0].thumbUrl
      addBanner(values).then(res=>{
          console.log('res:',res);
          props.history.goBack()
      })
    };
    const normFile = (e) => {
      console.log('Upload event:', e);
    setUrl(e.fileList[0].thumbUrl)
      if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
    };

    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item label="轮播图操作">
          <span className="ant-form-text">添加</span>
        </Form.Item>

        <Form.Item
        {...formItemLayout}
        label="轮播图链接"
        name="link"
        rules={[{ required: true, message: '请输入轮播图的链接!' }]}
      >
        <Input placeholder="请输入轮播图的链接!"/>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="alt"
        name="alt"
        rules={[{ required: true, message: '请输入图片提示语句!' }]}
      >
        <Input placeholder="请输入图片提示语句!"/>
      </Form.Item>
        <Form.Item
          name="bannerimg"
          label="上传图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
              {
                  required:true,
                  message:'请输入轮播图图片'
              }
          ]}
        >
          <Upload name="logo"  listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <Image src={Url}/>
          </Upload>
        </Form.Item>
  
  
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit"
          >
            添加图片
          </Button>
        </Form.Item>
      </Form>
    );
  };
   export default AddBanner