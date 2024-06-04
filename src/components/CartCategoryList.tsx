import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import CartCategory from './CartCategory';
import { categoryList } from '../constants/data-master';

export default function CartCategoryList() {
  return (
    <div className="w-full mt-28">
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
        {categoryList.map((category: any) => (
          <SwiperSlide key={category.categoryID}>
            <CartCategory category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
