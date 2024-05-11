import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisBtn from "../SymbolicComponent/AnalysisBtn";
import AppSettings from "../Contexts/AppSettings";
import { color } from "chart.js/helpers";

function Pages({ displayData, selectedData, selectData }) {
  const {theme, isMobile} = useContext(AppSettings)
  const navigate = useNavigate();
	// const location = useLocation();
	const [pageNo, setPageNo] = useState(useLocation().state.pageNo);
  const [currentPage, setCurrentPage] = useState({
    heading: displayData.headings[pageNo],
    options: displayData.options[displayData.headings[pageNo]],
  });

	useEffect(() => {
    setCurrentPage({
      heading: displayData.headings[pageNo],
      options: displayData.options[displayData.headings[pageNo]],
    });
	}, [pageNo]);
  
  const handleNavigation = (direction) => {
    if(direction === -1) {
      if(pageNo - 1 >= 0)  setPageNo(pageNo - 1);
      else  navigate(-1);
    } else {
      if(pageNo + 1 <= displayData.headings.length - 1)  setPageNo(pageNo + 1);
      else  navigate("/prakriti_pariksha/result");
    }    
  }
  // selectedData[currentPage.heading][item.id][dosha].includes(index) ? 
  // console.log(selectedData[currentPage.heading]?.[2]?.['Vaat'].includes(1));
  
  const handleSelect = (category, questionNo, dosha, optionNo) => {
    // console.log(category, questionNo, dosha, optionNo);
    
    selectData((prev) => {
      
      const temp = {...prev[category]};
      
      if (temp[questionNo]) {
        // temp[questionNo][dosha] = [optionNo];
        if (temp[questionNo][dosha]) {
          if (temp[questionNo][dosha].includes(optionNo)) {
            temp[questionNo][dosha].splice(temp[questionNo][dosha].indexOf(optionNo), 1);
          } else {
            temp[questionNo][dosha].push(optionNo);
          }
        } else {
          temp[questionNo][dosha] = [optionNo];
        }
    } else {
        temp[questionNo] = { [dosha]: [optionNo] };
    }

      return {
        ...prev,
        [category]: temp,
      };
    })
  };
  
	return (
		<div style={{
      // minHeight: '100vh',
      backgroundColor: '#edf',
      padding: '22px 0',
    }}>
			<button
        style={{...styles.navBtn, left: '12px'}}
        onClick={() => handleNavigation(-1)}>
        previous
      </button>
			<button
        style={{...styles.navBtn, right: '12px'}}
        onClick={() => handleNavigation(1)}>
        next
			</button>
      <AnalysisBtn size={52} position={{bottom: '12px', right: '12px'}} navigateLink={() => navigate("/prakriti_pariksha/result")}/>
			<header style={{...styles.heading, fontSize: isMobile ? "40px" : "62px"}}>{displayData.headings[pageNo]}</header>
      <div style={styles.cardsCont}>
        {currentPage.options.map((item) => (
          <div key={item.id} style={{
            ...styles.card,
            maxWidth: isMobile ? '440px' : '1000px',
            backgroundColor: pageNo === 1 ? '#dafedfaf' : pageNo === 2 ? '#eafaffaf' : "#ffeaeaaf",
          }}>
            <header style={styles.cardHeader}>
              {item.question}
            </header>
            <section style={{
              // display: 'grid',
              display: 'flex',
              // gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '12px',
            }}>{Object.entries(item.options).map(([dosha, options], index) => (
              <div key={index} style={{
                flex: 1,
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: '#fffa',
                border: '1px solid #000',
              }}>
                <header style={{
                  fontSize: '24px',
                  fontWeight: '500',
                  fontFamily: 'Nunito',
                  color: '#666',
                }}>{dosha}</header>
                <hr style={{margin: '12px 0'}} />
                <section style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '12px',
                }}>{options.map((option, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    columnGap: '6px',
                  }}
                  onClick={() => handleSelect(currentPage.heading, item.id, dosha, index)}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: '12px',
                      aspectRatio: 1,
                      borderRadius: '6px',
                      outline: '1px solid #888',
                      outlineOffset: '2px',
                      backgroundColor: selectedData[currentPage.heading]?.[item.id]?.[dosha]?.includes(index) ? '#4d8' : '#0002',
                    }} />
                    <label key={index} style={{
                      color: '#333',
                      // color: selectedData[currentPage.heading]?.[item.id]?.[dosha]?.includes(index) ? '#4d8' : '#333',
                    }}>
                    {option}</label>
                  </div>
                ))}</section>
              </div>
            ))}</section>
          </div>
        ))}
      </div>
		</div>
	);
}

export default Pages;

const styles = {
  navBtn: {
    position: 'fixed',
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
    marginBottom: "22px",
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    textShadow: '2px 2px #ccc',
    color: '#759',
  },
  container: {
    width: '100%',
    // margin: '0 auto',
    padding: '22px',
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#edfc",
  }, 
  cardsCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '22px',
    // border: '1px solid',
    // backgroundColor: '#000000'
  },
  card: {
    width: '92%',
    padding: '22px',
    borderRadius: '22px',
    display: "flex",
    flexDirection: 'column',
    rowGap: "12px",
    // border: '1px solid limegreen',
  },
  cardHeader: {
    display: 'flex',
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    color: '#623232',
  },
  cardOptionsCont: {},
  // card: {
  //   flex: 1,
  //   backgroundColor: '#edf',
  // }
}
