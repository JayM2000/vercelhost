import React from 'react';
import { Route, Routes,BrowserRouter as Bt } from "react-router-dom";
import Hm from './Components/companylist';
import './App.css';

const App = () =>{

return (
    <Bt>
        <Routes>
          <Route path='/' element={<Hm />} />
        </Routes>
    </Bt>
)
};

export default App;
