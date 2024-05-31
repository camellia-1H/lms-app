import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  accessToken: string;
  children: React.ReactNode;
};

const ProtectedRoute = ({ accessToken, children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/user/login');
    }
  }, [accessToken]);

  return children;
};

export default ProtectedRoute;
