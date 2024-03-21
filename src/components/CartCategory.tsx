import { Link } from "react-router-dom";

const CartCategory: React.FC = () => {
  return (
    <Link to={"/"} className="block w-full ">
      <div className="w-full h-[320px] ">
        <div className="relative bg-[url('https://demos.wplms.io/main/wp-content/uploads/2023/06/ai-generated-7915551_640.jpg')] bg-cover h-full rounded-2xl">
          <div className="flex flex-col absolute bottom-10 left-5 ">
            <strong className="text-2xl text-white">Creative</strong>
            <span className="text-md font-medium text-gray-300/90">
              Colors &amp; Design
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CartCategory;
