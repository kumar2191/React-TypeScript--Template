import React, { useState } from "react";
import { Card } from "primereact/card";
import { useUserContext } from "../context/userAuth.Context";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

const Settings = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const initialFormDataValues = {
    username: user.name,
    email: user.email,
    bio: "",
    country: "India",
    state: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialFormDataValues);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData);
      console.log("Update response:", response.data);
      toast.success("Updated successfully");
      setFormData(initialFormDataValues);
      setTimeout(() => {
        if (user.admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      toast.error("Error updating profile:", error);
    }
  };

  const updateProfile = async (formData) => {
    console.log(`Updating ${user._id}...`);
    console.log("Form Data:", formData);

    // const response = await axios.put(
    //   `http://localhost:5000/api/users/upprofile/${user._id}`,
    //   formData
    // );

    // return response;
  };

  return (
    <div className="m-8">
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Card title={`Profile of ${user.name}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Name:</label>
            <InputText
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Email:</label>
            <InputText
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Bio:</label>
            <InputTextarea
              name="bio"
              value={formData.bio}
              onChange={handleOnChange}
              placeholder="User bio"
            />
            <p className="text-xs">
              You can @mention other users and organizations to link to them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">Country:</label>
              <InputText
                name="country"
                value={formData.country}
                onChange={handleOnChange}
                placeholder="Country"
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">State:</label>
              <InputText
                name="state"
                value={formData.state}
                onChange={handleOnChange}
                placeholder="State"
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">City:</label>
              <InputText
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                placeholder="City"
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            label="Update Profile"
            className="mt-5 flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          />
        </form>
      </Card>
    </div>
  );
};

export default Settings;
