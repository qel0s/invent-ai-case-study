
import { Button, Card, Input, Modal, Space, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../plugins/axios";
import { toast } from 'react-toastify';
import { EditOutlined } from "@ant-design/icons";

const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [currentlyBorrowedBooks, setCurrentlyBorrowedBooks] = useState([]);
    const [previouslyBorrowedBooks, setPreviouslyBorrowedBooks] = useState([]);

    const [loading, setLoading] = useState(false);
    const [returnLoading, setReturnLoading] = useState<any>(false);

    const [score, setScore] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<any>(false);

    useEffect(() => {
        if (id) {
            getData(id);
        }

    }, [id]);

    const getData = (id: any, returnBook?: boolean) => {
        setLoading(true);
        axiosInstance.get(`/users/${id}`)
            .then((response) => {
                if (response?.data) {
                    setUser(response?.data?.user);
                    setCurrentlyBorrowedBooks(response?.data?.borrowed_books?.filter((book: any) => !book?.return_date));
                    setPreviouslyBorrowedBooks(response?.data?.borrowed_books?.filter((book: any) => !!book?.return_date));
                    setReturnLoading(false);
                    setScore("");
                    setIsModalOpen(false);
                    if (returnBook) {
                        toast.success('Book returned successfully !');
                    }
                }


            })
            .catch((error) => {
                if (error?.response?.data?.message === 'User not found') {
                    toast.error(error?.response?.data?.message || 'User not found');
                    console.log('User not found');
                    navigate('/');
                } else {
                    toast.error(error?.response?.data?.message || 'Something went wrong when getting user details');
                }
            })
            .finally(() => { setLoading(false); });
    }

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
            dataIndex: 'book_id',
            key: 'book_id',
            align: 'right',
            render: (book_id: string) => (

                <Space>
                    <Link to={`/books/${book_id}`} >
                        <Button type="text" icon={<EditOutlined />}>Details</Button>
                    </Link>
                    <Button
                        disabled={returnLoading == book_id}
                        loading={returnLoading == book_id}
                        danger
                        onClick={() => {
                            setIsModalOpen(book_id)
                        }}
                    >
                        Return Book
                    </Button>

                </Space>

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
            dataIndex: 'book_id',
            key: 'book_id',
            align: 'right',
            render: (book_id: string) => (
                <Link to={`/books/${book_id}`} >
                    <Button type="text" icon={<EditOutlined />}>Details</Button>
                </Link>
            )
        }
    ];

    const returnBook = (book_id: string) => {
        setReturnLoading(id);
        axiosInstance.post(`users/${user?.user_id}/return/${book_id}`, {
            rating: score
        })
            .then(() => {
                getData(id, true);
            })
            .catch((error) => {
                console.log(error);
                setReturnLoading(false);
                setIsModalOpen(false);
                setScore("");
                toast.error(error?.response?.data?.message || 'Error returning book');
            })

    }


    const handleOk = () => {
        returnBook(isModalOpen);
    };
    const handleCancel = () => {
        if (!returnLoading || !loading) {
            setIsModalOpen(false);
            setScore("");
        }
    };

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
                    <Table rowKey={"book_id"} loading={loading} scroll={{ x: 1200 }} dataSource={currentlyBorrowedBooks || []} columns={currentBorrowedColumns} />
                </Card>
            </div>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Previously Borrowed Books" style={{ maxWidth: 1280, width: "100%" }} >
                    <Table rowKey={"book_id"} loading={loading || returnLoading} scroll={{ x: 1200 }} dataSource={previouslyBorrowedBooks || []} columns={previouslyBorrowedColumns} />
                </Card>
            </div>

            <Modal
                title="Return book"
                open={!!isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: !score || loading || returnLoading, loading: returnLoading }}
                cancelButtonProps={{ disabled: loading || returnLoading }}
            >
                <p>Enter Score</p>
                <Input
                    type="number"
                    placeholder="Enter score between 1-10"
                    value={score}
                    onChange={(e) => {

                        const number = parseInt(e.target.value)
                        if (number > 10 || number < 1) {
                            return
                        } else {
                            setScore(number + "")
                        }

                    }}
                    min={1}
                    max={10}
                />
            </Modal>

        </>
    )
}

export default UserDetailPage