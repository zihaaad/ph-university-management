import {Layout, Menu, MenuProps, theme} from "antd";
import {Outlet} from "react-router-dom";
const {Content, Footer, Header, Sider} = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Dashboard",
  },
  {
    key: "10",
    label: "Profile",
  },
  {
    key: "100",
    label: "User Management",
    children: [
      {
        key: "1000",
        label: "Create Admin",
      },
      {
        key: "10000",
        label: "Create Student",
      },
      {
        key: "100000",
        label: "Create Faculty",
      },
    ],
  },
];

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
          items={items}
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
        <Footer style={{textAlign: "center"}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
