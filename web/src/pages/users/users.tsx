import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table, TableColumnsType } from "antd"
import { Link } from "react-router";

const UsersPage = () => {

    const dataSource = [
        {
            id: '1',
            name: 'Mike',
        },
        {
            id: '2',
            name: 'Mike',
        },
        {
            id: '3',
            name: 'Mike',
        },
        {
            id: '4',
            name: 'Mike',
        },
        {
            id: '5',
            name: 'Mike',
        },
        {
            id: '6',
            name: 'Sarah',
        },
        {
            id: '7',
            name: 'John',
        },
        {
            id: '8',
            name: 'Emma',
        },
        {
            id: '9',
            name: 'Chris',
        },
        {
            id: '10',
            name: 'Alice',
        },
        {
            id: '11',
            name: 'Bob',
        },
        {
            id: '12',
            name: 'Sophia',
        },
        {
            id: '13',
            name: 'James',
        },
        {
            id: '14',
            name: 'Liam',
        },
        {
            id: '15',
            name: 'Olivia',
        },
        {
            id: '16',
            name: 'Ethan',
        },
        {
            id: '17',
            name: 'Mia',
        },
        {
            id: '18',
            name: 'Daniel',
        },
        {
            id: '19',
            name: 'Charlotte',
        },
        {
            id: '20',
            name: 'Lucas',
        },
    ];

    const columns: TableColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'action',
            align: 'right',
            render: (id: string) => (
                <Link to={`/users/${id}`} >
                    <Button type="text" icon={<EditOutlined />}>Details</Button>
                </Link>
            )
        }
    ];

    return (
        <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
            <Card title="Users" style={{ maxWidth: 1280, width: "100%" }} >
                <Table scroll={{ x: 1200 }} dataSource={dataSource} columns={columns} />
            </Card>
        </div>
    )
}

export default UsersPage