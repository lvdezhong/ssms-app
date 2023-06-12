import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryStudents, deleteStudents } from './service';

const StudentsList: React.FC<{}> = () => {
  const actionRef = useRef();

  const handleDelete = async (id) => {
    try {
      await deleteStudents({
        stu_no: id,
      });
      message.success('删除成功');
      actionRef.current.reload();
    } catch (error) {
      message.error('删除失败请重试！');
    }
  };

  const handleEdit = (id) => {
    history.push(`/students/detail/${id}`);
  };

  const columns = [
    {
      title: '学号',
      dataIndex: 'stu_no',
    },
    {
      title: '姓名',
      dataIndex: 'stu_name',
    },
    {
      title: '性别',
      dataIndex: 'stu_sex',
      render: (value) => (value === '0' ? '男' : '女'),
    },
    {
      title: '出生日期',
      dataIndex: 'stu_birthday',
      render: (value) => {
        return moment(value).format('YYYY-MM-DD');
      },
    },
    {
      title: '专业',
      dataIndex: 'stu_major',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a style={{ marginRight: '5px' }} onClick={() => handleDelete(record.stu_no)}>
            删除
          </a>
          <a onClick={() => handleEdit(record.stu_no)}>修改</a>
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
          <Button key="add" type="primary" onClick={() => history.push('/students/detail')}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => {
          delete params.current;
          delete params.pageSize;
          return queryStudents({ ...params });
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default StudentsList;
