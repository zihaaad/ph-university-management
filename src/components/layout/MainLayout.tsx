import {Layout, theme} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
const {Content, Header} = Layout;

const MainLayout = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  return (
    <Layout style={{height: "100vh"}}>
      <Sidebar />
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}} />
        <Content style={{margin: "24px 16px 0"}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
