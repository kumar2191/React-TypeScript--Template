import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ImSpinner2 className="animate-spin h-8 w-8"/>
    </div>
  );
};

export default Loading;
