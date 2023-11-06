import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChurch } from "../../../redux/Churches/churches";

const AddChurch = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "cc",
    about: "dd",
    location: "cc",
    founding_year: 2001,
    description_1: "hellow",
    description_2: "heyyooh",
    description_3: "gelow",
    background_image_1: null,
    background_image_2: null,
    background_image_3: null,
    mission: "eew",
    vision: "js",
    slogan: "kskks",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    formData[name] = files[0]; // Directly update the formData state
    setFormData({ ...formData }); // Trigger a re-render
  };

  const handleSubmit = () => {
    dispatch(addChurch(formData));
  };

  return (
    <div>
      <h2>Add a Church</h2>
      <form encType="multipart/form-data">
        {/* ... (other form elements) */}
        <div>
          <label>Background Image 1:</label>
          <input
            type="file"
            name="background_image_1"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Background Image 2:</label>
          <input
            type="file"
            name="background_image_2"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Background Image 3:</label>
          <input
            type="file"
            name="background_image_3"
            onChange={handleFileChange}
          />
        </div>
        {/* ... (other form elements) */}
        <div>
          <button type="button" onClick={handleSubmit}>
            Add Church
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChurch;
