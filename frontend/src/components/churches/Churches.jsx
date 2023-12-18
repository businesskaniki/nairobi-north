import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChurches } from "../../redux/Churches/churches";
import ChurchComponent from "../ReusableComponents/ChurchComponent";
import { fetchEvents } from "../../redux/Events/events";
import Loading from "../ReusableComponents/Loading";
import "../../styles/churches.css";

const Churches = () => {
  const dispatch = useDispatch();
  const churchesData = useSelector((state) => state.churches);

  useEffect(() => {
    dispatch(getChurches());
    dispatch(fetchEvents());
  }, [dispatch]);


  if (churchesData.loading) {
    return <Loading />; // Show loading component while data is being fetched
  }

  return (
    <div className="card-container">
      <h2>Our churches</h2>
      {churchesData.churches.map((church) => (
        <ChurchComponent key={church.id} id={church.id} />
      ))}
    </div>
  );
};

export default Churches;
