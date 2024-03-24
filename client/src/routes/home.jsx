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
      if (user?.isAdmin) {
        return navigate("/admin");

      }
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
            At <span><b>Healthwise</b></span>, we're dedicated to helping you achieve your health and fitness
            goals through expert advice, practical tips, and personalized resources. Whether you're a seasoned fitness
            enthusiast or just beginning your wellness journey, our comprehensive platform has everything you need to succeed.
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
            src={"https://www.cyclinguk.org/sites/default/files/media-skyfish/CYCLINGUK00011.jpg"}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute lg:top-[-4rem] md:top-0 left-0"
          />
          <img
            src={"https://st2.depositphotos.com/26922084/43552/v/450/depositphotos_435525184-stock-illustration-women-exercising-in-the-gym.jpg"}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute lg:top-[3rem] md:top-[5rem] right-0"
          />
          {/* <img
            src={"https://www.india.com/wp-content/uploads/2018/03/Yoga-for-women.jpg"}
            alt=""
            className="md:w-[10rem] md:h-[12rem] lg:w-[20rem] lg:h-[20rem] rounded-lg absolute bottom-0 left-[6rem] md:left-[2rem]"
          /> */}
        </div>
      </div>

      {/* <p className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">User history</p> */}
    </div>
  );
};

export default Home;
