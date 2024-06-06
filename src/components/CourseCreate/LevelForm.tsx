import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { levelList } from '../../constants/data-master';

interface levelItem {
  levelID: string;
  levelType: string;
  checked?: boolean;
}

interface LevelProps {
  initialData: {
    level: string[];
  };
  courseID: string;
}

// const userID = 'userID1';
const obj: any = {};

export const LevelForm = ({ initialData, courseID }: LevelProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const initialLevel = initialData.level.map((level: any) => {
    console.log(level);

    return {
      levelID: level.levelID,
      levelType: level.levelType,
    };
  });
  const [checkedList, setCheckedList] = useState<levelItem[]>(initialLevel);

  checkedList.forEach((item) => {
    obj[item.levelID] = true;
  });

  levelList.forEach((level: any) => {
    level['checked'] = false;
    if (obj[level.levelID] === true) {
      level['checked'] = true;
    }
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  console.log(checkedList);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!checkedList.length) {
        toast.error('Must least one level');
      }
      await updateCourse({
        userID: user.userID,
        courseID,
        level: checkedList.map((item) => `${item.levelType}`),
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
          {checkedList.map((level) => (
            <span
              key={level.levelID}
              className="text-sm mr-2 font-bold text-red-600"
            >
              {level.levelID.split('#')[1]}
            </span>
          ))}
        </div>
      )}

      {isEditing && (
        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 mt-4">
          <div className="mt-6 py-3 border-t-2">
            <div>
              {levelList.map((level) => (
                <div
                  key={level.levelID.split('#')[1]}
                  className="flex items-center"
                >
                  {/* {/* <div key={price.priceID} className="flex items-center"> */}
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
                      console.log(levelList);

                      level.checked = e.target.checked;
                      const newCheckedList = checkedList.filter(
                        (levelCheck: any) => !levelCheck.levelID
                      );
                      setCheckedList([...newCheckedList, level]);
                    }}
                  />
                  {/* <input
                    type="checkbox"
                    name=""
                    id={level.levelID.split('#')[1]}
                    className="w-4 h-4 mr-2"
                    checked={level.checked}
                    onChange={(e) => {
                      level.checked = e.target.checked;
                      if (level.checked) {
                        setCheckedList([...checkedList, level]);
                      } else {
                        const newCheckedList = checkedList.filter(
                          (levelCheck: levelItem) =>
                            levelCheck.levelID !== level.levelID
                        );
                        obj[level.levelID] = false;
                        setCheckedList(newCheckedList);
                      }
                    }}
                  /> */}
                  <label htmlFor={level.levelID.split('#')[1]}>
                    {level.levelID.split('#')[1]}
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
