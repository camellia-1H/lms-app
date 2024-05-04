import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { getModules, getFormats, modules } from './QuillUtils';

const props = { withImage: true, withHeaders: true };

export const QuillEditor = ({
  value,
  setDescriptionDetail,
}: {
  value: string;
  setDescriptionDetail: (value: string) => void;
}) => {
  return (
    <>
      <ReactQuill
        theme="snow"
        onChange={(value) => setDescriptionDetail(value)}
        value={value}
        modules={{
          ...modules,
          toolbar: getModules(props),
        }}
        formats={getFormats(props)}
        placeholder="Describe course detail..."
      />
    </>
  );
};
