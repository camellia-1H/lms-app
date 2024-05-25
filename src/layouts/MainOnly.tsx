import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainOnlyLayout: FC<Props> = (props) => {
  return (
    <div className="w-full">
      <main className="flex-1">{props.children}</main>
    </div>
  );
};

export default MainOnlyLayout;
