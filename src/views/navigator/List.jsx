import React, { useState, useEffect } from 'react'
import { Table, Image, Space, Button } from 'antd'
// import { } from '@ant-design/icons';

import { getNavlist } from '../../api/Nav'
function List() {
    const [navlist, setNavlist] = useState([])


    // 设置分页，初始化数据
    // 初始化分页数
    const [pageSize, setPageSize] = useState(5)
    // 初始化页面总数数据
    const [total, setTotal] = useState(0)
    // 初始化当前页数
    const [current, setCurrent] = useState(1)
    useEffect(() => {
        getNavlist().then(res => {
            setNavlist(res.data.data)
            console.log(res);
        })
    }, [])

    const columns = [
        {
            title: '序号',
            align:'center',
            width:250,
            render: (text, record, index) => <span >{index + 1}</span>
        }, {
            align: 'center',
            width:350,
            title: '名称',
            dataIndex: 'categoryname',
            key: 'categoryname'
        },
        {
            title: '类别',
            width:350,
            align: 'center',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '图标',
            width:450,
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            render: (text) => {
                return <Image style={{ width: '50px' }} src={text} />
            }
        },
        {
            title: '操作',
            align: 'center',
            render: (text) => {
                return <Space>
                    <Button>编辑</Button>
                    <Button>删除</Button>
                </Space>
            }
        },
    ]
    return (
        <>
            <Table dataSource={navlist} columns={columns}
                rowKey={record => record.navid}
                size={"small"}
                scroll={{ y: 600 }}
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
        </>
    )
}
export default List