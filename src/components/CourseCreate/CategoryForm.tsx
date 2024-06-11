import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { categoryList } from '../../constants/data-master';
import { COURSE_STATUS, ROLE_USER } from '../../constants/common';

interface categoryItem {
  categoryID: string;
  checked?: boolean;
}

interface CategoryFormProps {
  initialData: {
    category: string[];
  };
  courseID: string;
  courseData: any;
}

// const userID = 'userID1';
const obj: any = {};

export const CategoryForm = ({
  initialData,
  courseID,
  courseData,
}: CategoryFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const initialCategory = initialData.category.map((cate) => {
    return {
      categoryID: cate,
    };
  });
  const [checkedList, setCheckedList] =
    useState<categoryItem[]>(initialCategory);

  checkedList.forEach((item) => {
    obj[item.categoryID] = true;
  });

  categoryList.forEach((category) => {
    category['checked'] = false;
    if (obj[category.categoryID] === true) {
      category['checked'] = true;
    }
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!checkedList.length) {
        toast.error('Must least one Category');
      }
      await updateCourse({
        userID: courseData.userID,
        courseID,
        category: checkedList.map((item) => `${item.categoryID}`),
        updatedAt: generateTime(),
      }).unwrap();
      toast.success('Course updated');
      toggleEdit();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </button>
      </div>
      {!isEditing && !checkedList.length ? (
        <p className="text-sm mt-2">Select Category</p>
      ) : (
        <div>
          {checkedList.map((category) => (
            <span
              key={category.categoryID}
              className="text-sm mr-2 font-bold text-red-600"
            >
              {category.categoryID.split('#')[1].replaceAll('_', ' ')}
            </span>
          ))}
        </div>
      )}

      {isEditing && (
        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 mt-4">
          <div className="mt-6 py-3 border-t-2">
            <div>
              {categoryList.map((category) => (
                <div
                  key={category.categoryID.split('#')[1]}
                  className="flex items-center"
                >
                  <input
                    disabled={
                      (user.role as string).startsWith(ROLE_USER.RGV) &&
                      courseData.courseStatus === COURSE_STATUS.PUBLIC
                    }
                    type="checkbox"
                    name=""
                    id={category.categoryID.split('#')[1]}
                    className="w-4 h-4 mr-2"
                    checked={category.checked}
                    onChange={(e) => {
                      category.checked = e.target.checked;
                      if (category.checked) {
                        setCheckedList([...checkedList, category]);
                      } else {
                        const newCheckedList = checkedList.filter(
                          (categoryCheck: categoryItem) =>
                            categoryCheck.categoryID !== category.categoryID
                        );
                        obj[category.categoryID] = false;
                        setCheckedList(newCheckedList);
                      }
                    }}
                  />
                  <label htmlFor={category.categoryID.split('#')[1]}>
                    {category.categoryID.split('#')[1]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              disabled={
                isLoading ||
                ((user.role as string).startsWith(ROLE_USER.RGV) &&
                  courseData.courseStatus === COURSE_STATUS.PUBLIC)
              }
              type="submit"
              className={[
                isLoading ||
                ((user.role as string).startsWith(ROLE_USER.RGV) &&
                  courseData.courseStatus === COURSE_STATUS.PUBLIC)
                  ? 'bg-gray-500/70 '
                  : 'cursor-pointer hover:bg-black bg-blue-500 ',
                'px-3 py-2 rounded-lg text-white font-bold',
              ].join('')}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
