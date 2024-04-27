import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetailPage: FC = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      CourseDetailPage Page
      <button
        onClick={() => navigate(`/courses/${courseID}/draft`)}
        className="text-red-600"
      >
        Draft
      </button>
    </div>
  );
};

export default CourseDetailPage;
