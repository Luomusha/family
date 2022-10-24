import { Button, Card, DatePicker, Form, Input, PageHeader, Radio, Upload, UploadFile, UploadProps } from "antd";
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
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const onFinish = (data: Tree) => {
        fetchPost(data).then(console.log)
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
                    rules={[{ required: true, message: "Please input your username!" }]}>

                    <Upload listType="picture-card"
                        showUploadList={false}
                        action="/api/upload"
                        onChange={handleChange}>
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div>
                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>}
                    </Upload>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    </SystemLayout>
}
export default TreeForm