import {Button, Layout, theme} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import {useAppDispatch} from "../../redux/hooks";
import {logout} from "../../redux/features/auth/authSlice";
const {Content, Header} = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            textAlign: "end",
            padding: 0,
            background: colorBgContainer,
          }}>
          <Button
            style={{marginRight: "1rem"}}
            onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Header>
        <Content style={{margin: "24px 16px"}}>
          <div
            style={{
              padding: 24,
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
