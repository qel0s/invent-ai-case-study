import { UserOutlined } from "@ant-design/icons";
import { Card, Table, TableColumnsType, Tooltip } from "antd"
import { Link } from "react-router";

const UserDetailPage = () => {

    const currentlyBorrowedDataSource = [
        {
            id: '6',
            name: 'Moby-Dick',
        }
    ];

    const previouslyBorrowedDataSource = [
        { id: '1', name: 'The Great Gatsby', userScore: 1 },
        { id: '2', name: 'To Kill a Mockingbird', userScore: 4 },
        { id: '3', name: '1984', userScore: 8 },
        { id: '4', name: 'Pride and Prejudice', userScore: 2 },
        { id: '5', name: 'The Catcher in the Rye', userScore: 7 },
        { id: '7', name: 'War and Peace', userScore: 10 },
        { id: '8', name: 'The Odyssey', userScore: 9 },
        { id: '9', name: 'Crime and Punishment', userScore: 10 },
        { id: '10', name: 'Brave New World', userScore: 9 },
        { id: '11', name: 'The Lord of the Rings', userScore: 7 },
        { id: '12', name: 'Ulysses', userScore: 8 },
        { id: '13', name: 'The Brothers Karamazov', userScore: 3 },
        { id: '14', name: 'The Picture of Dorian Gray', userScore: 7 },
        { id: '15', name: 'Wuthering Heights', userScore: 5 },
        { id: '16', name: 'The Hobbit', userScore: 2 },
        { id: '17', name: 'Frankenstein', userScore: 10 },
        { id: '18', name: 'Dracula', userScore: 9 },
        { id: '19', name: 'Fahrenheit 451', userScore: 2 },
        { id: '20', name: 'The Divine Comedy', userScore: 9 }
    ];


    const currentBorrowedColumns: TableColumnsType = [
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
                <a href={`/users/${id}`}>View</a>
            )
        }
    ];

    const previouslyBorrowedColumns: TableColumnsType = [
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
            title: 'User Score',
            dataIndex: 'userScore',
            key: 'userScore',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'action',
            align: 'right',
            render: (id: string) => (
                <a href={`/users/${id}`}>View</a>
            )
        }
    ];

    return (
        <>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="User" style={{ maxWidth: 1280, width: "100%" }} >
                    <p><b>ID:</b> 12312</p>
                    <p><b>Name:</b> Batuhan Yılmaz</p>
                </Card>
            </div>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Current Borrowed Books" style={{ maxWidth: 1280, width: "100%" }} >
                    <Table scroll={{ x: 1200 }} dataSource={currentlyBorrowedDataSource} columns={currentBorrowedColumns} />
                </Card>
            </div>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Previously Borrowed Books" style={{ maxWidth: 1280, width: "100%" }} >
                    <Table scroll={{ x: 1200 }} dataSource={previouslyBorrowedDataSource} columns={previouslyBorrowedColumns} />
                </Card>
            </div>
        </>
    )
}

export default UserDetailPage