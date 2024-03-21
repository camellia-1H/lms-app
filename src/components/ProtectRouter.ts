import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { useEffect } from "react";

type Props = {
  user: User;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/login");
    }
  }, [user, user.accessToken]);

  return children;
};

export default ProtectedRoute;
