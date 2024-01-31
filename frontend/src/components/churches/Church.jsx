import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getchurch } from "../../redux/Churches/churches";
import ChurchNav from "./churchComponents/ChurchNav";
import ChurchSlider from "./churchComponents/Slider";
import About from "./churchComponents/About";
import GetConnected from "./churchComponents/GetConnected";
import OnlineSermons from "./churchComponents/OnlineSermons";
import NextStep from "./churchComponents/NextStep";
import Events from "./churchComponents/Events";
import Footer from "../Home/Footer";

const Church = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const church = useSelector((state) => state.church.church);
  console.log(church);

  useEffect(() => {
    dispatch(getchurch(uuid));
  }, [dispatch, uuid]);

  const images = [
    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  ];

  return (
    <div>
      <ChurchNav churchName={church.name} />
      <ChurchSlider
        text={church.description_1}
        bgimage={church.background_image_3}
      />
      <About
        ChurchName={church.name}
        AboutChurch={church.about}
        AboutImage={church.background_image_2 }
      />
      <GetConnected ministries={church.all_ministries} churchName={church.name} aboutImage={church.background_image_1} />
      <OnlineSermons />
      <NextStep />
      <Events />
      <Footer />
    </div>
  );
};

export default Church;
