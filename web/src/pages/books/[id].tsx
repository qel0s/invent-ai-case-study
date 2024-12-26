import { UserOutlined } from "@ant-design/icons";
import { Card, Skeleton, Tooltip } from "antd"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../plugins/axios";
import { toast } from "react-toastify";


const BooksDetailPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [id]);

    const getData = (id: any) => {
        setLoading(true);
        axiosInstance.get(`/books/${id}`)
            .then((response) => {
                if (response?.data) {
                    setBook(response.data);
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || 'Something went wrong when getting book details');
            })
            .finally(() => { setLoading(false); });
    }

    return (
        <>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card title="Book Details" style={{ maxWidth: 1280, width: "100%" }} >
                    {
                        loading ? <Skeleton active /> : <>
                            <p><b>ID:</b> {book?.book_id}</p>
                            <p><b>Name:</b> {book?.title}</p>
                            <p><b>Author:</b> {book?.author}</p>
                            {!!book?.currentOwner && <p><b>Current Owner:</b> {book?.currentOwner?.first_name} {book?.currentOwner?.last_name}  <Tooltip title="Go To User Detail" ><Link to={`/users/${book?.currentOwner?.user_id}`} ><UserOutlined /></Link></Tooltip></p>}
                            <p><b>Average Score:</b> {book?.averageRating == 0 ? 0 : book?.averageRating || "Not rated yet"}</p>
                        </>
                    }
                </Card>
            </div>
        </>
    )
}

export default BooksDetailPage