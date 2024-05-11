import React, { useRef, useState } from 'react'
import SaarOptions from "./SaarOptions.json";
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Pages from './Pages';
import Result from './Result';


function SaarPariksha() {
  const displayData = useRef({
    headings: Object.keys(SaarOptions),
    options: Object.entries(SaarOptions).map(([_, options]) => options),
  });

  const [selectedData, select] = useState(new Array(displayData.current.headings.length).fill([]));

  return (
    <Routes>
      <Route index element={<Home headings={displayData.current.headings} />} />
      <Route path='pages' element={<Pages displayData={displayData.current} select={select} selectedData={selectedData} />} />
      <Route path='result' element={<Result displayData={displayData.current} selectedData={selectedData} />} />
    </Routes>
  )
}

export default SaarPariksha