import {Layout, Menu, theme} from "antd";
import {Outlet} from "react-router-dom";
import {adminSidebarItems} from "../../routes/admin.routes";
const {Content, Header, Sider} = Layout;

const MainLayout = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  return (
    <Layout style={{height: "100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
        <div
          style={{
            color: "white",
            height: "5rem",
            textAlign: "center",
            display: "grid",
            placeContent: "center",
            borderBottom: "1px solid gray",
          }}>
          <h3>PH University Management System</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{marginTop: "10px"}}
          defaultSelectedKeys={["4"]}
          items={adminSidebarItems}
        />
      </Sider>
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
