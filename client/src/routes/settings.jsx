import React, { useState } from "react";
import { Card } from "primereact/card";
import { useUserContext } from "../context/userAuth.Context";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Settings = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const initialFormDataValues = {
    username: user.username,
    email: user.email,
    bio: "",
    country: "India",
    state: "",
    city: "",
    image: "", // Include image in the initial state
  };

  const [formData, setFormData] = useState(initialFormDataValues);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Convert the image to base64 and include it in form data
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (passwordMatch !== formData.password) {
    //   toast.error("Password do not match enter correct password!!");
    //   return;
    // } else {
    // }
    try {
      const response = await updateProfile(formData);
      console.log("Update response:", response.data);
      toast.success("Updated successfully");
      setFormData(initialFormDataValues);
      setPasswordMatch("");
      setImageFile(null); // Reset the image file state after submission
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

    const response = await axios.put(
      `http://localhost:5000/api/v1/users/${user._id}`,
      formData
    );

    return response;
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
      <Card title={`Profile of ${user.username}`}>
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

          {/* <div className="mt-5 flex flex-col gap-3 border border-red-500 rounded-lg p-5">
            <p className="pb-2 font-semibold text-lg text-red-400 underline underline-offset-[9px]">
              Danger Zone :
            </p>

            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">Password:</label>
              <Password
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter password"
                toggleMask
              />
            </div>

            <div className="flex flex-col gap-3 pb-5">
              <label className="font-semibold">Confirm Password:</label>
              <Password
                name="confirmPassword"
                value={passwordMatch}
                onChange={(e) => setPasswordMatch(e.target.value)}
                placeholder="Confirm password"
                toggleMask
                feedback={false}
                tabIndex={1}
              />

              {passwordMatch && formData.password !== passwordMatch && (
                <small className="text-red-500">Passwords do not match</small>
              )}
            </div>
          </div> */}

          {/* Image upload field */}
          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold">Profile Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
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
