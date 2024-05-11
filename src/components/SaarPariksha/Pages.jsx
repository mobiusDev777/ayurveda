import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisBtn from "../SymbolicComponent/AnalysisBtn";
import AppSettings from "../Contexts/AppSettings";

function Pages({ displayData, select, selectedData }) {
  
  const {theme, isMobile} = useContext(AppSettings);
  
  const navigate = useNavigate();
	const location = useLocation();
  
	const [pageNo, setPageNo] = useState(location.state.pageNo);

  const handleNavigation = (direction) => {
    if(direction == -1) {
      if(pageNo - 1 >= 0)  setPageNo(pageNo - 1);
      else  navigate(-1);
    } else {
      if(pageNo + 1 <= displayData.headings.length - 1)  setPageNo(pageNo + 1);
      else  navigate("/saar_pariksha/result", {replace: true})
    }
  }

  const handleSelect = (optionNo) => {
    // console.log(displayData.headings[pageNo], optionNo);
    select((prev) => {
      const temp = [...prev];
      const currentPageAnswers = [...prev[pageNo]];
      
      if(currentPageAnswers.includes(optionNo)) {
        currentPageAnswers.splice(currentPageAnswers.indexOf(optionNo), 1);
      } else {
        currentPageAnswers.push(optionNo);
      }
      
      temp[pageNo] = currentPageAnswers;
      // temp[displayData.headings[pageNo]] = currentPage;
      return temp;
    })
  };

	return (
		<div style={{
      backgroundColor: '#eeddff',
      minHeight: '100vh',
      padding: '22px 0',
    }}>
      <button
      style={{
        ...styles.navBtn,
        left: '12px',
      }}
      onClick={() => handleNavigation(-1)}
      >previous
      </button>
			<button
      style={{
        ...styles.navBtn,
        right: '12px',
      }}
      onClick={() => handleNavigation(1)}
			>next
			</button>
      <AnalysisBtn
        size={52}
        position={{bottom: '12px', right: '12px'}}
        navigateLink={() => navigate("/saar_pariksha/result")}
      />
			{/* <button
      style={{
        position: 'absolute',
        top: '52px',
        right: '12px',
        padding: '8px 16px',
      }}
				onClick={() => navigate("/saar_pariksha/result", {replace: true})}
			>Result
			</button> */}
			<header style={{...styles.heading, fontSize: isMobile ? "40px" : "62px"}}>{displayData.headings[pageNo]}</header>
      <div style={styles.optCont}
      >{displayData.options[pageNo].map((option, index) => (
        <button key={index} style={{
          ...styles.label,
          backgroundColor: selectedData[pageNo].includes(index) ? "#22ef448b" : "#22a6bf8b",
        }} onClick={() => handleSelect(index)}>{option}</button>
      ))}</div>
		</div>
	);
}

export default Pages;

const styles = {
  navBtn: {
    position: 'absolute',
    top: '12px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#fffe',
    color: '#759',
    fontSize: '15px',
  },
  heading: {
    width: '100%',
    textAlign: "center",
    color: '#759',
    fontFamily: 'Nunito',
    fontWeight: "bold",
    marginBottom: "22px",
    textTransform: 'uppercase',
    textShadow: '2px 2px #ccc',
  },
  optCont: {
    width: '80%',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '22px',
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    // backgroundColor: "#d26286cc",
    borderRadius: '22px',
    backgroundColor: '#fff8',
  },
  label: {
    height: '44px',
    fontSize: "18px",
    fontWeight: "bold",
    padding: '0 12px',
    borderRadius: "22px",
    border: 'none',
    color: '#efefef',
  }
}
