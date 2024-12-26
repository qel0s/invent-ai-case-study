import { ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Menu } from "antd"
import { Link, Outlet } from "react-router";
import "./style.scss"

const RootLayout = () => {

    const items = [
        {
            label: <Link to="/" >Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="/books" >Books</Link>,
            key: 'books',
            icon: <ReadOutlined />,
        }
    ];


    return (
        <>
            <div className="root-layout" style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card style={{ maxWidth: 1280, width: "100%" }} >
                    <Menu  mode="horizontal" items={items} />
                </Card>
            </div>


            <Outlet />
        </>
    )
}

export default RootLayout