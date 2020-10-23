import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCourse, deleteCourse } from './service';

const CourseList: React.FC<{}> = () => {
  const actionRef = useRef();

  const handleDelete = async id => {
    try {
      await deleteCourse({
        cou_no: id,
      });
      message.success('删除成功');
      actionRef.current.reload();
    } catch (error) {
      message.error('删除失败请重试！');
    }
  }

  const handleEdit = id => {
    history.push(`/course/detail/${id}`);
  }

  const columns = [
    {
      title: '课程编号',
      dataIndex: 'cou_no',
    },
    {
      title: '课程名称',
      dataIndex: 'cou_name',
    },
    {
      title: '学时数',
      dataIndex: 'cou_duration',
    },
    {
      title: '学分',
      dataIndex: 'cou_credit',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a style={{ marginRight: '5px' }} onClick={() => handleDelete(record.cou_no)}>
            删除
          </a>
          <a onClick={() => handleEdit(record.cou_no)}>
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
            <PlusOutlined onClick={() => history.push('/course/detail')} /> 新建
          </Button>,
        ]}
        request={params => {
          delete params.current;
          delete params.pageSize;
          return queryCourse({ ...params })
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default CourseList;
