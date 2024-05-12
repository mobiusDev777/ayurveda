import React, { useContext, useEffect, useState } from 'react'

import KosthaOptions from './KosthaOptions.json'
import ArrowBack from '../SymbolicComponent/ArrowBack';
import ResultBtn from '../SymbolicComponent/ResultBtn';
import AppSettings from '../Contexts/AppSettings';

function KosthaParikshan() {
  const {theme, isMobile} = useContext(AppSettings)
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, selectOpt] = useState(new Array(KosthaOptions.length).fill(null));

  const [score, setScore] = useState({
    totalScore: 0,
    kostha: '',
  });
  
  useEffect(() => {
    const totalScore = selectedOpt.filter(ele => ele != null).reduce((sum, ele) => sum + ++ele, 0);
    setScore({
      totalScore: totalScore,
      kostha: totalScore <= 7 ? 'Krura' : totalScore <= 14 ? 'Madhyam' : 'Mridu',
    });
  }, [showResult]);

  const handleSelection = (questionNo, optionNo) => {
    selectOpt((prev) => {
      const newArr = [...prev];
      newArr[questionNo] = optionNo;
      return newArr;
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#edf',
      padding: '22px 0',
    }}>
      <div style={{
        ...styles.pageHeader,
        fontSize: isMobile ? '36px' : '62px',
      }}>Kostha Parikshan</div>
        <ArrowBack size={'52px'} position={{top: "16px", left: "16px"}}/>
        <ResultBtn size={52} position={{top: "16px", right: "16px"}} setShowResult={setShowResult} />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '22px',
        padding: '0 22px',
      }}>
      {KosthaOptions.map((item) => (
        <div key={item.id} style={{...styles.card, width: isMobile ? '360px': '480px'}}>
          <div style={styles.cardHeader}>{item.question}</div>
          <div style={styles.cardOptionsCont}>
          {item.options.map((option, index) => (
            <div key={index} onClick={() => handleSelection(item.id, index)} style={{
              ...styles.cardOptions,
              backgroundColor: selectedOpt[item.id] == index ? '#6f8d' : '#bbb4',
            }}>{option}</div>
          ))}
          </div>
        </div>
      ))}
      </div>
      {showResult && (
        <div style={styles.resultCont}>
          <div style={styles.backdrop} onClick={() => setShowResult(false)} />
				<div
					style={styles.resultPanel}
				>
          <div style={{
            textAlign: 'center',
          }}>
            {`Total score: ${score.totalScore} Kostha: ${score.kostha} Kostha`}
          </div>
          {/* {selectedOpt.map((answer, index) => (
          <div key={index} style={{
            borderBottom: '1px solid #888',
            padding: '8px 16px',
            margin: '6px 8px',
          }}>
            <div style={{
              fontSize: '24px',
              color: '#a66',
            }}>{KosthaOptions[index].question}</div>
            <div style={{
              fontSize: '18px',
              color: KosthaOptions[index].options[answer] ? '#666' : '#e24',
              paddingLeft: '6px',
            }}>{KosthaOptions[index].options[answer] || 'not answered'}</div>
          </div>
        ))} */}
        {selectedOpt.filter(ele => ele).length ? (
          selectedOpt
						.map((ele, eleIndex) => [
							KosthaOptions[eleIndex].question,
							KosthaOptions[eleIndex].options[ele],
						])
						.filter(([_, b]) => b)
						.map(([question, answer], index) => (
							<div
								key={index}
								style={{
									borderBottom: "1px solid #888",
									padding: "8px 16px",
									margin: "6px 8px",
								}}>
								<div style={{
										fontSize: "24px",
										color: "#a66",
									}}
								>{question}</div>
								<div style={{
										fontSize: "18px",
										color: "#666",
										paddingLeft: "6px",
									}}
								>{answer}</div>
							</div>
						))
        ) : (
          <div style={{
            fontSize: '24px',
            color: '#a66',
            textAlign: 'center',
          }}>
            Please select at least one option
          </div>
        )}
          </div>
        </div>
			)}
    </div>
  )
}

export default KosthaParikshan

const styles = {
  pageHeader: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
    color: '#759',
    marginBottom: '22px',
  },
  card: {
    width: '480px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    backgroundColor: '#fff8',
    overflow: 'hidden',
  },
  cardHeader: {
    fontSize: '18px',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '12px',
    // borderRadius: '12px',
    backgroundColor: '#b8fc',
  },
  cardOptionsCont: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px',
    // backgroundColor: '#000000'
  },
  cardOptions: {
    fontSize: '18px',
    color: '#626262',
    textAlign: 'center',
    padding: '8px 14px',
    borderRadius: '24px',
    backgroundColor: '#ffffff42',
  },
  resultCont: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: '#0004',
    backdropFilter: 'blur(12px)',
  },
  resultPanel: {						
    width: "80%",
    maxHeight: "88%",
    overflow: 'auto',
    padding: "22px",
    borderRadius: "22px",
    backgroundColor: "#fff",
  }
}