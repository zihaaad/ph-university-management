import {Button, Row} from "antd";
import {useLoginMutation} from "../redux/features/auth/authApi";
import {useAppDispatch} from "../redux/hooks";
import {TUser, setUser} from "../redux/features/auth/authSlice";
import {verifyToken} from "../utils/verifyToken";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: {id: string; password: string}) => {
    console.log(data);
    const toastId = toast.loading("Logging In");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      toast.success("Logged In Successfully", {id: toastId, duration: 2000});
      dispatch(setUser({user: user, token: res.data.accessToken}));
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went Wrong", {id: toastId, duration: 2000});
    }
  };
  return (
    <Row justify="center" align="middle" style={{height: "100vh"}}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label="ID:" />
        <PHInput type="password" name="password" label="Password:" />
        <Button htmlType="submit" style={{marginTop: "5px"}}>
          Login
        </Button>
      </PHForm>
    </Row>
  );
};

export default Login;
