import React, { useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Pages from './Pages';
import Result from './Result';
import PrakritiOptions from './PrakritiOptions.json';

function PrakritiParikshan() {

  const [selectedData, selectData] = useState({
    'Body': {},
    'Body Process': {},
    'Mind': {},
    // 'Spirit': {},
    // 'Soul': {},
  });

  const displayData = useRef({
    headings: Object.keys(PrakritiOptions),
    options: PrakritiOptions,
  });

  return (
    <Routes>      
      <Route index path='/' element={<Home headings={displayData.current.headings} />} />
      <Route path='pages' element={<Pages displayData={displayData.current} selectedData={selectedData} selectData={selectData} />} />
      <Route path='result' element={<Result displayData={displayData.current} selectedData={selectedData} />} />
    </Routes>
  )
}

export default PrakritiParikshan