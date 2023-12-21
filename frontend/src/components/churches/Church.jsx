import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getchurch } from '../../redux/Churches/churches';
import ChurchNav from './churchComponents/ChurchNav';
import ChurchSlider from './churchComponents/Slider';
import About from './churchComponents/About';
import Events from '../events/Events';
import Contact from './churchComponents/Contact';

const Church = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch()
  const church = useSelector((state)=> state.church.church)

  useEffect(() => {
    dispatch(getchurch(uuid))
  },[dispatch,uuid])
  
  const images = [
     "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
     "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
     "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
  ]

  return (
    <div>
      <ChurchNav churchName={church.name} />
      <ChurchSlider text={church.description_1} images={images} />
      <About />
      <Contact />
      <Events />
    </div>
  );
};

export default Church;
