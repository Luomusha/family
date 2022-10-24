import type { NextPage } from "next"
import { SystemLayout } from "../../components/SystemLayout";
import { Button, Card, Form, Input, List, message, Modal, PageHeader, Radio, Table } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../common/useFetch";
import { Tree } from "../../types";
import Link from "next/link";
import styles from "./styles.module.scss"
import router from "next/router";

const TreePage: NextPage = () => {
    const [data, setData] = useState<Tree[]>([])
    const [open, setOpen] = useState(false);
    const { loading, fetchGet, fetchPost } = useFetch("/api/Trees")
    const [form] = Form.useForm();

    useEffect(() => {
        fetchGet<Tree[]>().then(setData)
    }, [])

    const handleOk = () => {
        form.validateFields()
            .then((tree: Tree) => {
                form.resetFields();
                return fetchPost(tree)
            })
            .then(() => {
                message.success("保存成功")
                setOpen(false)
            })
            .catch(e => message.error(e.message))
    }

    return <SystemLayout>
        <PageHeader title="家谱列表"
            subTitle="This is a subtitle"
            extra={[
                <Button key="1" type="primary" onClick={() => setOpen(true)}>新增家谱</Button>,
            ]} />
        <Card className={styles.Content}>
            <List className={styles.List}
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
                dataSource={data}
                renderItem={item => <List.Item>
                    <Card cover={<img src={item.cover} alt="cover" />}
                        onClick={() => router.push(`trees/${item.id}`)}
                        className={styles.card}>
                        <Card.Meta title={item.name} />
                    </Card>
                </List.Item>}
            />
        </Card>
        <Modal title={"新建家谱"}
            width={800}
            centered
            open={open}
            onOk={handleOk}
            okText={"保存"}
            cancelText={"取消"}
            onCancel={() => setOpen(false)}
            confirmLoading={loading}
        >
            <Form form={form}
                className={styles.Form}
                layout="vertical" >
                <Form.Item label="名称" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input placeholder="祝氏家谱" />
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

                <Form.Item label="备注" name="note" rules={[{ required: true, message: "Please input note!" }]}>
                    <Input.TextArea placeholder="祝氏先祖山东闯关东来到黑龙江地带" />
                </Form.Item>
            </Form>
        </Modal>
    </SystemLayout >
}

export default TreePage

