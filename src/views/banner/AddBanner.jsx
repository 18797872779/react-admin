import {
    Form,
    Input,
    Button,
    Upload,
    Image
  } from 'antd';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
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
  
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  const AddBanner = () => {
  const [Url, setUrl] = useState([])
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      setUrl(values.bannerimg)
      addBanner(values).then(res=>{
          console.log('res:',res);
      })
    };

    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          rate: 3.5,
        }}
      >
        <Form.Item label="轮播图操作">
          <span className="ant-form-text">添加</span>
        </Form.Item>

        <Form.Item
        label="轮播图链接"
        name="link"
        rules={[{ required: true, message: '请输入轮播图的链接!' }]}
      >
        <Input placeholder="请输入轮播图的链接!"/>
      </Form.Item>
      <Form.Item
        label="alt"
        name="alt"
        rules={[{ required: true, message: '请输入图片提示语句!' }]}
      >
        <Input placeholder="请输入图片提示语句!"/>
      </Form.Item>
<div className="addbanner">
{

Url.map(item=><Image src={item.thumbUrl} key={item.uid} />)
}
</div>
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
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
  


        <Form.Item label="Dragger">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
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