import { Layout } from "antd";
import { PropsWithChildren, useEffect } from "react";
const { Header, Content, Footer, Sider } = Layout
import styles from "./styles.module.scss"
import "antd/dist/antd.css";
import { SystemMenu } from "../SystemMenu";
import { useRouter } from "next/router";

export const SystemLayout = (props: PropsWithChildren<{}>) => {
    const router = useRouter()
    useEffect(() => {
        const USERID = localStorage.getItem("USERID")
        const TOKEN = localStorage.getItem("TOKEN")
        // if (!USERID || !TOKEN) {
        //     router.push("/")
        // }
    }, [])

    return <Layout className={styles.Layout}>
        <Header>
            <h1>一个小目标</h1>
        </Header>
        <Layout>
            <Sider>
                <SystemMenu />
            </Sider>
            <Content>{props.children}</Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
}
