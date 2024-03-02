import {ReactNode} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import {Navigate} from "react-router-dom";
import {verifyToken} from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({children, role}: TProtectedRouteProps) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token as string);
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
