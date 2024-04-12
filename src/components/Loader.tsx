import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-400/80">
      <div className="absolute top-1/2 left-1/2">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          color="blue"
          className="text-5xl z-50"
        />
      </div>
    </div>
  );
};
export default Loader;
