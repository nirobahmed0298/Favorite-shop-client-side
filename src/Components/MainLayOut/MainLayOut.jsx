import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar/Navbar';

const MainLayOut = ({ search, setSearch }) => {
    return (
        <div>
            <Navbar search={search} setSearch={setSearch} />
            <Outlet context={{ search, setSearch }} />
        </div>
    );
};

export default MainLayOut;
