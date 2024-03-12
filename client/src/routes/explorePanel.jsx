import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../config";
import { Card } from "primereact/card";

const ExplorePanel = () => {
  const { id } = useParams();

  const [symptoms, setSymptoms] = useState({});

  console.log(symptoms);

  const [userSymptoms, setUserSymptoms] = useState([]);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const imageTemplate = (item) => {
    if (item.type === "image") {
      return (
        <div
          className="p-5 border border-gray-200 shadow-sm flex justify-center items-center gap-2 rounded-lg m-2"
          style={{ height: "350px" }}
        >
          <img
            src={item.url}
            alt={item.alt}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      );
    } else if (item.type === "video") {
      const videoId = item.url.split("/").pop().split("?")[0];
      return (
        <div
          key={item.id}
          className="p-5 border border-gray-200 shadow-sm flex justify-center items-center gap-2 rounded-lg m-2"
          style={{ height: "350px" }}
        >
          <iframe
            width="560"
            height="250"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            title={`Video ${item.id}`}
            className="rounded-lg"
          />
        </div>
      );
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(URL + `diseases/${id}`, {
          withCredentials: true,
          headers: {
            accept: "application/json",
            token: token,
          },
        });

        console.log(response.data.data);
        setSymptoms(response.data.data);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    fetchData();
  }, [id]);

  const pushValueIntoState = (value) => {
    setUserSymptoms((prevState) => {
      const isValueInState = prevState.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      );

      if (isValueInState) {
        const updatedState = prevState.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        );
        return updatedState;
      } else {
        const updatedState = [...prevState, value];
        return updatedState;
      }
    });
  };

  const handelClick = () => {
    toast.success("Thanks For Visiting");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="m-5">
      {Object.keys(symptoms).length > 0 && (
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col flex-wrap gap-3">
            {/* symptoms */}
            <div className="flex gap-1 mb-4">
              <p className="font-semibold text-lg underline underline-offset-8">
                Symptoms of
              </p>
              <p className="capitalize font-semibold text-lg text-indigo-500 underline underline-offset-8">
                {symptoms.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {symptoms.symptoms.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className={`hover:bg-indigo-500 hover:text-white cursor-pointer ${
                      userSymptoms.includes(item)
                        ? "bg-indigo-500 text-white font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      pushValueIntoState(item);
                    }}
                  >
                    {item}
                  </Card>
                );
              })}
            </div>

            {/* treatment videos */}
            <div className="flex gap-1 mb-4">
              <p className="font-semibold text-lg underline underline-offset-8">
                Treatment videos for
              </p>
              <p className="capitalize font-semibold text-lg text-indigo-500 underline underline-offset-8">
                {symptoms.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {symptoms.treatment.video.map((item, index) => {
                let videoId = item.split("/").pop().split("?")[0];
                return (
                  <div key={index}>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allowFullScreen
                      title="YouTube Video"
                      className="rounded-lg"
                    />
                  </div>
                );
              })}
            </div>

            {/* preventions */}
            <div className="flex gap-1 mb-4">
              <p className="font-semibold text-lg underline underline-offset-8">
                Prevention Images and Videos for
              </p>
              <p className="capitalize font-semibold text-lg text-indigo-500 underline underline-offset-8">
                {symptoms.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <Carousel
                value={[
                  ...symptoms.prevention.image.map((url, index) => ({
                    url,
                    type: "image",
                    id: index,
                  })),
                  ...symptoms.prevention.video.map((url, index) => ({
                    url,
                    type: "video",
                    id: index,
                  })),
                ]}
                numVisible={2}
                numScroll={2}
                responsiveOptions={responsiveOptions}
                itemTemplate={imageTemplate}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handelClick}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ExplorePanel;
