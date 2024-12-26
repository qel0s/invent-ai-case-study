import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../../plugins/axios";


const BooksPage = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/books')
      .then((response) => { setBooks(response?.data || []); })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => { setLoading(false); });

  }, []);




  const columns: TableColumnsType = [
    {
      title: 'ID',
      dataIndex: 'book_id',
      key: 'book_id',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Rating Count',
      dataIndex: 'rating_count',
      key: 'rating_count',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'action',
      align: 'right',
      render: (id: string) => (
        <Link to={`/books/${id}`} >
          <Button type="text" icon={<EditOutlined />}>Details</Button>
        </Link>
      )
    }
  ];

  return (
    <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
      <Card title="Books" style={{ maxWidth: 1280, width: "100%" }} >
        <Table loading={loading} scroll={{ x: 1200 }} dataSource={books || []} columns={columns} />
      </Card>
    </div>
  )
}

export default BooksPage