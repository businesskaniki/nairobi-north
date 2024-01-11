import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { fetchEvents, addEvent } from "../../../redux/Events/events";
import Button from "../../ReusableComponents/Button";
import "../../../styles/ChurchAdmin.css";

const Events= () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    poster: "",
    church: "",
    date:""
  });

  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.churches);
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.churches.loading);
  const err = useSelector((state) => state.addchurch.error);

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events]);

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
    dispatch(addEvent(formData))
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
        {events.map((event) => (
          <div className="church-card" onClick={handleDivClick}>
            <div className="card-image">
              <img src={event.poster} alt="church backgroud" />
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
        <h3>Add a new Event</h3>
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
              placeholder="Event Name"
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
              placeholder="where is the event"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="date">
              event date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              placeholder="When is the event"
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
              placeholder="what is the event about"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_2">
              Church
            </label>
            <select name="church" id="church" className="input" required onChange={handleChange}>
              <option value="">select the church holding the event</option>
              {churches.map((church) => (
                <option value={church.id}  >
                  {church.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formgroup">
            <label className="label" htmlFor="poster">
              poster
            </label>
            <input
              type="file"
              id="poster"
              name="poster"
              onChange={handleFileChange}
              className="input"
              placeholder="add the event poster"
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

export default Events;
