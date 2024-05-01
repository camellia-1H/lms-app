import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { CourseChapter } from '../../models/CourseChapter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface ChaptersListProps {
  listChapters: CourseChapter[];
  onReorder: (updateData: { chapterID: string; position: number }[]) => void;
  onEdit: (chapterID: string) => void;
}

export const ChaptersList = ({
  listChapters,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(listChapters);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(listChapters);
  }, [listChapters]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const listChapters = Array.from(chapters);
    const [reorderedItem] = listChapters.splice(result.source.index, 1);
    listChapters.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = listChapters.slice(startIndex, endIndex + 1);

    setChapters(listChapters);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      chapterID: chapter.chapterID,
      position: listChapters.findIndex(
        (item) => item.chapterID === chapter.chapterID
      ),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6"
          >
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.chapterID}
                draggableId={chapter.chapterID}
                index={index}
              >
                {(provided) => (
                  <div
                    className={[
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm ',
                      chapter.isPublished
                        ? ''
                        : 'bg-sky-100 border-sky-200 text-sky-700',
                    ].join('')}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={[
                        'px-2 py-3 border-r-4 border-r-red-300 bg-red-200 hover:bg-red-300 rounded-l-md transition ',
                        chapter.isPublished &&
                          'border-r-sky-200 hover:bg-sky-200',
                      ].join('')}
                      {...provided.dragHandleProps}
                    >
                      <br className="h-5 w-5" />
                    </div>
                    <div className="flex flex-1 justify-between">
                      <span>{chapter.chapterTitle}</span>
                      <div className="pr-2 flex gap-x-2">
                        {/* {chapter.isFree && <span className="text-red">Free</span>} */}
                        <div>
                          {chapter.isPublished ? (
                            'Published'
                          ) : (
                            <FontAwesomeIcon
                              icon={faLock}
                              className="h-4 w-4 mr-2"
                            />
                          )}
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => onEdit(chapter.chapterID)}
                            className="text-blue-500 cursor-pointer hover:opacity-75"
                          >
                            Edit
                          </button>
                          <button
                            // onClick={() => onEdit(chapter.chapterID)}
                            className="ml-2 text-red-500 cursor-pointer hover:opacity-75"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
