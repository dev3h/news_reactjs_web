import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import CardPostHeader from "@/components/CardPostHeader";

const Home = () => {
  return (
    <Row gutter={[16, 16]}>
      {[...Array(10)].map((_, index) => (
        <Col key={index} xl={6} sm={24} xs={24}>
          <Card
            title={<CardPostHeader />}
            bordered={false}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <h3 className=" line-clamp-3 text-justify font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex
              repudiandae porro alias veritatis, quam dolores cupiditate rerum deserunt,
              soluta sunt est adipisci voluptatibus itaque iste quia saepe dolorum amet!
            </h3>
            <div>
              <span>Oct 03. 5m read time</span>
              <img
                src="https://picsum.photos/1000/1000"
                alt=""
                className="w-full lg:h-[200px] h-[300px] object-cover rounded-md"
              />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Home;
