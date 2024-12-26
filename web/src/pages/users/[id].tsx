
import { Card, Table, TableColumnsType, Tooltip } from "antd"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../plugins/axios";
import dayjs from "dayjs";

const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [currentlyBorrowedBooks, setCurrentlyBorrowedBooks] = useState([]);
    const [previouslyBorrowedBooks, setPreviouslyBorrowedBooks] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosInstance.get(`/users/${id}`)
                .then((response) => {
                    if (response?.data) {
                        setUser(response?.data?.user);
                        setCurrentlyBorrowedBooks(response?.data?.borrowed_books?.filter((book: any) => !book?.return_date));
                        setPreviouslyBorrowedBooks(response?.data?.borrowed_books?.filter((book: any) => !!book?.return_date));
                    }


                })
                .catch((error) => {
                    if (error?.response?.data?.message === 'User not found') {
                        console.log('User not found');
                        navigate('/');
                    }
                })
                .finally(() => { setLoading(false); });
        }

    }, [id]);


    const currentBorrowedColumns: TableColumnsType = [
        {
            title: 'ID',
            dataIndex: 'book_id',
            key: 'book_id',
        },
        {
            title: 'Name',
            dataIndex: 'book_title',
            key: 'book_title',
        },
        {
            title: 'Author',
            dataIndex: 'book_author',
            key: 'book_author',
        },
        {
            title: 'Bool Published Year',
            dataIndex: 'book_published_year',
            key: 'book_published_year',
        },
        {
            title: 'Borrow Date',
            dataIndex: 'borrow_date',
            key: 'borrow_date',
            render: (date: string) => new Date(date).toLocaleDateString()
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
            dataIndex: 'book_id',
            key: 'book_id',
        },
        {
            title: 'Name',
            dataIndex: 'book_title',
            key: 'book_title',
        },
        {
            title: 'Author',
            dataIndex: 'book_author',
            key: 'book_author',
        },
        {
            title: 'Bool Published Year',
            dataIndex: 'book_published_year',
            key: 'book_published_year',
        },
        {
            title: 'Borrow Date',
            dataIndex: 'borrow_date',
            key: 'borrow_date',
            render: (date: string) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Return Date',
            dataIndex: 'return_date',
            key: 'return_date',
            render: (date: string) => new Date(date).toLocaleDateString()
        },
        {
            title: 'User Score',
            dataIndex: 'book_rating',
            key: 'book_rating',
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
                    <p><b>ID:</b> {user?.user_id}</p>
                    <p><b>Name:</b> {user?.first_name} {user?.last_name}</p>
                    <p><b>E-mail:</b> {user?.email}</p>
                    <p><b>Registration Date:</b> {new Date(user?.registration_date).toLocaleDateString()}</p>
                </Card>
            </div>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Current Borrowed Books" style={{ maxWidth: 1280, width: "100%" }} >
                    <Table loading={loading} scroll={{ x: 1200 }} dataSource={currentlyBorrowedBooks || []} columns={currentBorrowedColumns} />
                </Card>
            </div>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Previously Borrowed Books" style={{ maxWidth: 1280, width: "100%" }} >
                    <Table loading={loading} scroll={{ x: 1200 }} dataSource={previouslyBorrowedBooks || []} columns={previouslyBorrowedColumns} />
                </Card>
            </div>
        </>
    )
}

export default UserDetailPage