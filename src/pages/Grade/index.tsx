import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryGrade, deleteGrade } from './service';

const GradeList: React.FC<{}> = () => {
  const actionRef = useRef();

  const handleDelete = async id => {
    try {
      await deleteGrade({
        gra_id: id,
      });
      message.success('删除成功');
      actionRef.current.reload();
    } catch (error) {
      message.error('删除失败请重试！');
    }
  }

  const handleEdit = id => {
    history.push(`/grade/detail/${id}`);
  }

  const columns = [
    {
      title: '学号',
      dataIndex: 'stu_no',
    },
    {
      title: '学生姓名',
      dataIndex: 'stu_name',
    },
    {
      title: '课程编号',
      dataIndex: 'cou_no',
    },
    {
      title: '课程名称',
      dataIndex: 'cou_name',
    },
    {
      title: '成绩',
      dataIndex: 'gra_score',
    },
    {
      title: '备注',
      dataIndex: 'gra_remark',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a style={{ marginRight: '5px' }} onClick={() => handleDelete(record.gra_id)}>
            删除
          </a>
          <a onClick={() => handleEdit(record.gra_id)}>
            修改
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        toolBarRender={() => [
          <Button type="primary">
            <PlusOutlined onClick={() => history.push('/grade/detail')} /> 新建
          </Button>,
        ]}
        request={params => {
          delete params.current;
          delete params.pageSize;
          return queryGrade({ ...params })
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default GradeList;
