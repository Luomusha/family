import { Menu } from "antd"
import { AppstoreOutlined, MailOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons';
import Link from "next/link";

export const SystemMenu = () => {
    const items = [{
        key: 'Dashboard',
        label: <Link href={"./dashboard"}> 仪表盘 </Link>,
        icon: <PieChartOutlined />,
    }, {
        key: "Users",
        label: <Link href={"./trees"}> 家谱列表 </Link>,
        icon: <UserOutlined />,
    }, {
        key: "Members",
        label: <Link href={"./members"}> 成员列表 </Link>,
        icon: <MailOutlined />,
    }, {
        key: "Artworks",
        label: "作品管理",
        icon: <AppstoreOutlined />,
        children: [
            { key: "artworks", label: <Link href={"./artworks"}> 作品列表 </Link> },
        ]
    },
    ]
    return <Menu
        mode="inline"
        items={items}
    />
}
