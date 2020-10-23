import React, { useEffect } from 'react';
import moment from 'moment';
import { history } from 'umi';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { addCourse, getCourse, updateCourse } from '../service';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const CourseDetail: React.FC<{}> = props => {
  const [form] = Form.useForm();
  const { id } = props.match.params;

  useEffect(() => {
    const initialData = async () => {
      const { data } = await getCourse({
        cou_no: id,
      });
      form.setFieldsValue(data);
    }

    if (id) {
      try {
        initialData();
      } catch (err) {
        message.error('获取课程信息失败请重试！');
      }
    }
  }, []);

  const handleAdd = async values => {
    try {
      await addCourse(values);
      message.success('添加成功');
      history.push('/course');
    } catch (error) {
      message.error('添加失败请重试！');
    }
  }

  const handleUpdate = async values => {
    values.cou_no = id;
    try {
      await updateCourse(values);
      message.success('更新成功');
      history.push('/course');
    } catch (error) {
      message.error('更新失败请重试！');
    }
  }

  const onFinish = values => {
    if (id) {
      handleUpdate(values);
    } else {
      handleAdd(values);
    }
  };

  return (
    <PageContainer title="课程详情">
      <Form
        {...layout}
        name="course"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="课程名称"
          name="cou_name"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input placeholder="请输入课程名称" />
        </Form.Item>
        <Form.Item
          label="学时数"
          name="cou_duration"
        >
          <Input placeholder="请输入学时数" />
        </Form.Item>
        <Form.Item
          label="学分"
          name="cou_credit"
        >
          <Input placeholder="请输入学分" />
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

export default CourseDetail;
