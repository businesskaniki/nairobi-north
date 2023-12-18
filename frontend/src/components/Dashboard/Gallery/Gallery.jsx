import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { getImages,addImage } from "../../../redux/Images/images";
import Button from "../../ReusableComponents/Button";
import "../../../styles/ChurchAdmin.css";

const Gallery = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    description: "",
    ministries: "",
    church: "",
  });

  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.churches);
  const ministries = useSelector((state) => state.ministries.ministries);
  const images = useSelector((state) => state.images.images)
  const loading = useSelector((state) => state.churches.loading);
  const err = useSelector((state) => state.addchurch.error);
  console.log(ministries);

  useEffect(() => {
    if (!images.length) {
      dispatch(getImages());
    }
  }, [dispatch,images]);

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
    console.log(formData)
    dispatch(addImage(formData))
      .then(() => {
        setFormData("");
        setSubmitStatus("success");
      })
      .catch(() => {
        setSubmitStatus("error");
      });
  };

  console.log(formData)


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
        {images.map((image) => (
          <div className="church-card" onClick={handleDivClick}>
            <div className="card-image">
              <img src={image.image} alt="church backgroud" />
            </div>
            <div className="card-body">
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
        <h3>Add a new image</h3>
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
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
              <option value="">Which church does the image belong</option>
              {churches.map((church) => (
                <option value={church.id}  >
                  {church.name}
                </option>
              ))}
            </select>
          </div>
          <div className="formgroup">
            <label className="label" htmlFor="description_2">
              ministry
            </label>
            <select name="ministries" id="ministries" className="input" required onChange={handleChange}>
              <option value="">Which ministry does the image belong</option>
              {ministries.map((ministry) => (
                <option value={ministry.id}  >
                  {ministries.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formgroup">
            <label className="label" htmlFor="image">
              background_image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="input"
              placeholder="select a good image"
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

export default Gallery;
