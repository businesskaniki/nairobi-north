import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { addChurch, getChurches } from "../../../redux/Churches/churches";
import Button from "../../ReusableComponents/Button";
import "../../../styles/ChurchAdmin.css";

const ChurchAdmin = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    location: "",
    founding_year: "",
    description_1: "",
    description_2: "",
    description_3: "",
    background_image_1: "",
    background_image_2: "",
    background_image_3: "",
    mission: "",
    vision: "",
    slogan: "",
  });

  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.churches);
  const loading = useSelector((state) => state.churches.loading);
  const err = useSelector((state) => state.addchurch.error);

  useEffect(() => {
    if (!churches.length) {
      dispatch(getChurches());
    }
  }, [dispatch, churches]);

  const navigate = useNavigate();

  const handleDivClick = () => {
    navigate("/churches/22");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const files = e.target.files[0];
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addChurch(formData))
      .then(() => {
        setFormData("");
        setSubmitStatus("success");
      })
      .catch(() => {
        setSubmitStatus("error");
      });
  };

  useEffect(() => {
    if (submitStatus === "success") {
      toast.success("Form submitted successfully!");
    } else if (submitStatus === "error") {
      toast.error("Failed to submit form");
    }
  }, [submitStatus]);
  return (
    <div className="dashboard-churches-container">
      <div className="church-cards-container">
        {churches.map((church) => (
          <div className="church-card" onClick={handleDivClick}>
            <div className="card-image">
              <img src={church.background_image_1} alt="church backgroud" />
            </div>
            <div className="card-body">
              <h2 className="card-title">{church.name}</h2>
              <p className="card-description">{church.about}</p>
              <div className="card-footer">
                <Button
                  children={"delete"}
                  icon={<MdDelete />}
                  className={"deletebtn"}
                />
                <Button
                  children={"edit"}
                  style={{ backgroundColor: "skyblue" }}
                  icon={<GrUpdate />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="church-form-container">
        <h3>Add a new Church</h3>
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <div className="formgroup">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="church name"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="about">
              About
            </label>
            <textarea
              placeholder="About"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
              placeholder="church location"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="founding_year">
              founding_year
            </label>
            <input
              type="text"
              id="founding_year"
              name="founding_year"
              value={formData.founding_year}
              onChange={handleChange}
              className="input"
              placeholder="founding year"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_1">
              description_1
            </label>
            <input
              type="text"
              id="description_1"
              name="description_1"
              value={formData.description_1}
              onChange={handleChange}
              className="input"
              placeholder="a small description text"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_2">
              description_2
            </label>
            <input
              type="text"
              id="description_2"
              name="description_2"
              value={formData.description_2}
              onChange={handleChange}
              className="input"
              placeholder="a small description text"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_3">
              description_3
            </label>
            <input
              type="text"
              id="description_3"
              name="description_3"
              value={formData.description_3}
              onChange={handleChange}
              className="input"
              placeholder="a small description text"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="background_image_1">
              background_image_1
            </label>
            <input
              type="file"
              id="background_image_1"
              name="background_image_1"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good background image"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="background_image_2">
              background_image_2
            </label>
            <input
              type="file"
              id="background_image_2"
              name="background_image_2"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good background image"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="background_image_3">
              background_image_3
            </label>
            <input
              type="file"
              id="background_image_3"
              name="background_image_3"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good background image"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="mission">
              mission
            </label>
            <input
              type="text"
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              className="input"
              placeholder="enter the church mission"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="vision">
              vision
            </label>
            <input
              type="text"
              id="vision"
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              className="input"
              placeholder="enter the church vision"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="slogan">
              slogan
            </label>
            <input
              type="text"
              id="slogan"
              name="slogan"
              value={formData.slogan}
              onChange={handleChange}
              className="input"
              placeholder="Enter the church slogan"
              required
            />
          </div>

          <Button
            children={"submit"}
            type={"submit"}
            icon={<IoIosAddCircle />}
          />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ChurchAdmin;
