import {Button} from "antd";
import {useForm} from "react-hook-form";
import {useLoginMutation} from "../redux/features/auth/authApi";
import {inputStyle} from "../styles/loginForm.styles";

const Login = () => {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const [login, {data}] = useLoginMutation();
  console.log(data);

  const onSubmit = (data: {id: string; password: string}) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
  };
  return (
    <form
      style={{width: "50vw", margin: "1rem auto"}}
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">User ID:</label>
        <input style={inputStyle} type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input style={inputStyle} id="password" {...register("password")} />
      </div>{" "}
      <Button htmlType="submit" style={{marginTop: "5px"}}>
        Login
      </Button>
    </form>
  );
};

export default Login;
