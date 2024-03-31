import * as z from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWater } from '@fortawesome/free-solid-svg-icons';
import { TitleForm } from '../components/CourseCreate/TitleForm';
import { DescriptionForm } from '../components/CourseCreate/DescriptionForm';
import { ImageForm } from '../components/CourseCreate/ImageForm';
import { CategoryForm } from '../components/CourseCreate/CategoryForm';
import { PriceForm } from '../components/CourseCreate/PriceForm';

// interface Course {
//   title: string;
//   description: string;
//   imageUrl: string;
//   price: string;
//   categoryId: string;
//   chapter: any;
// }

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

// const requiredFields: Course[] = [
//   course.title,
//   course.description,
//   course.imageUrl,
//   course.price,
//   course.categoryId,
//   course.chapters.some((chapter) => chapter.isPublished),
// ];

// const totalFields = requiredFields.length;
const totalFields = 5;
//
// const completedFields = requiredFields.filter(Boolean).length;

// const completionText = `(${completedFields}/${totalFields})`;

// const isComplete = requiredFields.every(Boolean);

const CourseCreatePage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  // const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post("/api/courses", values);
      navigate('/courses/course_id/create');
      // router.push(`/teacher/courses/${response.data.id}`);
      // toast.success("Course created");
    } catch {
      // toast.error("Something went wrong");
    }
  };

  return (
    <div className="">
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Create Course
          </h1>
        </div>
      </div>
      <div className="flex flex-col lg:px-32 md:px-20 sm:px-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-bold">Course setup</h1>
            <span className="text-base text-slate-700">
              Complete all fields 1/6
            </span>
          </div>
          {/* <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon
                icon={faWater}
                className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
              />
              <h2 className="text-xl font-bold">Customize your course</h2>
            </div>
            <TitleForm initialData={{ title: 'Title hay' }} courseId={'is'} />
            <DescriptionForm
              initialData={{ description: 'Description hay' }}
              courseId={'is'}
            />
            <ImageForm initialData={{ imageUrl: '' }} courseId={'id'} />
            <CategoryForm />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faPencil} />
                <h2 className="text-xl">Course chapters</h2>
                <div>
                  TODOOOO
                  <Link to={'/courses/create/chapter'}>Create Chapter</Link>
                </div>
              </div>
              {/* <ChaptersForm initialData={course} courseId={course.id} /> */}
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faPencil} />
                <h2 className="text-xl font-bold">Sell your course</h2>
              </div>
              <PriceForm initialData={{ price: 100 }} courseId={'is'} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faPencil} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              {/* <AttachmentForm initialData={course} courseId={course.id} /> */}
            </div>
          </div>
        </div>
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form> */}
      </div>
    </div>
  );
};

export default CourseCreatePage;
