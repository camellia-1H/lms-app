import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { levelList as levelCourse } from '../../constants/data-master';

interface LevelProps {
  initialData: {
    level: string;
  };
  courseID: string;
}

// const userID = 'userID1';
const obj: any = {};

//   { levelID: 'levelID#All_Levels', levelType: 'all_level' },
const levelList = levelCourse.filter(
  (level) => level.levelID !== 'levelID#All_Levels'
);

export const LevelForm = ({ initialData, courseID }: LevelProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const initialLevel = { levelType: initialData?.level, checked: true };
  const [checkedList, setCheckedList] = useState<any[]>([initialLevel]);

  checkedList.forEach((item) => {
    obj[item.levelType] = true;
  });
  console.log('checkedList', checkedList);

  useEffect(() => {
    levelList.forEach((level: any) => {
      level['checked'] = false;
      if (obj[level.levelType] === true) {
        level['checked'] = true;
      }
    });
  }, []);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  console.log(levelList);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!checkedList.length) {
        toast.error('Must least one level');
      }
      await updateCourse({
        userID: user.userID,
        courseID,
        level: checkedList[0].levelType,
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
        Course Level
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
        <p className="text-sm mt-2">Select Level</p>
      ) : (
        <div>
          {checkedList.map((item) => (
            <span className="text-sm mr-2 font-bold text-red-600">
              {typeof item.levelType === 'string' &&
                item.levelType
                  .replace(/^\w/, (c: any) => c.toUpperCase())
                  .replaceAll('_', ' ')}
            </span>
          ))}
        </div>
      )}

      {isEditing && (
        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 mt-4">
          <div className="mt-6 py-3 border-t-2">
            <div>
              {levelList.map((level) => (
                <div key={level.levelType} className="flex items-center">
                  <input
                    type="radio"
                    id={level.levelID.split('#')[1]}
                    name={level.levelID}
                    checked={level.checked}
                    className="w-4 h-4 mr-2"
                    onChange={(e) => {
                      levelList.map((level) => {
                        level.checked = false;
                      });

                      level.checked = e.target.checked;

                      const newCheckedList = checkedList.filter(
                        (levelCheck: any) => !levelCheck.levelType
                      );
                      setCheckedList([...newCheckedList, level]);
                    }}
                  />
                  <label
                    htmlFor={level.levelID.split('#')[1].replaceAll('_', ' ')}
                  >
                    {level.levelID.split('#')[1].replaceAll('_', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              disabled={isLoading}
              type="submit"
              className={[
                isLoading
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
