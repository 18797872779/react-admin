import React, { Fragment, useState, useEffect } from 'react'
import { Button, Space, Table, Popconfirm,Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import { getBanner, deleteBanner } from '../../api/Banner'
import index from '../Home/Index';
function Index(props) {

  // 这是相当于类组件里面的state
  const [bannerlist, setBannerlist] = useState([])


  // 这是函数组件里面页面自动更新渲染的hook函数
  useEffect(() => {
    getBanner().then(res => {
      console.log(res);
      setBannerlist(res.data.data)
    })
  }, [])


  // 定义删除的函数(传入的是一个函数，需要还有一层才能得到参数)
 const deleteItem=(bannerid,index)=>()=>{
   //通过传入要删除的轮播图对应的id找到下标在list里面删除，需要用到深拷贝
  deleteBanner({bannerid}).then(res=>{
    // 下面这个在分页的时候会出问题，因为那个时候下标又从1开始
    // let bannerArr=JSON.parse(JSON.stringify(bannerlist))
    // // 找到图片删除对应下标这张
    // bannerArr.splice(index,1)
    // setBannerlist(bannerArr)

    // 因为是删了数据库数据，直接重新请求一下
    getBanner().then(res=>{
      setBannerlist(res.data.data)
    })
  })
 }

//  取消删除
const cancel=()=>{}



// 表格的列数据
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => (
        <Image src={text} style={{width:'100px',height:'100px'}} />
      )

    },
    {
      title: '轮播图链接',
      dataIndex: 'link',
      align: 'center',
      key: 'link',
    }, {
      title: '操作',
      align: 'center',
      render: (text,record,index) => {
        return (
          <Space>
            <Popconfirm placement="top" title={"确定删除吗"} onConfirm={deleteItem(record.bannerid,index)} onCancel={cancel} okText="确认删除" cancelText="取消">
              <span style={{ color: "red", cursor: 'pointer' }}>删除</span>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  return (
    <Fragment>
      <Button type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          // console.log(props);
          props.history.push('/bannermannage/add')
        }}
        style={{ marginBottom: "10px" }}>
        添加轮播图
        </Button>
      <Table dataSource={bannerlist} columns={columns} />;
    </Fragment>
  )
}
export default Index