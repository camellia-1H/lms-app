import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CartCourse: React.FC = () => {
  return (
    <Link to={"/courses"} className="block w-full ">
      <div className="w-full">
        <div>
          <img
            src="https://demos.wplms.io/main/wp-content/uploads/2023/06/c2.jpg"
            alt=""
            className="rounded-xl"
          />
        </div>
        <div>
          <div>
            <h1 className="font-semibold">Learn Bard</h1>
            <h2 className="text-gray-500">Category</h2>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMarker} />
              <h3 className="">10 chapters</h3>
            </div>
            <div className="flex">
              <p>
                <s>123$</s>
              </p>
              <p className="ml-3">100$</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CartCourse;
