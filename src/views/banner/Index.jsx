import React,{Fragment} from 'react'
import { Button, Space,Table} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
 function Index(props) {
    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      const columns = [
        {
          title: '序号',
          align:'center',
        render:(text,record,index)=><span>{index+1}</span>
        },
        {
          title: '轮播图',
          align:'center',
          dataIndex: 'bannerImg',
          key: 'bannerImg',
        },
        {
          title: '轮播图链接',
          dataIndex: 'link',
          align:'center',
          key: 'link',
        },{
          title: '操作',
          align:'center',
          render:()=>{
              return(
                <Space>
                    <span style={{color:"blue",cursor:'pointer'}}>编辑</span>
                    <span>|</span>
                    <span style={{color:"red",cursor:'pointer'}}>删除</span>
                </Space>
              )
          }
        },
      ];
      
    return (
        <Fragment>
            <Button type="primary"
             icon={<PlusOutlined />}
            onClick={()=>{
              // console.log(props);
              props.history.push('/bannermannage/add')
            }}
            style={{marginBottom:"10px"}}>
                添加轮播图
        </Button>
        <Table dataSource={dataSource} columns={columns} />;
        </Fragment>
    )
}
export default Index