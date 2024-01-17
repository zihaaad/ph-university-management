import {Layout, Menu, MenuProps, theme} from "antd";
import {NavLink, Outlet} from "react-router-dom";
const {Content, Footer, Header, Sider} = Layout;

const items: MenuProps["items"] = [
  {
    key: "dashboard",
    label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
  },
  {
    key: "user-management",
    label: "User Management",
    children: [
      {
        key: "create-admin",
        label: <NavLink to={"/admin/create-admin"}>Create Admin</NavLink>,
      },
      {
        key: "create-faculty",
        label: <NavLink to={"/admin/create-faculty"}>Create Faculty</NavLink>,
      },
      {
        key: "create-student",
        label: <NavLink to={"/admin/create-student"}>Create Student</NavLink>,
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
