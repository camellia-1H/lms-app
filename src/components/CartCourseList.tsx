import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CartCourse from './CartCourse';
import { Autoplay } from 'swiper/modules';
import {
  useGetListCoursesMutation,
  useScanAllCoursesMutation,
} from '../redux/coursesApi';
import { useEffect, useState } from 'react';

export default function CartCourseList({ authorID }: { authorID?: string }) {
  const [listCourses, setListCourses] = useState<any[]>([]);
  const [getListCourses, { isSuccess: isSuccessGetListCourses }] =
    useGetListCoursesMutation();
  // const [listCourseOfUser, setCourses] = useState<Course[]>([]);

  const [scanCourses, { isSuccess }] = useScanAllCoursesMutation();
  const fetchCourses = async () => {
    if (authorID) {
      const data = await getListCourses({
        userID: authorID,
        lastEvaluatedKey: undefined,
        limit: 3,
      }).unwrap();
      setListCourses(data.courses);
    } else {
      const data = await scanCourses({
        lastEvaluatedKey: undefined,
        limit: 4,
      }).unwrap();
      setListCourses([...listCourses, ...data.courses]);
      // setLastEvaluatedKey(data.lastEvaluatedKey);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      {(isSuccess || isSuccessGetListCourses) && (
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
              slidesPerView: 2,
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
