import { FC } from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const CoursesPage: FC = () => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
        img: "https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f",
      },
    ],
  });

  return (
    <div>
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full px-6">
          <h1 className="text-white font-bold text-4xl">Course</h1>
        </div>
        <div>
          <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      [
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white text-blue-700 shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                      ].join(" ")
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-2">
                {Object.values(categories).map((posts, idx) => (
                  // <Tab.Panel
                  //   key={idx}
                  //   className={[
                  //     "rounded-xl bg-white p-3",
                  //     "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  //   ].join(" ")}
                  // >

                  <Swiper>
                    <SwiperSlide></SwiperSlide>
                  </Swiper>

                  // <ul className="flex">
                  //   {posts.map((post) => (
                  //     <li
                  //       key={post.id}
                  //       className="relative rounded-md p-3 hover:bg-gray-100"
                  //     >
                  //       <img
                  //         src={post.img}
                  //         alt=""
                  //         className="rounded-lg h-40 w-56"
                  //       />
                  //       <h3 className="text-sm font-medium leading-5">
                  //         {post.title}
                  //       </h3>

                  //       <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                  //         <li>{post.date}</li>
                  //         <li>&middot;</li>
                  //         <li>{post.commentCount} comments</li>
                  //         <li>&middot;</li>
                  //         <li>{post.shareCount} shares</li>
                  //       </ul>

                  //       <a
                  //         href="#"
                  //         className={[
                  //           "absolute inset-0 rounded-md",
                  //           "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
                  //         ].join(" ")}
                  //       />
                  //     </li>
                  //   ))}
                  // </ul>
                  // </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
