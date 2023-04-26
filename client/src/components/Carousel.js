import React from 'react';
import Cookies from 'js-cookie';

function Carousel() {
  if(!Cookies.get('access_token')){
    return( <p>Login required to access this page!</p>);
 }

  return (
    <div> Carousel - Image Slider for the selected categories.
    </div>
  );
}
export default Carousel;