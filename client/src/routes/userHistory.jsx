import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useUserContext } from "../context/userAuth.Context";

const UserHistory = () => {
  const { user } = useUserContext();
  const [history, setHistory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  let navigate = useNavigate();

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

  const diseasesTemplate = (rowData) => {
    return (
      <div>
        {rowData.diseasesId.name.charAt(0).toUpperCase() +
          rowData.diseasesId.name.slice(1)}
      </div>
    );
  };

  const handleEyeIconClick = (rowData) => {
    setSelectedSymptoms(rowData.symptom);
    setVisible(true);
  };

  const symptomsTemplate = (rowData) => {
    console.log(rowData);
    return (
      <>
        <i
          className="pi pi-eye text-orange-300"
          onClick={() => handleEyeIconClick(rowData)}
        ></i>
      </>
    );
  };

  const handleClick = () => {
    navigate("/");
  };
  function formatDate(date) {
    // Assuming 'date' is in ISO format or a valid Date object
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return (
    <div className="card m-5">
      <div className="my-5 text-center text-[1.25rem] font-semibold">
        <p>User symptoms history that user have suffered:</p>
      </div>

      <div className="border border-l-0 border-r-0 border-b-0 border-t-2 p-3">
        {/* user details */}
        <div>
          <>
            <p className="font-semibold text-[14px] text-indigo-500 mt-3 pb-3">
              User Details:
            </p>
            <div className="flex gap-2 pb-4">
              <label htmlFor="name" className="font-semibold">
                Name:
              </label>
              <p>{user.name}</p>
            </div>
            <div className="flex gap-2">
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <p>{user.email}</p>
            </div>
          </>
        </div>
      </div>
      <DataTable value={history}>
        {/* <Column header="User Details" /> */}
        <Column header="User Diseases" body={diseasesTemplate} />
        <Column header="Date of search" field="date"
          body={(rowData) => formatDate(rowData.date)}
        />
        <Column header="Symptoms history" body={symptomsTemplate} />
      </DataTable>

      <div className="card flex justify-content-center">
        <Dialog
          header="Symptoms"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: "50vw" }}
          modal
        >
          <div>
            <p className="font-semibold text-[14px] text-indigo-500 mt-3 pb-3">
              Symptoms history of user:
            </p>

            <div>
              {selectedSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="my-2 px-2 py-2 border border-l-0 border-r-0 border-b-2 border-t-0"
                >
                  <p>
                    {index + 1}.{" "}
                    {symptom.name.charAt(0).toUpperCase() +
                      symptom.name.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleClick}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default UserHistory;
