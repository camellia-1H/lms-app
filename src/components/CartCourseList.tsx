import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import CartCourse from "./CartCourse";
import { Autoplay } from "swiper/modules";

export default function CartCourseList() {
  return (
    <div className="w-full mt-28">
      <Swiper
        slidesPerView={4}
        autoplay={{
          delay: 4000,
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
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
        <SwiperSlide>
          <CartCourse />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
