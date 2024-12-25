import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Table, TableColumnsType } from "antd"
import { Link } from "react-router";


const BooksPage = () => {

  const dataSource = [
    {
      id: '1',
      name: 'The Great Gatsby',
    },
    {
      id: '2',
      name: 'To Kill a Mockingbird',
    },
    {
      id: '3',
      name: '1984',
    },
    {
      id: '4',
      name: 'Pride and Prejudice',
    },
    {
      id: '5',
      name: 'The Catcher in the Rye',
    },
    {
      id: '6',
      name: 'Moby-Dick',
    },
    {
      id: '7',
      name: 'War and Peace',
    },
    {
      id: '8',
      name: 'The Odyssey',
    },
    {
      id: '9',
      name: 'Crime and Punishment',
    },
    {
      id: '10',
      name: 'Brave New World',
    },
    {
      id: '11',
      name: 'The Lord of the Rings',
    },
    {
      id: '12',
      name: 'Ulysses',
    },
    {
      id: '13',
      name: 'The Brothers Karamazov',
    },
    {
      id: '14',
      name: 'The Picture of Dorian Gray',
    },
    {
      id: '15',
      name: 'Wuthering Heights',
    },
    {
      id: '16',
      name: 'The Hobbit',
    },
    {
      id: '17',
      name: 'Frankenstein',
    },
    {
      id: '18',
      name: 'Dracula',
    },
    {
      id: '19',
      name: 'Fahrenheit 451',
    },
    {
      id: '20',
      name: 'The Divine Comedy',
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
          <Link to={`/books/${id}`} >
              <Button type="text" icon={<EditOutlined />}>Details</Button>
          </Link>
      )
    }
  ];

  return (
    <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
      <Card title="Books" style={{ maxWidth: 1280, width: "100%" }} >
        <Table scroll={{ x: 1200 }} dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  )
}

export default BooksPage