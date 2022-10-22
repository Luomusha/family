import type { NextPage } from "next"
import { SystemLayout } from "../../components/SystemLayout";
import { Button, Card, List, PageHeader, Table } from "antd";
import { useEffect, useState } from "react";
import { useFetch } from "../../common/useFetch";
import { Tree } from "../../types";
import Link from "next/link";
import styles from "./styles.module.scss"

const TreePage: NextPage = () => {
    const [data, setData] = useState<Tree[]>([])
    const { loading, fetchGet } = useFetch("/api/Trees")

    useEffect(() => {
        fetchGet<Tree[]>().then(setData)
    }, [])

    return <SystemLayout>
        <PageHeader title="家谱列表"
            subTitle="This is a subtitle"
            extra={[
                <Button key="1" type="primary"><Link href={"/trees/new"}>新增家谱</Link></Button>,
            ]} />
        <Card className={styles.Content}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}><img src="" alt="" /></Card>
                    </List.Item>
                )}
            />
        </Card>

    </SystemLayout>
}

export default TreePage

