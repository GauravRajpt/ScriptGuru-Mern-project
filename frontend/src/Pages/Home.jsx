import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const Home = () => {
   
return (
    <>
    <Header/>
<Outlet/>
</>
)
};

export default Home;
