import { useState,useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import {  Button ,message,Modal } from 'antd'
import { getAll,addCar,delCar } from '../../api/car'
const { confirm } = Modal;
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormUploadButton
} from '@ant-design/pro-form';

import ProTable, { TableDropdown,ProColumns } from '@ant-design/pro-table';
const Car = ()=>{

  const [showAdd,setShowAdd] = useState(false)

  const columns = [
    {
      title: '车辆id',
      dataIndex: 'id',
      key:'id',
      hideInSearch: true,

    },
    {
      title: '车辆名称',
      dataIndex: 'name',
      key:'name'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key:'brand'

    },
    {
      title: '排量',
      dataIndex: 'pl',
      hideInSearch: true,

    },
    {
      title: '颜色',
      dataIndex: 'color',
      hideInSearch: true,

    },
    {
      title:'操作',
      render(_,record){
        console.log('record',record)
        return (
          <>
            <Button onClick={()=>del(record.id)}>删除</Button>
            <Button>编辑</Button>
          </>

          )

      }

    }

  ];

  const table = useRef(null)

  // 获取表格数据
  const getList = async (options)=>{
    console.log('options',options)
   const { name,brand } = options
    const page = options.current;
    const limit = options.pageSize;
    let res = await getAll({
      name,
      brand,
      limit,
      page
    });
    const { rows,count } = res.data
    return {
      data: rows,
      total: count,
      success: res.success
    }
  }

  // 新增
  const add = async (data)=>{
      const res = await addCar(data);
      console.log('res',res)
      const { success} = res;
      if(success) {
        message.success('添加成功');
        setShowAdd(false)
        table.current.reload() // 表格重新获取数据

      }
  }

  const del = async (id)=>{
    console.log('id',id)
    confirm({
      title: '对跟你们说得一样?',
      content: '删？',
      async onOk() {
        console.log('OK');
        const res = await delCar({id})
        const { success } = res;
        if(success) {
          message.success('删除成功');
          table.current.reload()
        }

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  return (
    <PageContainer>
      <ProTable actionRef={table} columns={columns} request={getList} toolBarRender={()=> {
        return <Button onClick={()=> setShowAdd(true)}>新建</Button>
      } } />

    {/* 新增的操作  */}
      <ModalForm title="添加车辆" visible={showAdd} onFinish={add}>
          <ProForm.Group>
            <ProFormText width="md" name="name" label="车辆名称" placeholder="请填写车辆名称" />
            <ProFormText width="md" name="brand" label="品牌" placeholder="请填写车辆品牌" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="pl" label="排量" placeholder="请填写车辆排量" />

            <ProFormSelect width="md" label="颜色" name="color" options={ [
              {  value: 'pink', label: '猛男粉', },
              {  value: 'blue', label: 'baby蓝', },
              {  value: 'green', label: '爵士绿', },
              {  value: 'other', label: '其他', },
            ] } />
          </ProForm.Group>
        <ProForm.Group>
          <ProFormUploadButton label="上传图片" width="md" name="pic" />
        </ProForm.Group>

      </ModalForm>
    </PageContainer>
  )
}

export  default  Car
