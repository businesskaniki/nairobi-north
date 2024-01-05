import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { fetchSermons, addSermon } from "../../../redux/Sermons/sermons";
import Button from "../../ReusableComponents/Button";
import "../../../styles/ChurchAdmin.css";

const Sermons = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: "",
    scripture_references: "",
    description: "",
    audio_file: "",
    image: "",
    video: "",
    church: "",
  });

  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.churches);
  const sermons = useSelector((state) => state.sermons.sermons);
  const loading = useSelector((state) => state.churches.loading);
  const err = useSelector((state) => state.addchurch.error);

  useEffect(() => {
    if (!sermons.length) {
      dispatch(fetchSermons());
    }
  }, [dispatch, sermons.length]);

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
    dispatch(addSermon(formData))
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
        {sermons.map((sermon) => (
          <div className="sermon-card" onClick={handleDivClick}>
            <div className="card-image">
              <img src={sermon.background_image_1} alt="sermon backgroud" />
            </div>
            <div className="card-body">
              <h2 className="card-title">{sermon.name}</h2>
              <p className="card-description">{sermon.about}</p>
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
        <h3>Add a Sermon</h3>
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <div className="formgroup">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              type="name"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="Sermon title"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="preacher">
              Preacher
            </label>
            <input
              placeholder="preacher"
              id="preacher"
              name="preacher"
              value={formData.preacher}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="date">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              placeholder="date in (yyyy-mm-DD)format"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="scripture_references">
              scripture references
            </label>
            <input
              type="text"
              id="scripture_references"
              name="scripture_references"
              value={formData.scripture_references}
              onChange={handleChange}
              className="input"
              placeholder="scripture references"
              required
            />
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description">
              description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              placeholder="description text"
              required
            />
          </div>

          <div className="formgroup">
            <label className="labe" htmlFor="audio_file">
              audio file
            </label>
            <input
              type="file"
              id="audio_file"
              name="audio_file"
              onChange={handleFileChange}
              className="input"
              placeholder="audio_file"
            />
          </div>
          <div className="formgroup">
            <label className="labe" htmlFor="image">
              image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good image"
            />
          </div>
          <div className="formgroup">
            <label className="labe" htmlFor="video">
              video
            </label>
            <input
              type="file"
              id="video"
              name="video"
              onChange={handleFileChange}
              className="input"
              placeholder="video"
            />
          </div>

          <div className="formgroup">
            <label className="label" htmlFor="church">
              Church
            </label>
            <select
              name="church"
              id="church"
              className="input"
              required
              onChange={handleChange}
            >
              <option value="">Which church does the image belong</option>
              {churches.map((church) => (
                <option key={church.id} value={church.id}>
                  {church.name}
                </option>
              ))}
            </select>
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

export default Sermons;
