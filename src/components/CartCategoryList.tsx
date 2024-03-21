import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import CartCategory from "./CartCategory";
import { Autoplay } from "swiper/modules";

export default function CartCategoryList() {
  return (
    <div className="w-full mt-28">
      <Swiper
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
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
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CartCategory />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
