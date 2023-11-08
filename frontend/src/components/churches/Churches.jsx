import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChurches } from "../../redux/Churches/churches";
import ChurchComponent from "../ReusableComponents/ChurchComponent";
import { fetchEvents } from "../../redux/Events/events";
import "../../styles/churches.css";

const Churches = () => {
  const dispatch = useDispatch();
  const churchesData = useSelector((state) => state.churches);
  console.log("Component re-rendered");
  useEffect(() => {
      dispatch(getChurches());
      dispatch(fetchEvents())
      
  }, [dispatch,churchesData.churches]);

  
  console.log(useSelector((state) => state));
  
  return (
    <div className="card-container">
      {
        churchesData.churches.map((church) => (
          <ChurchComponent id={church.id} />
        ))
      }
    </div>
  );
};

export default Churches;
