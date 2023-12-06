import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Button from "../../ReusableComponents/Button";
import ReusableForm from "../../ReusableComponents/Form";
import "../../../styles/ChurchAdmin.css";
import bible from "../../../Assets/bible.jpeg";

const Events = () => {

  const navigate = useNavigate();

  const handleDivClick = () => {
    navigate("/churches/22");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey");
  };

  const formFields = [
    { name: "name", label: "name", type: "text" },
    { name: "location", label: "location", type: "text" },
    { name: "date", label: "year", type: "date" },
    { name: "description", label: "description", type: "textfield" },
    { name: "poster", label: "poster", type: "file" },
    {
      name: "select a church",
      label: "Select an option",
      type: "select",
      options: ["murera", "muataifa", "mukuyu"],
    },
  ];
  
  return (
    <div className="dashboard-churches-container">
      <div className="church-cards-container">
        <div className="church-card" onClick={handleDivClick}>
          <div className="card-image">
            <img src={bible} alt="church backgroud" />
          </div>
          <div className="card-body">
            <h2 className="card-title">pefa darasha</h2>
            <p className="card-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              eveniet dolorem itaque illo dignissimos et distinctio quod ad
              soluta facere ullam cupiditate possimus ea deleniti enim, qui,
              odio laudantium molestiae!
            </p>
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
      </div>
      <div className="church-form-container">
        <h3>Add an Event</h3>
      <ReusableForm onSubmit={handleSubmit} fields={formFields} />
      </div>
    </div>
  );
};

export default Events;
