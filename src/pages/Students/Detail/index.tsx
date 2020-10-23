import React, { useEffect } from 'react';
import moment from 'moment';
import { history } from 'umi';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { addStudents, getStudents, updateStudents } from '../service';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const StudentsDetail: React.FC<{}> = props => {
  const [form] = Form.useForm();
  const { id } = props.match.params;

  useEffect(() => {
    const initialData = async () => {
      const { data } = await getStudents({
        stu_no: id,
      });
      if (data.stu_birthday) {
        data.stu_birthday = moment(data.stu_birthday);
      }
      form.setFieldsValue(data);
    }

    if (id) {
      try {
        initialData();
      } catch (err) {
        message.error('获取学生信息失败请重试！');
      }
    }
  }, []);

  const handleAdd = async values => {
    try {
      await addStudents(values);
      message.success('添加成功');
      history.push('/students');
    } catch (error) {
      message.error('添加失败请重试！');
    }
  }

  const handleUpdate = async values => {
    values.stu_no = id;
    try {
      await updateStudents(values);
      message.success('更新成功');
      history.push('/students');
    } catch (error) {
      message.error('更新失败请重试！');
    }
  }

  const onFinish = values => {
    if (values.stu_birthday) {
      values.stu_birthday = moment(values.stu_birthday).format('YYYY-MM-DD');
    }

    if (id) {
      handleUpdate(values);
    } else {
      handleAdd(values);
    }
  };

  return (
    <PageContainer title="学生详情">
      <Form
        {...layout}
        name="students"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="学生姓名"
          name="stu_name"
          rules={[{ required: true, message: '请输入学生姓名' }]}
        >
          <Input placeholder="请输入学生姓名" />
        </Form.Item>
        <Form.Item
          label="学生性别"
          name="stu_sex"
        >
          <Select placeholder="请选择性别">
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="出生日期"
          name="stu_birthday"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="专业"
          name="stu_major"
        >
          <Input placeholder="请输入专业" />
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

export default StudentsDetail;
