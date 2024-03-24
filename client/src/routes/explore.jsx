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
        {diseases.map((item) => {
          console.log(item?.name, "xdfcghjkm");
          let img = item?.name === "dengue fever" ? "https://www.remedieslabs.com/blog/wp-content/uploads/2022/09/dengue-fever-symptoms-causes-preventions-and-treatment-scaled.jpg" : item?.name === "heart attack" ?
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Blausen_0463_HeartAttack.png/640px-Blausen_0463_HeartAttack.png" : item?.name === "diabetes" ? "https://myhealth-redcliffelabs.redcliffelabs.com/media/blogcard-images/3724/ea850eb3-c623-4a6e-91f5-1f5224eb9170.webp" : "https://www.livelaw.in/h-upload/2020/03/11/371113-covid.jpg"
          return (
            <div key={item._id} onClick={() => {
              handlePanel(item._id)
              // console.log(img, item?.name, "ghjkl;");
            }}>
              <Card
                title={item.name}
                header={<img alt="Card" src={img} className="w-[270px] h-[250px]" />}
                className="cursor-pointer hover:bg-slate-400 hover:text-white capitalize"
              ></Card>
            </div>
          )
        })}
      </div>
    </div >
  );
};

export default Explore;
