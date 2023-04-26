import React, { useState, useEffect } from 'react';
import { apiAddCategory, apiGetCategories, apiRemoveCategory } from '../api/getData';
import Cookies from 'js-cookie';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect( async () => {
    // Fetch categories from database here
    const res = await apiGetCategories();
    
    if (res.sts==='success'){
      setErrMsg('');
      let fetchedCategories = res.data.map((item, ind)=>(item['category'])) || [];
      let fetchedIndexes = res.data.map((item, ind)=>(item['id'])) || [];
      console.log(fetchedCategories, fetchedIndexes);
      setCategories(fetchedCategories);
      setIndexes(fetchedIndexes);
    }else{
      console.log("Error while getting categories from database");
      setErrMsg("Error while fetching categories from database");
    }
    
  }, []);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async() => {
    let temp = newCategory.trim();
    setNewCategory(temp);

    if (temp.length===0){
      setErrMsg("Category cannot be blank string!");
      return;
    }
    const res = await apiAddCategory(temp);
    if (res.sts==='success'){
      setCategories([...categories, res.data.category]);
      setIndexes([...indexes, res.data.id]);
      setNewCategory('');
    }
    else{
      console.log("Error while adding new category");
    }
  };

  const handleRemoveCategory = async (categoryIndex) => {
    const res = await apiRemoveCategory(indexes[categoryIndex]);
    if (res.sts==='success'){
      const updatedCategories = [...categories];
      updatedCategories.splice(categoryIndex, 1);
      setCategories(updatedCategories);
      const updatedIndexes = [...indexes];
      updatedIndexes.splice(categoryIndex, 1);
      setIndexes(updatedIndexes);
      }
    else{
      console.log("Error while removing the category");
      setErrMsg("Error while removing the category");
    }
  };
  if(!Cookies.get('access_token')){
    return( <p>Login required to access this page!</p>);
 }
  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category} <button onClick={() => handleRemoveCategory(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div>{errMsg}</div>
    </div>
  );
};

export default ManageCategory;
