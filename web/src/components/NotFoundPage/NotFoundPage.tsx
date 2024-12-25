import { FrownOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"
import { Link } from "react-router"


const NotFoundPage = () => {
    return (
        <div style={{ width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} >
            <Card title="404" style={{ width: 500, height: 400, maxWidth: "100%" }} >
                <h1>Page Not Found</h1>
                <p>
                    Sorry, the page you are looking for does not exist.
                </p>
                <div style={{ display: "flex", flexFlow: "column", gap: 16 }} >
                    <FrownOutlined style={{ fontSize: 64, marginTop: 16 }} />
                    <Link to={"/"} >
                        <Button size="large" style={{ width: 120 }} >Go Home</Button>
                    </Link>
                </div>


            </Card>
        </div>
    )
}

export default NotFoundPage