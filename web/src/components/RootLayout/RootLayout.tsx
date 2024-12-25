import { ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Menu, MenuProps } from "antd"
import { useState } from "react";
import { Link, Outlet } from "react-router";


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

    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <>
            <div style={{ margin: 16, display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Card style={{ maxWidth: 1280, width: "100%" }} >
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </Card>
            </div>


            <Outlet />
        </>
    )
}

export default RootLayout