import { FC, ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

const MainOnlyLayout: FC<Props> = (props) => {
  return (
    <div className="w-full max-h-full flex bg-blue-50">
      {/* <Sidebar /> */}
      <main className="flex-1 justify-center">{props.children}</main>
    </div>
  );
};

export default MainOnlyLayout;
