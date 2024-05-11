import React from 'react'
import backgroundImage from '../../assets/images/background/modern-line-art-brochure-with-blue-abstract-waves.jpg';
import { Homepage_Items } from './HomePageCards';
import './styles.css';
import { Link } from 'react-router-dom';
// const Homepage_Items = ['saar pariksha', 'prakriti pariksha', 'agni parikshan', 'kostha parikshan', 'ayurvedic diet recommender'];

function Homepage() {
	
  return (
		<div
			style={styles.container}
			>
				<div style={styles.heading}>
					Ayurveda
				</div>
			<div style={styles.cardsCont}>
			{Homepage_Items.map((item, index) => (
				<Link key={index} to={item.path} style={{
          textDecoration: 'none',
        }}>
					<div
						key={index}
						style={styles.card}
					>
						<h1 style={styles.cardHeader}>{item.name}</h1>
						<div style={styles.cardBody}>
							<img src={item.icon} height={180} alt="" />
						</div>
					</div>
				</Link>
			))}
			</div>
		</div>
	);
}

export default Homepage

const styles = {
	container: {
		width: '100%',
		minHeight: '100vh',
		backgroundImage: 'linear-gradient( 291.7deg,  rgba(255,134,134,1) 21.5%, rgba(249,141,255,1) 93.1%)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		// backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '22px',		
	},
	heading: {
		textAlign: 'center',
		fontSize: "82px",
		fontWeight: "bold",
		fontFamily: "Nunito",
		marginBottom: '22px',
		color: "#4bad91db",
		// color: '#A552C4', 
	},
  cardsCont: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		gap: '22px',
  },
	card: {
		minWidth: '340px',
		height: '300px',
		borderRadius: '16px',
		backdropFilter: 'blur(8px)',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: "#efefef88",
	},
	cardBody: {
		flexGrow: '1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardHeader: {
		textAlign: 'center',
		color: "#525252",
		padding: '16px',
		fontSize: '24px',
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		borderBottom: '2px solid #888888',
	},
};