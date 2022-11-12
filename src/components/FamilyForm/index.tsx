import { Form, FormInstance, Input, Radio } from "antd";
import { Tree } from "../../types";
import styles from "./styles.module.scss"

type FamilyProps = {
    form: FormInstance
    init?: Tree
}

export const FamilyForm = (props: FamilyProps) => <Form form={props.form}
    className={styles.Form}
    initialValues={props.init}
    layout="vertical" >
    <Form.Item label="名称" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input placeholder="祝氏家谱" />
    </Form.Item>

    <Form.Item label="封面"
        name="cover"
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Radio.Group>
            <Radio value={"http://localhost:9000/family/cover.jpeg"} checked>
                <img className={styles.cover} src="http://localhost:9000/family/cover.jpeg" alt="cover1" />
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
