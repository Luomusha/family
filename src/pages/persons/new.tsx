import type { NextPage } from "next"
import { SystemLayout } from "../../components/SystemLayout";
import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, PageHeader, Radio, Upload } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../common/useFetch";
import { Person } from "../../types";
import router from "next/router";
import styles from "./styles.module.scss"

const PersonForm: NextPage = () => {
    const [data, setData] = useState<Person[]>([])
    const { fetchPost } = useFetch("/api/Persons")
    const onFinish = (data: Person) => {
        fetchPost(data).then(console.log)
    }

    return <SystemLayout>

        <PageHeader title="新增成员"
            onBack={() => router.back()}
            subTitle="This is a subtitle" />
        <Card title={"成员信息"} style={{ marginLeft: 24, marginRight: 24 }}>
            <Form onFinish={onFinish} layout="vertical" className={styles.Form}>
                <Form.Item label="姓名"
                    name="name"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="头像"
                    name="avatar"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item label="性别"
                    name="gender"
                    initialValue={"male"}
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Radio.Group>
                        <Radio value="male"> 男 </Radio>
                        <Radio value="female"> 女 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="出生年月"
                    name="birthday"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    </SystemLayout>
}

export default PersonForm

