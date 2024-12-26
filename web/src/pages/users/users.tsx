import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../../plugins/axios";
import { toast } from 'react-toastify';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/users')
            .then((response) => { setUsers(response?.data || []); })
            .catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || 'Error returning book');
            })
            .finally(() => { setLoading(false); });

    }, []);



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
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registration_date',
            key: 'registration_date',
            render: (date: string) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Actions',
            dataIndex: 'user_id',
            key: 'action',
            align: 'right',
            render: (user_id: string) => (
                <Link to={`/users/${user_id}`} >
                    <Button type="text" icon={<EditOutlined />}>Details</Button>
                </Link>
            )
        }
    ];

    return (
        <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
            <Card title="Users" style={{ maxWidth: 1280, width: "100%" }} >
                <Table loading={loading} scroll={{ x: 1200 }} dataSource={users} columns={columns} />
            </Card>
        </div>
    )
}

export default UsersPage