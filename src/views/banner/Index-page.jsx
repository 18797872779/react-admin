import React, { Fragment, useState, useEffect } from 'react'
import { Button, Space, Table, Popconfirm,Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import { getBanner, deleteBanner } from '../../api/Banner'
function Index(props) {

  // 这是相当于类组件里面的state
  const [bannerlist, setBannerlist] = useState([])


// 设置分页，初始化数据
// 初始化分页数
const [pageSize,setPageSize]=useState(5)
// 初始化页面总数数据
const [total,setTotal]=useState(0)
// 初始化当前页数
const [current,setCurrent]=useState(1)

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
      align:'center',
      width: 150,
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '轮播图',
      align:'center',
      width: 350,
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => (
        <Image src={text} style={{width:'100px',height:'100px'}} />
      )

    },
    {
      title: '轮播图说明',
      align:'center',
      width: 450,
      dataIndex: 'alt',
      key: 'alt',
      // render: (text, record, index) => (
      //   <Image src={text} style={{width:'100px',height:'100px'}} />
      // )

    },
    {
      title: '轮播图链接',
      dataIndex: 'link',
      width: 250,
      align:'center',
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
      <Table
      size={"small"}
      scroll={{ y: 600 }}
       dataSource={bannerlist} 
      columns={columns}
      rowKey={record=>record.bannerid}
      bordered={true}
      pagination={{
        position:["bottomLeft"],
        // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
        showSizeChanger:true,
        // 指定每页可以显示多少条
        pageSizeOptions:[5,10,15,20],
        // 是否可以快速跳转至某页
        showQuickJumper: true,
         // hideOnSinglePage: true  // 慎用
         pageSize: pageSize,
        //  用于显示数据总量和当前数据顺序
         showTotal:(total,range)=>{
           console.log(total,range)
           //用于改变数据
           setTotal(total)
           return `共有${total}条数据`
         },
        //  用于显示数据总数
        total:total,
        // 当前页数
        current:current,
        //跳转页码改变的回调，参数是改变后的页码及每页条数
        onChange:(page,pageSize)=>{
          setCurrent(page)
        },
        // pageSize 变化的回调,改变显示的页数
        onShowSizeChange:(current,size)=>{
          setPageSize(size)
        }
      }}
      
       />
    </Fragment>
  )
}
export default Index