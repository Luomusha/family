import { Button, Card, DatePicker, Form, Input, message, PageHeader, Radio, Upload, UploadFile, UploadProps } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { NextPage } from "next";
import router from "next/router";
import { useFetch } from "../../common/useFetch";
import { SystemLayout } from "../../components/SystemLayout";
import { Tree } from "../../types";
import styles from "./styles.module.scss"
import { useState } from "react";
import { UploadChangeParam, RcFile } from "antd/lib/upload";

const TreeForm: NextPage = () => {
    const { fetchPost } = useFetch("/api/Trees")

    const onFinish = (tree: Tree) => {
        fetchPost(tree)
            .then(() => {
                message.success("保存成功")
                router.back()
            })
            .catch(e => message.error(e.message))
    }

    return <SystemLayout>
        <PageHeader title="新增家谱"
            subTitle="This is a subtitle"
            onBack={() => router.back()}
        />
        <Card title={"成员信息"} className={styles.Content}>
            <Form onFinish={onFinish} layout="vertical" className={styles.Form}>
                <Form.Item label="名称"
                    name="name"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="封面"
                    name="cover"
                    initialValue={"http://localhost:9000/family/cover1.png"}
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Radio.Group>
                        <Radio value={"http://localhost:9000/family/cover1.png"}>
                            <img className={styles.cover} src="http://localhost:9000/family/cover1.png" alt="cover1" />
                        </Radio>
                        <Radio value={2}>
                            <img className={styles.cover} src="http://localhost:9000/family/cover1.png" alt="cover1" />
                        </Radio>
                        <Radio value={3}>
                            <img className={styles.cover} src="http://localhost:9000/family/cover1.png" alt="cover1" />
                        </Radio>
                        <Radio value={4}>
                            <img className={styles.cover} src="http://localhost:9000/family/cover1.png" alt="cover1" />
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="备注"
                    name="note"
                    rules={[{ required: true, message: "Please input note!" }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    </SystemLayout>
}
export default TreeForm