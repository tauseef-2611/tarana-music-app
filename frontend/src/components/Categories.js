import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Categories.css';

function Categories() {
  return (
    <>
    <h3 className='cat-head'>Domains</h3>
    <div className='category-container'>
      <NavLink to='/category/Hamd' className='category-link'>
      <div className="cat-item">
        <img src="https://cdn-icons-png.flaticon.com/512/3798/3798658.png" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Hamd
      </h3>
      </div>
      </NavLink>
      <NavLink to='/category/Naat' className='category-link'>
      <div className="cat-item">
        <img src="https://cdn-icons-png.flaticon.com/512/89/89018.png" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Naat
      </h3>
      </div>
      </NavLink>
      <NavLink to='/category/Arabic Nasheed' className='category-link'>
      <div className="cat-item">
        <img src="https://charbase.com/images/glyph/1593" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Arabic
      </h3>
      </div>
      </NavLink>
      <NavLink to='/category/Tarana' className='category-link'>
      <div className="cat-item">
        <img src="https://www.svgrepo.com/show/236803/quran-quran.svg" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Tarana
      </h3>
      </div>
      </NavLink>
      <NavLink to='/category/Tanzeemi' className='category-link'>
      <div className="cat-item">
        <img src="https://certindia.in/wp-content/uploads/2018/08/SIO-Logo.png" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Tanzeemi
      </h3>
      </div>
      </NavLink>
      <NavLink to='/category/Youth' className='category-link'>
      <div className="cat-item">
        <img src="https://seeklogo.com/images/R/raised-black-fist-logo-E48B504058-seeklogo.com.png" alt="Hamd" class="cat-img" />
        <h3 className="cat-name">
    Youth
      </h3>
      </div>
      </NavLink>
    </div>
    </>
  )
}

export default Categories;