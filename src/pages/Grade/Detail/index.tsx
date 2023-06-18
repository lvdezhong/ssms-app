import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Select, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { addGrade, getGrade, updateGrade } from '../service';
import { queryStudents } from '../../Students/service';
import { queryCourse } from '../../Course/service';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const GradeDetail: React.FC = (props) => {
  const [studentsData, setStudentsData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [form] = Form.useForm();
  const { id } = props.match.params;

  useEffect(() => {
    const initialData = async () => {
      const { data } = await getGrade({
        gra_id: id,
      });
      form.setFieldsValue(data);
    };

    if (id) {
      try {
        initialData();
      } catch (err) {
        message.error('获取成绩信息失败请重试！');
      }
    }
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data } = await queryStudents();
        const dataSource = data.map((item) => ({
          label: item.stu_name,
          value: item.stu_no,
        }));
        setStudentsData(dataSource);
      } catch (err) {
        message.error('获取学生信息失败请重试！');
      }
    };
    getStudents();
  }, []);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await queryCourse();
        const dataSource = data.map((item) => ({
          label: item.cou_name,
          value: item.cou_no,
        }));
        setCourseData(dataSource);
      } catch (err) {
        message.error('获取课程信息失败请重试！');
      }
    };
    getCourse();
  }, []);

  const handleAdd = async (values) => {
    try {
      await addGrade(values);
      message.success('添加成功');
      history.push('/grade');
    } catch (error) {
      message.error('添加失败请重试！');
    }
  };

  const handleUpdate = async (values) => {
    values.gra_id = id;
    try {
      await updateGrade(values);
      message.success('更新成功');
      history.push('/grade');
    } catch (error) {
      message.error('更新失败请重试！');
    }
  };

  const onFinish = (values) => {
    if (id) {
      handleUpdate(values);
    } else {
      handleAdd(values);
    }
  };

  return (
    <PageContainer title="成绩详情">
      <Form {...layout} name="grade" form={form} onFinish={onFinish}>
        <Form.Item
          label="学生姓名"
          name="stu_no"
          rules={[{ required: true, message: '请选择学生姓名' }]}
        >
          <Select options={studentsData} placeholder="请选择学生姓名" />
        </Form.Item>
        <Form.Item
          label="课程名称"
          name="cou_no"
          rules={[{ required: true, message: '请选择课程名称' }]}
        >
          <Select options={courseData} placeholder="请选择课程名称" />
        </Form.Item>
        <Form.Item label="成绩" name="gra_score">
          <Input placeholder="请输入成绩" />
        </Form.Item>
        <Form.Item label="备注" name="gra_remark">
          <TextArea placeholder="请输入备注" rows={4} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default GradeDetail;
