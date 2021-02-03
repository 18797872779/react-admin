import React from 'react';
import { Transfer, Switch, Table, Image, message } from 'antd';
import difference from 'lodash/difference';

import {getNavlist} from '../../api/Nav'
// Customize Table Transfer

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
     
      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },

        onSelect({ key }, selected) {
          onItemSelect(key, selected);
          console.log(key,selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = [];


const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
   
  });
}


// const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'name',
    key:'name',
    align:'center',
    title: '名称',
  },
  {
    dataIndex: 'categoryname',
    align:'center',
    key:'categoryname',
    title: '类别',
  },
  {
    dataIndex: 'icon',
    align:'center',
    key:'icon',
    title: '图标',
    render: text => <Image src={text} style={{width:'30px'}}/>,
  },
  {
    dataIndex: 'titleImg',
    align:'center',
    title: '标识',
    render:(text)=>{
        return <Image src={text}style={{width:'160px'}}/>
    }
  },
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    key:'name',
    title: '名称',
  },
  {
    dataIndex: 'icon',
    align:'center',
    key:'icon',
    title: '图标',
    render: text => <Image src={text} style={{width:'80px',height:'40px'}}/>,
  },
];

class HomeList extends React.Component {

   async componentDidMount(){
      const nav=  await getNavlist()
      const navList=nav.data.data
      this.setState({
          navList:navList
      })
      console.log(navList);
      navList.map(item=>(
        mockTags.push(item.categoryname)
      ))
      
      console.log(mockTags);
    }
  state = {
    targetKeys: [],
    disabled: false,
    showSearch: false,
    navList:[],
    selectedKeys:[]
  };

 handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    if (sourceSelectedKeys.length>10) {
        message.error("选择数据不能超过十条")
    }else{
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  onChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };


  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys,  showSearch,navList} = this.state;
    return (
      <>
        <TableTransfer
          dataSource={navList}
          targetKeys={targetKeys}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.name.indexOf(inputValue) !== -1 || item.categoryname.indexOf(inputValue) !== -1
          }
          rowKey={record => record.navid}
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
          onSelectChange={this.handleSelectChange}
        />
      
        <Switch
          unCheckedChildren="搜索"
          checkedChildren="关键字搜索"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 16 }}
        />
      </>
    );
  }
}
export default HomeList