export interface CourseChapter {
  chapterID: string;
  courseID: string;
  chapterTitle: string;
  chapterDescription: string;
  chapterVideoUrl: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;

  muxData?: MuxData;
}

interface MuxData {
  muxId: string;
  assetId: string;
  playbackId?: String;

  chapterID: string;
}
