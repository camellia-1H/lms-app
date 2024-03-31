import { FC, ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = (props) => {
  return (
    // lg:px-60 md:px-20 sm:px-20
    <div className="w-full relative">
      <Header />
      <main className="mt-24 h-[1500px] flex-1">{props.children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
