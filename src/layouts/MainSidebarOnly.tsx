import { FC, ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
type Props = {
  children: ReactNode;
};

const MainSidebarLayout: FC<Props> = (props) => {
  return (
    <div className="w-full max-h-full flex justify-between px-12 py-4">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <main className="w-9/12 justify-center">{props.children}</main>
    </div>
  );
};

export default MainSidebarLayout;
