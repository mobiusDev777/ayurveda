import React, { useContext } from "react";
import { Link } from "react-router-dom";

import bodyIcon from "../../assets/icons/body.png";
import bodyProcessIcon from "../../assets/icons/body_process.png";
import mindIcon from "../../assets/icons/mind.jpg";
import ArrowBack from '../SymbolicComponent/ArrowBack';
import AppSettings from "../Contexts/AppSettings";

const CARD_ICON = [bodyIcon, bodyProcessIcon, mindIcon] ;

function Home({ headings }) {
  
  const {theme, isMobile} = useContext(AppSettings);
  
	return (
		<div style={styles.container}>
      <ArrowBack size={'52px'} position={{top: "16px", left: "16px"}}/>
      <div
        // className="text-gradient"
        style={{...styles.heading, fontSize: isMobile ? '56px' : '82px'}}
      >
				Prakriti Pariksha
			</div>
			<div style={{
        ...styles.cardsCont,
        flexDirection: isMobile ? 'column' : 'row',
        }}>
      {headings.map((ele, index) => (
				// <Link key={index} to={`/prakriti_pariksha/${ele}`} state={{pageNo: index}} style={{
				<Link key={index}
          to={'/prakriti_pariksha/pages'}
          state={{pageNo: index}}
          style={{textDecoration: 'none'}}
        >
          <div style={{
            position: 'relative',
            width: '280px',
            height: '320px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '100%',
              aspectRatio: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // border: '1px solid limegreen'
            }}>
              <img src={CARD_ICON[index]} width={240} alt="" />
            </div>
            <span style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              zIndex: 1,
              // backgroundColor: '#0002',
              backgroundImage: 'linear-gradient(#0000 40%, #bdb)'
            }} />
            <p style={{
              position: 'absolute',
              bottom: '22px',
              width: '100%',
              // height: '60px',
              textAlign: 'center',
              color: '#4bad91',
              fontSize: '36px',
              fontWeight: 'bold',
              fontFamily: 'Gruppo',
              zIndex: 2,
            }}>{ele}</p>            
          </div>
        </Link>
			))}
      </div>
		</div>
	);
}

export default Home;

const styles = {
	container: {
    // height: '100vh',
		width: "100%",
    minHeight: '100vh',
		padding: "60px 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// gap: "22px",
    backgroundColor: '#bdb',
	},
  heading: {
    textAlign: 'center',
    fontSize: "82px",
    fontWeight: "bold",
    color: "#4bad91",
    fontFamily: "Nunito",
    // backgroundImage: "linear-gradient(to right, #4bad91, #318abc)",
  },
  cardsCont: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    minHeight: '60vh',
    // border: '1px solid',
  },
};