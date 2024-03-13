import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const res = await axios.get(URL + "user/search/user/token", {
        withCredentials: true,
        headers: {
          accept: "application/json",
          token: token,
        },
      });

      setHistory(res.data.data);
    };

    fetchData();
  }, []);

  const handleClick =()=>{
    navigate("/")
  }

  return (
    <div className="card m-5">
      <div className="my-5 text-center text-[1.25rem] font-semibold">
        <p>User symptoms history that user have suffered:</p>
      </div>

      <div className="flex justify-center gap-[6rem] border border-l-0 border-r-0 border-b-0 border-t-2 p-8">
        {/* user details */}
        <div>
          {history.map((item) => {
            console.log(item);
            return (
              <>
                <p className="font-semibold text-[14px] text-indigo-500 pb-3">
                  User Details:
                </p>
                <div className="flex gap-2 pb-4">
                  <label htmlFor="name" className="font-semibold">
                    Name:
                  </label>
                  <p>{item.userId.name}</p>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="email" className="font-semibold">
                    Email:
                  </label>
                  <p>{item.userId.email}</p>
                </div>
              </>
            );
          })}
        </div>

        {/* diseases name */}
        <div>
          {history.map((item) => {
            return (
              <>
                <p className="font-semibold text-[14px] text-indigo-500 pb-3">
                  Diseases of user:
                </p>
                <div>
                  <p>
                    {item.diseasesId.name.charAt(0).toUpperCase() +
                      item.diseasesId.name.slice(1)}
                  </p>
                </div>
              </>
            );
          })}
        </div>

        {/* symptoms */}
        <div>
          {history.map((item) => {
            return (
              <>
                <p className="font-semibold text-[14px] text-indigo-500 pb-3">
                  Symptoms history of user:
                </p>

                <div>
                  {item.symptom.map((item, index) => {
                    return (
                      <>
                        <div className="my-2 px-2 py-2 border border-l-0 border-r-0 border-b-2 border-t-0">
                          <p>
                            {index + 1}.{" "}
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={handleClick}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default UserHistory;
