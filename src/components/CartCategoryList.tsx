import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CartCategory from './CartCategory';
import { Autoplay } from 'swiper/modules';
import { useGetListCategoryMasterQuery } from '../redux/coursesApi';

export default function CartCategoryList() {
  const {
    data: listCategoryMaster,
    isSuccess,
    isLoading,
  } = useGetListCategoryMasterQuery();
  return (
    <div className="w-full mt-28">
      {isLoading && <div> Loading.............</div>}
      {isSuccess && (
        <Swiper
          slidesPerView={4}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}
          // loop={true}
          // modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {isSuccess &&
            listCategoryMaster.categories.map((category: any) => (
              <SwiperSlide key={category.categoryID}>
                <CartCategory category={category} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}
