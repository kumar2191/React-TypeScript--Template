import React, { useState } from "react";
import { Card } from "primereact/card";
import { useUserContext } from "../context/userAuth.Context";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useUserContext();

  const initialFormDataValues = {
    username: user.username,
    email: user.email,
    password: "",
    bio: "",
    country: "India",
    state: "",
    city: "",
  };

  // Initialize form data state
  const [formData, setFormData] = useState(initialFormDataValues);
  let navigate = useNavigate();

  // Handle onchange event for input elements
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);

    // set back to initial state
    setFormData(initialFormDataValues);
    if (user.admin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const updateProfile = (formData) => {
    console.log("Updating profile...");
    console.log("Form Data:", formData);
  };

  return (
    <div className="m-8">
      <Card title={`Profile of ${user.username}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Name:</label>
            <InputText
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="enter username"
            />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Email:</label>
            <InputText
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="enter email"
            />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Bio:</label>
            <InputTextarea
              name="bio"
              value={formData.bio}
              onChange={handleOnChange}
              placeholder="user bio"
            />
            <p className="text-xs">
              You can @mention other users and organizations to link to them.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">Country:</label>
              <InputText
                name="country"
                value={formData.country}
                onChange={handleOnChange}
                placeholder="country"
              />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">State:</label>
              <InputText
                name="state"
                value={formData.state}
                onChange={handleOnChange}
                placeholder="state"
              />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">City:</label>
              <InputText
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                placeholder="city"
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
