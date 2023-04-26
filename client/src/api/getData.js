import client from './axios';

export const authenticateUser = async (emailid, password) => {
  try {
    const data = {
      username: emailid,
      password: password,
    };
    let res = await client.post('/auth/signin', data);
    console.log(res);
    return {"sts":"success", "data":res.data};
  } catch (err) {
   return {"sts":"error", "data":err};
  }
  
};

export const apiGetPhotos = async (category_id) => {
  try {
    let photos = await client.get('/data/photos/'+String(category_id));
    return {"sts":"success", "data":photos.data};
  } catch (err) {
   return {"sts":"error", "data":err};
  }
};
export const apiGetCategories = async () => {
  try {
    let result = await client.get('/data/categories');
    return {"sts":"success", "data":result.data};
  } catch (err) {
    console.log(err);
    return {"sts":"error", "data":err.response.data.detail};
  }
};

const fetchPhotoByCategoryId = async (category_id) => {
  let res = await apiGetPhotos(category_id);
  if (res.sts === "success") {
    //console.log("HERE ",res.data.map((val,_ind) => {return val.photo_url}));
    return (res.data).map((val,_ind) => {return val.photo_url});
  }else {
    console.log("Error while fetching photos by id:", res.data);
    return [];
  }
}
const fetchSelectedPhotoDataset = async (list_category_id) => {
  var arr = [];
  for (let id in list_category_id){
    arr = arr.concat(await fetchPhotoByCategoryId(id));
  }
  return arr;
}

export const getPhotosBasedOnToggleButton = async (toggleArr, buttonData) => {
  if (!buttonData) {
    return [];
  }
  let categoryIdList = [];
  // If anything's toggled return all photos
  if (toggleArr.every(v => v === false)) {
    categoryIdList = toggleArr.map((val, _ind) => {
      if (val === false) {return buttonData[_ind].id;}
  })
  }
  else {
    // get all categories that are toggled true
    categoryIdList = toggleArr.map((val, _ind) => {
      if (val === true) return buttonData[_ind].id;
  })
}
  console.log("select cat id list",categoryIdList, toggleArr);
  return await fetchSelectedPhotoDataset(categoryIdList);
}
export const fetchButtonData = async () => {
  let res = await apiGetCategories();
  if (res.sts === "success") {
//    console.log(res.data);
    return res.data;
  }else {
    console.log("Error while fetching categories:", res.data);
    return [];
  }
}
export const getButtonDataList = async () => {
  let buttonDataList = await fetchButtonData();
  return buttonDataList;
}
