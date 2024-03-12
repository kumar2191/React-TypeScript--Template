import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [diseases, setDiseases] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(URL + "diseases", {
          withCredentials: true,
          headers: {
            accept: "application/json",
            token: token,
          },
        });

        console.log(response.data.data);
        setDiseases(response.data.data);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    fetchData();
  }, []);

  const handlePanel = (id) => {
    navigate(`/explore/${id}`);
  };

  return (
    <div className="m-5">
      <p className="text-center font-bold text-[22px] my-[50px]">Diseases panel:</p>
      <div className="card flex justify-center items-center gap-3 m-5">
        {diseases.map((item) => (
          <div key={item._id} onClick={() => handlePanel(item._id)}>
            <Card
              title={item.name}
              className="cursor-pointer hover:bg-indigo-500 hover:text-white capitalize"
            ></Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
