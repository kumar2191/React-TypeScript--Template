import { useUserContext } from "../context/userAuth.Context";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "primereact/button";
import scope from "../assets/scope.jpg";
import pill from "../assets/pill.jpg";
import meditation from "../assets/meditation.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUserContext();
  let navigate = useNavigate();
  const exploreHandler = () => {
    if (!user) {
      navigate("/login");
      window.location.reload();
    } else {
      navigate("/explore");
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg m-5 h-auto">
      <p className="text-black font-semibold p-5">
        Welcome{" "}
        <span className="text-indigo-500">
          {user
            ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
            : "Guest"}
        </span>
        ,
      </p>
      <div className="flex justify-center gap-[6rem] h-[500px] p-5">
        <div className="flex flex-col justify-center gap-3 w-5/12">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere sed
            sapiente, et fuga perferendis illo ipsum rem perspiciatis placeat
            quia, saepe illum, dolorum consequatur dolore quasi saepe provident
            iste cumque voluptate rerum sint repudiandae voluptates laboriosam
            placeat soluta animi. Sunt, repellendus.
          </p>
          <div className="flex items-center gap-3">
            <Button
              label="Let's go!!"
              onClick={exploreHandler}
              className="flex justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            ></Button>
            <p className="flex items-center gap-3 text-indigo-500">
              to continue
              <FaArrowRight className="text-indigo-500" />
            </p>
          </div>
        </div>
        <div className="relative w-5/12 flex items-center justify-center">
          <img
            src={scope}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute lg:top-[-4rem] md:top-0 left-0"
          />
          <img
            src={pill}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute lg:top-[3rem] md:top-[5rem] right-0"
          />
          <img
            src={meditation}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute bottom-0 left-[6rem] md:left-[2rem]"
          />
        </div>
      </div>

      {/* <p className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">User history</p> */}
    </div>
  );
};

export default Home;
