import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getchurch } from '../../redux/Churches/churches';
import ChurchNav from './churchComponents/ChurchNav';
import ChurchSlider from './churchComponents/Slider';
import About from './churchComponents/About';
import Events from '../events/Events';

const Church = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch()
  const church = useSelector((state)=> state.church.church)

  useEffect(() => {
    dispatch(getchurch(uuid))
  },[dispatch,uuid])
  

  return (
    <div>
      <ChurchNav churchName={church.name} />
      <ChurchSlider text={church.description_1} image={church.background_image_1} />
      <About />
      <Events />
    </div>
  );
};

export default Church;
