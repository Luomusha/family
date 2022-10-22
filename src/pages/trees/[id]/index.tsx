import type { NextPage } from "next"
import { SystemLayout } from "../../../components/SystemLayout";
import { Button, Card, PageHeader, Table } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../../common/useFetch";
import { Member } from "../../../types";
import Link from "next/link";
import styles from "../styles.module.scss"
import router from "next/router";

const MemberPage: NextPage = () => {
    const [data, setData] = useState<Member[]>([])
    const { loading, fetchGet } = useFetch("/api/Members")
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
        fetchGet<Member[]>().then(setData)
    }, [])

    return <SystemLayout>
        <PageHeader title="家谱详情"
            subTitle="This is a subtitle"
            onBack={() => router.back()}
            extra={[]} />
        <Table dataSource={data}
            className={styles.Content}
            columns={columns}
            loading={loading}
        />
    </SystemLayout>
}

export default MemberPage

