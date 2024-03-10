/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [diseases, setDiseases] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/diseases",
          {
            withCredentials: true,
          }
        );
        setDiseases(response.data.data);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    fetchDiseases();
  }, []);

  const handelClick = () => {
    toast.success("Thanks For Visiting")
    setTimeout(() => {
      navigate('/')
    }, 500);
  }
  const pushValueIntoState = (value) => {
    setSymptoms((prevState) => {
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

  return (
    <div className="card m-5">
      <TabView>
        {diseases.map((disease) => (
          <TabPanel
            key={disease._id}
            header={
              <p className="font-semibold text-[15px] text-black capitalize">
                {disease.name}
              </p>
            }
          >
            <div>
              <h5 className="font-semibold underline underline-offset-4">Symptoms:</h5>
              <ul className="flex flex-wrap gap-2 my-4">
                {disease.symptoms.map((symptom, index) => (
                  <Card key={index} onClick={() => {
                    pushValueIntoState(symptom);
                  }}
                    className={`cursor-pointer ${symptoms.includes(symptom) ? "bg-green-300" : ""}`}
                  >
                    <p className="text-[16px] font-medium text-gray-500">
                      {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                    </p>
                  </Card>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold underline underline-offset-4">Treatment:</h5>
              <ul className="flex flex-wrap gap-2 my-4">
                {disease.treatment.map((treatment, index) => {
                  const videoUrl = treatment.imageOrVideo;
                  let videoId = videoUrl.split("/").pop().split("?")[0];
                  return <li key={index}>
                    <a href={treatment.imageOrVideo}>
                      <Card className="text-xs text-blue-600">
                        {/* <p className="py-2 font-semibold capitalize">
                          {treatment.type} for your problem!!
                        </p>
                        <br /> Page will navigate to your solution!!{" "}
                        <i className="pi pi-arrow-up-right"></i> */}
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allowFullScreen
                          title="YouTube Video"
                        />
                      </Card>
                    </a>
                  </li>
                })}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold underline underline-offset-4">Prevention:</h5>
              <ul className="flex flex-wrap gap-2 my-4">
                {disease.prevention.map((prevention, index) => {
                  let videoId;
                  if (prevention.type === "video") {
                    const videoUrl = prevention.imageOrVideo;
                    videoId = videoUrl.split("/").pop().split("?")[0];
                  }

                  return <li key={index}>
                    {prevention.type === "image" ? (
                      <Card>
                        <img
                          src={prevention.imageOrVideo}
                          alt="Prevention Image"
                          className="w-[500px] h-[300px] rounded-lg"
                        />
                      </Card>
                    ) : (
                      // <a href={prevention.imageOrVideo}>
                      <Card className="text-xs text-blue-600">
                        {/* <p className="py-2 font-semibold capitalize">
                            {prevention.type} for your problem!!
                          </p>
                          <br /> Page will navigate to your solution!!{" "}
                          <i className="pi pi-arrow-up-right"></i> */}
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allowFullScreen
                          title="YouTube Video"
                        />
                      </Card>
                      // </a>
                    )}
                  </li>
                })}
              </ul>



            </div>
          </TabPanel>
        ))}
      </TabView>
      <div className="flex justify-end">
        <button
          onClick={handelClick}
          type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Submit
        </button>

      </div>
    </div>
  );
};

export default Explore;












