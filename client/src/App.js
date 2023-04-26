import React from 'react';
import Login from './components/Login.js';
import ManageCategory from './components/ManageCategory.js';
import Carousel from './components/Carousel.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App =() => {

return (
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manageCategory" element={<ManageCategory />} />
        <Route path="/carousel" element={<Carousel />} />
      </Routes>
    </Router>
);
}
export default App;