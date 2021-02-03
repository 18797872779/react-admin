import React,{useState,useEffect} from 'react'
import { Table} from 'antd'
// import { PlusOutlined } from '@ant-design/icons'

import {getCategory} from '../../api/Nav'


function Category() {
    const [category, setCategory] = useState()
useEffect(() => {
   getCategory().then(res=>{
       console.log(res);
       setCategory(res.data.data)
   })
}, [])

  
    const columns=[
        {
            title:'序号',
            render:(text,record,index)=>{
                return<span>{index+1}</span>
            }
        },
        {
            title:'导航类别',
            dataIndex:'name',
            key:'name'

        }
    ]
    return (
        <>
        <Table dataSource={category} columns={columns} 
        rowKey={record=>record.categoryid}
        />;
        </>
    )
}
export default Category