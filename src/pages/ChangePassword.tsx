import {Button, Row} from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {toast} from "sonner";
import {useChangePasswordMutation} from "../redux/features/auth/authApi";
import {logout} from "../redux/features/auth/authSlice";
import {useAppDispatch} from "../redux/hooks";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
  const dipatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing Password ¯_(ツ)_/¯");
    try {
      const res = await changePassword(data).unwrap();
      if (res.success) {
        dipatch(logout());
        navigate(`/login`);
        toast.success(res.message, {id: toastId, duration: 2000});
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{height: "100vh"}}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="password" name="oldPassword" label="Old Password" />
          <PHInput type="password" name="newPassword" label="New Password:" />
          <Button htmlType="submit" style={{marginTop: "5px"}}>
            Login
          </Button>
        </PHForm>
      </Row>
    </div>
  );
};

export default ChangePassword;
