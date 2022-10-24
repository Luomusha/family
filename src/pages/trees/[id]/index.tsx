import type { NextPage } from "next"
import { SystemLayout } from "../../../components/SystemLayout";
import { Button, Card, Descriptions, Divider, PageHeader, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../../common/useFetch";
import { Member, Tree } from "../../../types";
import Link from "next/link";
import styles from "../styles.module.scss"
import router, { useRouter } from "next/router";

const MemberPage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { loading: membersLoading, fetchGet: getMembers } = useFetch("/api/Members")
    const { loading: treeLoading, fetchGet: getTree } = useFetch(`/api/Trees/${id}`)
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

    return <SystemLayout>
        <PageHeader title="家谱详情"
            subTitle="This is a subtitle"
            onBack={() => router.back()}
            extra={[]} />

        <Card className={styles.Content}>
            <Descriptions title={tree.name} size="small" column={2}>
                <Descriptions.Item label="备注" span={2}>{tree.note}</Descriptions.Item>
                <Descriptions.Item label="创建日期">{tree.createdAt?.toString()}</Descriptions.Item>
                <Descriptions.Item label="更新日期">{tree.updatedAt?.toString()}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Typography.Title level={5}>成员列表</Typography.Title>
            <Table dataSource={members}
                size="small"
                columns={columns}
                loading={membersLoading}
            />
        </Card >
    </SystemLayout >
}

export default MemberPage

