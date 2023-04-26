import React from 'react';
import Login from './components/Login.js';
import ManageCategory from './components/ManageCategory.js';
import Carousel from './components/Carousel.js';
import Logout from './components/Logout.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles.css";
import Navbar from './components/utils/Navbar.js';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/manageCategory" element={<ManageCategory />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>    </div>
  );
};

export default App;

/*import React from 'react';
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
export default App;*/