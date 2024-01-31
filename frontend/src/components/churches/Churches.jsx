import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChurches } from "../../redux/Churches/churches";
import ChurchComponent from "../ReusableComponents/ChurchComponent";
import Loading from "../ReusableComponents/Loading";
import "../../styles/churches.css";

const Churches = () => {
  const dispatch = useDispatch();
  const churchesData = useSelector((state) => state.churches);
  console.log(churchesData);

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  if (churchesData.loading) {
    return <Loading />;
  }

  return (
    <div className="churches-container">
      {churchesData.churches.map((church) => (
        <ChurchComponent description={church.about} title={church.name} key={church.id} id={church.id} image={church.background_image_1} />
      ))}
    </div>
  );
};

export default Churches;
