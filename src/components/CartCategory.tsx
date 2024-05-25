import { Link } from 'react-router-dom';

const CartCategory = ({ category }: { category: any }) => {
  return (
    <Link to={'/'} className="block w-full">
      <div className="h-[320px] relative">
        <div className="h-full">
          <img
            src={category.categoryImg}
            alt=""
            className="block object-cover h-full rounded-2xl"
          />
        </div>

        <div className="absolute bottom-10 left-3 flex flex-col">
          <strong className="lg:text-xl sm:text-lg text-white line-clamp-1">
            {(category.categoryID.split('#')[1] as string).replaceAll('_', ' ')}
          </strong>
        </div>
      </div>
    </Link>
  );
};
export default CartCategory;
