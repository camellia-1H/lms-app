import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CartCourse from './CartCourse';
import { Autoplay } from 'swiper/modules';
import { useScanAllCoursesMutation } from '../redux/coursesApi';
import { useEffect, useState } from 'react';
import { LIMIT_DATA_QUERY } from '../constants/common';

export default function CartCourseList() {
  const [listCourses, setListCourses] = useState<any[]>([]);
  const [scanCourses, { isSuccess }] = useScanAllCoursesMutation();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await scanCourses({
        lastEvaluatedKey: undefined,
        limit: 4,
      }).unwrap();
      setListCourses([...listCourses, ...data.courses]);
      // setLastEvaluatedKey(data.lastEvaluatedKey);
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full mt-28">
      {isSuccess && (
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
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {listCourses.map((course) => (
            <SwiperSlide key={course.courseID}>
              <CartCourse course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
