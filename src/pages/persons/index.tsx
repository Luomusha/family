import type {NextPage} from "next"
import {SystemLayout} from "../../components/SystemLayout";
import {Table} from "antd";
import {useEffect, useState} from "react";
import {useFetch} from "../../common/useFetch";
import {Person} from "../../types";

const PersonPage: NextPage = () => {
    const [data, setData] = useState<Person[]>([])
    const {fetchGet} = useFetch("/api/Persons")
    const columns = [{
        title: "ID",
        key: "id",
    },{
        title: "姓名",
        key: "name",
    }, {
        title: "生日",
        key: "birthday",
    }]

    useEffect(() => {
        fetchGet<Person[]>().then(setData)
    }, [])

    return <SystemLayout>
        <Table dataSource={data} columns={columns} />
    </SystemLayout>
}

export default PersonPage

