import type { NextPage } from "next"
import { SystemLayout } from "../../components/SystemLayout";
import { Button, Card, PageHeader, Table } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../common/useFetch";
import { Person } from "../../types";
import Link from "next/link";
import styles from "./styles.module.scss"

const PersonPage: NextPage = () => {
    const [data, setData] = useState<Person[]>([])
    const { loading, fetchGet } = useFetch("/api/Persons")
    const columns = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
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
        fetchGet<Person[]>().then(setData)
    }, [])

    return <SystemLayout>
        <PageHeader title="项目列表"
            subTitle="This is a subtitle"
            extra={[
                <Button key="1" type="primary"><Link href={"/persons/new"}>新增成员</Link></Button>,
            ]} />
        <Table dataSource={data}
            className={styles.Content}
            columns={columns}
            loading={loading}
        />
    </SystemLayout>
}

export default PersonPage

