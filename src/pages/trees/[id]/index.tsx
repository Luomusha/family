import type { NextPage } from "next"
import { SystemLayout } from "../../../components/SystemLayout";
import { Avatar, Button, DatePicker, Form, Input, List, message, Modal, PageHeader, Radio, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../../common/useFetch";
import { Member, Tree } from "../../../types";
import Link from "next/link";
import styles from "../styles.module.scss"
import { useRouter } from "next/router";

const TreeDetail: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { loading: membersLoading, fetchGet: getMembers, fetchPost } = useFetch("/api/Members")
    const { loading, fetchGet: getTree, fetchPut } = useFetch(`/api/Trees/${id}`)
    const [treeOpen, setTreeOpen] = useState(false);
    const [memberOpen, setMemberOpen] = useState(false);
    const [treeForm] = Form.useForm();
    const [memberForm] = Form.useForm();

    const [members, setMembers] = useState<Member[]>([])
    const [tree, setTree] = useState<Tree>({
        id: NaN,
        name: "家谱",
        cover: "",
        note: "",
    })
    const columns = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
    }, {
        title: "头像",
        dataIndex: "avatar",
        key: "avatar",
    }, {
        title: "姓名",
        dataIndex: "name",
        key: "name",
    }, {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
    }, {
        title: "生日",
        dataIndex: "birthday",
        key: "birthday",
    }, {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
    }, {
        title: "更新时间",
        dataIndex: "updatedAt",
        key: "updatedAt",
    }]

    useEffect(() => {
        if (!id) return
        getMembers<Member[]>().then(setMembers)
        getTree<Tree>().then(setTree)
    }, [id])

    const handleMember = () => {
        memberForm.validateFields()
            .then((member: Member) => {
                return fetchPost(member)
            })
            .then(() => {
                message.success("保存成功")
                setMemberOpen(false)
            })
            .catch(e => message.error(e.message))
    }

    const handleOk = () => {
        treeForm.validateFields()
            .then((tree: Tree) => {
                return fetchPut<Tree>(tree)
            })
            .then((tree: Tree) => {
                message.success("保存成功")
                setTree(tree)
                setTreeOpen(false)
            })
            .catch(e => message.error(e.message))
    }

    return <SystemLayout>
        <PageHeader title={tree.name}
            subTitle={tree.note}
            onBack={() => router.back()}
            extra={[
                <Button key={"edit"} type="primary" onClick={() => setTreeOpen(true)}>编辑</Button>,
                <Button key={"add-member"} type="primary" onClick={() => setMemberOpen(true)}>添加成员</Button>

            ]}>

        </PageHeader>

        <List dataSource={members} className={styles.Content}
            size="small"
            bordered
            header={<Typography.Text>成员列表</Typography.Text>}
            loading={membersLoading}
            renderItem={item => (
                <List.Item key={item.id}
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}                    >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />

        <Modal title={"新建家谱"}
            width={800}
            centered
            open={treeOpen}
            onOk={handleOk}
            destroyOnClose={true}
            okText={"保存"}
            cancelText={"取消"}
            onCancel={() => setTreeOpen(false)}
            confirmLoading={loading}
        >
            <Form form={treeForm}
                className={styles.Form}
                initialValues={tree}
                layout="vertical" >
                <Form.Item label="名称" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input placeholder="祝氏家谱" />
                </Form.Item>

                <Form.Item label="封面"
                    name="cover"
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

        <Modal title={"新建成员"}
            width={800}
            centered
            open={memberOpen}
            onOk={handleMember}
            destroyOnClose={true}
            okText={"保存"}
            cancelText={"取消"}
            onCancel={() => setMemberOpen(false)}
            confirmLoading={loading}
        >
            <Form onFinish={handleMember}
                form={memberForm}
                layout="vertical"
                className={styles.Form}>
                <Form.Item label="姓名"
                    name="name"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="头像"
                    name="avatar"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        onChange={() => { }}>
                        Upload
                    </Upload>
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
            </Form>
        </Modal>

    </SystemLayout >
}

export default TreeDetail

