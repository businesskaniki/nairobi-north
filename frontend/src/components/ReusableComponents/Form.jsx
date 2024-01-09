import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Button from "../../components/ReusableComponents/Button";
import "../../styles/form.css";

const ReusableForm = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      {fields.map((field) => (
        <div key={field.name} className="formgroup">
          <label className="label" htmlFor={field.name}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              placeholder={field.name}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="input"
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="input"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              placeholder={field.name}
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="input"
            />
          )}
        </div>
      ))}
      <Button onClick={onSubmit} children={"submit"} type={"submit"} icon={<IoIosAddCircle />} />
    </form>
  );
};

export default ReusableForm;
