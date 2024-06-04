import { Course } from '../../models/Course';
import SearchItem from './SearchItem';

const SearchList = ({
  listCourseQuery,
}: {
  listCourseQuery: Partial<Course>[];
}) => {
  // console.log('listCourseQuery', listCourseQuery);

  return (
    <div>
      {listCourseQuery.map((course) => (
        <SearchItem
          courseData={course}
          key={course.courseID?.concat(course.updatedAt as string)}
        />
      ))}
    </div>
  );
};
export default SearchList;
