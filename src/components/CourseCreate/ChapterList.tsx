import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { CourseChapter } from '../../models/CourseChapter';

interface ChaptersListProps {
  items: CourseChapter[];
  onReorder: (updateData: { chapterID: string; position: number }[]) => void;
  onEdit: (chapterID: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      chapterID: chapter.chapterID,
      position: items.findIndex((item) => item.chapterID === chapter.chapterID),
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
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.chapterID}
                draggableId={chapter.chapterID}
                index={index}
              >
                {(provided) => (
                  <div
                    className={[
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                      chapter.isPublished &&
                        'bg-sky-100 border-sky-200 text-sky-700',
                    ].join('')}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={[
                        'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                        chapter.isPublished &&
                          'border-r-sky-200 hover:bg-sky-200',
                      ].join('')}
                      {...provided.dragHandleProps}
                    >
                      <br className="h-5 w-5" />
                    </div>
                    {chapter.chapterTitle}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <span className="text-red">Free</span>}
                      <div
                        className={[
                          'bg-slate-500',
                          chapter.isPublished && 'bg-sky-700',
                        ].join('')}
                      >
                        {chapter.isPublished ? 'Published' : 'Draft'}
                      </div>
                      <button
                        onClick={() => onEdit(chapter.chapterID)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
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
