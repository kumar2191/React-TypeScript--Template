import { useEffect, useState } from "react";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";

const Explore = () => {
  const [diseases, setDiseases] = useState([]);

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
                  <Card key={index}>
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
                {disease.treatment.map((treatment, index) => (
                  <li key={index}>
                    <a href={treatment.imageOrVideo}>
                      <Card className="text-xs text-blue-600">
                        <p className="py-2 font-semibold capitalize">
                          {treatment.type} for your problem!!
                        </p>
                        <br /> Page will navigate to your solution!!{" "}
                        <i className="pi pi-arrow-up-right"></i>
                      </Card>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold underline underline-offset-4">Prevention:</h5>
              <ul className="flex flex-wrap gap-2 my-4">
                {disease.prevention.map((prevention, index) => (
                  <li key={index}>
                    {prevention.type === "image" ? (
                      <Card>
                        <img
                          src={prevention.imageOrVideo}
                          alt="Prevention Image"
                          className="w-[500px] h-[300px] rounded-lg"
                        />
                      </Card>
                    ) : (
                      <a href={prevention.imageOrVideo}>
                        <Card className="text-xs text-blue-600">
                          <p className="py-2 font-semibold capitalize">
                            {prevention.type} for your problem!!
                          </p>
                          <br /> Page will navigate to your solution!!{" "}
                          <i className="pi pi-arrow-up-right"></i>
                        </Card>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default Explore;
