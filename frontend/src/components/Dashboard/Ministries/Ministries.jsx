import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { fetchMinistries,addMinistry } from "../../../redux/Ministries/ministries";
import Button from "../../ReusableComponents/Button";
import "../../../styles/ChurchAdmin.css";

const Ministries = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    background_text: "",
    description: "",
    background_image: "",
    church: "",
  });

  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.churches);
  const ministries = useSelector((state) => state.ministries.ministries);
  const loading = useSelector((state) => state.churches.loading);
  const err = useSelector((state) => state.addchurch.error);

  useEffect(() => {
    if (!ministries.length) {
      dispatch(fetchMinistries());
    }
  }, [dispatch, ministries]);

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
    dispatch(addMinistry(formData))
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
        {ministries.map((event) => (
          <div className="church-card" onClick={handleDivClick}>
            <div className="card-image">
              <img src={event.background_image} alt="church backgroud" />
            </div>
            <div className="card-body">
              <h2 className="card-title">{event.name}</h2>
              <p className="card-description">{event.description}</p>
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
        <h3>Add a new Miistry</h3>
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
              placeholder="Ministry Name"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="background_text">
              background text
            </label>
            <input
              type="text"
              id="background_text"
              name="background_text"
              value={formData.background_text}
              onChange={handleChange}
              className="input"
              placeholder="Some word from the ministry"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description">
              description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              placeholder="Describe briefly the Ministry"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_2">
              Church
            </label>
            <select name="church" id="church" className="input" required onChange={handleChange}>
              <option value="">Which church does the ministry belong</option>
              {churches.map((church) => (
                <option value={church.id}  >
                  {church.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formgroup">
            <label className="label" htmlFor="background_image">
              background_image
            </label>
            <input
              type="file"
              id="background_image"
              name="background_image"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good background image"
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

export default Ministries;
