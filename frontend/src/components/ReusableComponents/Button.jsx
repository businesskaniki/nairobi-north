import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, buttonType, children, hover,className,icon, style, ...rest }) => {
  const buttonStyles = {
    padding: "14px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    bordertopleftradius: "5px",
    bordertoprightradius: "5px",
    borderbottomrightradius: "5px",
    borderbottomleftradius: "5px",
    fontsize: "1em",
    transition: 'transform 0.3s, background-color 0.3s',
    ...style,
  };
  const pstyles = {
    fontsize: ".85em",
    fontstyle: "normal",
    lineheight: 1,
    texttransform: "uppercase",
    fontfamily: "Poppins",
    fontweight: 500,
    letterspacing: "0.2em",
    color: "#060507",
    display:"flex",
    alignItems:"center",
    justifycontent:"space-between",
    gap:"5px",
  };
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={className}
      style={{ ...buttonStyles }}
      {...rest}
    >
      <p style={{ ...pstyles }}>
        {children}
        {icon}
      </p>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Button.defaultProps = {
  buttonType: "button",
  className: "",
  style: {},
};

export default Button; 