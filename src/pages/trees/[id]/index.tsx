import type { NextPage } from "next"
import { SystemLayout } from "../../../components/SystemLayout";
import { Avatar, Button, DatePicker, Form, Input, List, message, Modal, PageHeader, Radio, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { SettingOutlined } from '@ant-design/icons';
import { useFetch } from "../../../common/useFetch";
import { Member, Tree } from "../../../types";
import styles from "../styles.module.scss"
import { useRouter } from "next/router";
import { FamilyForm } from "../../../components/FamilyForm";
import assert from "http-assert";

const TreeDetail: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    assert(!Array.isArray(id), 400)
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

    useEffect(() => {
        if (!id) return
        getMembers<Member[]>({ tid: id }).then(setMembers)
        getTree<Tree>().then(setTree)
    }, [id])

    const handleMember = () => {
        assert(id, 400)
        memberForm.validateFields()
            .then((member: Member) => {
                return fetchPost(member)
            })
            .then(() => {
                message.success("保存成功")
                setMemberOpen(false)
                return getMembers<Member[]>({ tid: id })
            })
            .then(setMembers)
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
                <Button key={"add-member"} type="primary" onClick={() => setMemberOpen(true)}>添加成员</Button>,
                <Button key={"edit"} type="primary" onClick={() => setTreeOpen(true)}>编辑 <SettingOutlined /></Button>,

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
                        avatar={<Avatar src={`http://localhost:9000/${item.avatar}`} />}
                        title={item.name}
                        description="Ant Design"
                    />
                </List.Item>
            )}
        />

        <Modal title={"编辑家谱"}
            width={800}
            centered
            open={treeOpen}
            onOk={handleOk}
            destroyOnClose={true}
            okText={"保存"}
            cancelText={"取消"}
            onCancel={() => setTreeOpen(false)}
            confirmLoading={loading}>
            <FamilyForm form={treeForm} init={tree} />
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

                <Form.Item name="tid" hidden initialValue={tree.id} />
                <Form.Item label="姓名"
                    name="name"
                    rules={[{ required: true, message: "Please input your username!" }]}                >
                    <Input />
                </Form.Item>
                <Form.Item label="头像"
                    normalize={(v) => `family/${v.file.response}`}
                    name="avatar"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Upload action="/api/upload"
                        listType="picture-card"
                        maxCount={1}
                        accept={"image/*"}>
                        Upload
                    </Upload>
                </Form.Item>
                <Form.Item label="性别"
                    name="gender"
                    initialValue={"male"}
                    rules={[{ required: true, message: "Please input your username!" }]}                >
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

