import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import ArrowBack from '../SymbolicComponent/ArrowBack';
import AppSettings from "../Contexts/AppSettings";

function Home({headings}) {

	const {theme, isMobile} = useContext(AppSettings);

  // alert(headings);

	return (
		<div style={styles.container}>
			<ArrowBack size={'52px'} position={{top: "16px", left: "16px"}}/>
			<div
				// className="text-gradient"
				style={{...styles.heading, fontSize: isMobile ? '56px' : '82px'}}
			>
				Saar Pariksha
			</div>
			{headings.map((saar, index) => (
				<Link
					key={index}
					style={{
						textDecoration: 'none',
					}}
					to={"pages"}
					state={{ pageNo: index }}
				>
					<div>
						<h2 style={{
							fontSize: '36px',
              fontWeight: '500',
              color: '#628afe',
							fontFamily: 'Montserrat Alternates',
						}}>{saar}</h2>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Home

const styles = {
	container: {
		width: "100%",
		minHeight: "100vh",
		paddingTop: "60px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "22px",
		backgroundColor: "#bdb",
		// justifyContent: 'center',
	},
	heading: {
		textAlign: 'center',
		fontWeight: "bold",
		color: "#4bad91",
		fontFamily: "Nunito",
		// backgroundImage: "linear-gradient(to right, #4bad91, #318abc)",
	},
};
