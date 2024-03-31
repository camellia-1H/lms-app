import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPencil, faWater } from '@fortawesome/free-solid-svg-icons';
import { Listbox, Transition } from '@headlessui/react';

interface categoryItem {
  categoryID: string;
  categoryName: string;
  checked: boolean;
}

// interface CategoryFormProps {
//   initialData: {
//     title: string;
//   };
//   courseId: string;
// }

const formSchema = z.object({
  // title: z.string().min(1, {
  //   message: 'Title is required',
  // }),
});
const categoryList = [
  { categoryID: 'categoryID1', categoryName: 'Creative', checked: false },
  { categoryID: 'categoryID2', categoryName: 'Legal', checked: false },
  { categoryID: 'categoryID3', categoryName: 'Technical', checked: false },
  { categoryID: 'categoryID4', categoryName: 'Design', checked: false },
  { categoryID: 'categoryID5', categoryName: 'Education', checked: false },
  { categoryID: 'categoryID6', categoryName: 'Soft Skill', checked: false },
];

export const CategoryForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [checkedList, setCheckedList] = useState<categoryItem[]>([]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: '',
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //   await axios.patch(`/api/courses/${courseId}`, values);
      //   toast.success('Course updated');
      toggleEdit();
      //   router.refresh();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Catetgory
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
              {category.categoryName}
            </span>
          ))}
        </div>
      )}

      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="mt-6 py-3 border-t-2">
            <div>
              {categoryList.map((category) => (
                <div key={category.categoryName} className="flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id={category.categoryName}
                    className="w-4 h-4 mr-2"
                    checked={category.checked}
                    onChange={(e) => {
                      category.checked = e.target.checked;
                      if (category.checked) {
                        setCheckedList([...checkedList, category]);
                      } else {
                        const newCheckedList = checkedList.filter(
                          (categoryCheck: categoryItem) =>
                            categoryCheck.categoryName !== category.categoryName
                        );
                        setCheckedList(newCheckedList);
                      }
                    }}
                  />
                  <label htmlFor={category.categoryName}>
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="px-3 py-2 rounded-lg text-white font-bold hover:bg-black bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
