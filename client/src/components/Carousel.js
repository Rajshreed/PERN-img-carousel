import {React, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import './carouselStyles.css';
import {apiGetCategories, apiGetPhotos} from '../api/getData';
import ImageSlider from '../components/ImageSlider';
import Loading from '../components/utils/Loading';

function Carousel() {
  const [buttons, setButtons] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect( async() => {
    setIsLoading(true);
    // Fetch categories from database here
    const res = await apiGetCategories();
    if (res.sts==='success'){
      setErrMsg('');
      setButtons(res.data);
      let tempButtons = res.data;
      const initButtons = tempButtons.map(button => {
        return { ...button, isToggled: false } }); 
      setButtons(initButtons);
      updatePhotos();
    }else{
      console.log("Error while getting categories from database");
      setErrMsg("Error while fetching categories from database");
    }
    setIsLoading(false);
  }, []);

  useEffect( async() => {
    setIsLoading(true);

    updatePhotos();
    console.log("useeffect called for rendering when buttons are updated", photos.length);
    await delay(500);
    setIsLoading(false);
  }, [buttons,setButtons]);


  const updatePhotos = async() => {
    // Fetch categories from database here
    const res = await apiGetPhotos(buttons);
    console.log("after getphotos",res.data.length);
    if (res.sts==='success'){
      setErrMsg('');
      setPhotos(res.data);
    }else{
      console.log("Error while getting categories from database");
      setErrMsg("Error while fetching categories from database");
    }
  }
  
  const toggleButton = async (id) => {
    const updatedButtons = buttons.map(button => {
      if (button.id === id) {
        return { ...button, isToggled: !button.isToggled };
      } else {
        return button;
      }
    });
    setButtons(updatedButtons);
  };

  if(!Cookies.get('access_token')){
    return( <p>Login required to access this page!</p>);
  }
  if (isLoading){
    return(<Loading />)
  }
  return (
  <div> 
          {buttons.map(button => (
        <button
          key={button.id}
          onClick={() => toggleButton(button.id)}
          className={button.isToggled ? 'toggled' : ''}
        >
          {button.category}
        </button>
      ))}
      <ImageSlider images={photos}></ImageSlider>
      </div>
);
}
export default Carousel;