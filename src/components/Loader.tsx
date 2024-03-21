import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader: React.FC = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin color="blue" />
    </div>
  );
};
export default Loader;
