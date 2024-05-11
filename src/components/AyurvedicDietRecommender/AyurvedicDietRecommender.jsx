import React, { useRef, useState } from "react";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";

import DietChart from "./DietChart.json";
import ArrowBack from '../SymbolicComponent/ArrowBack';

function AyurvedicDietRecommender() {
  
	const [dietChartData, setDietChartData] = useState(null);
  const mapData = useRef({
    prakriti: Object.keys(DietChart.Prakriti),
    ritu: Object.keys(DietChart.Ritu),
  })

	const handleDietChant = () => {
    console.log(mapData.current);
		const prakriti = document.getElementById("prakriti").value;
		const ritu = document.getElementById("ritu").value;

		setDietChartData({
			prakriti: {
				name: prakriti,
				data: DietChart.Prakriti[prakriti][ritu],
			},
			ritu: {
				name: ritu,
				data: DietChart.Ritu[ritu],
			},
		});
	};

	const downloadDietChart = async (downloadType) => {
    const dietChartContainer = document.getElementById("dietChart");
		// canvas.toBlob((blob) => {
		// 	FileSaver.saveAs(blob, 'myCanvas.jpg');
		// });

		await html2canvas(dietChartContainer, {
			allowTaint: true,
      useCORS: true,
		}).then((canvas) => {

			const img = canvas.toDataURL("image/png");
			
			if(downloadType === 'img'){
				FileSaver.saveAs(img, 'myCanvas.jpg');
			} else {

				const doc = new jsPDF({
					orientation: 'p',
					unit: 'px',
					format: 'a4',
					hotfixes: ['px_scaling'],
				});
				
				doc.setFontSize(32);
				doc.setTextColor(65, 150, 210);
				doc.setFont('Helvetica', 'bold');
				doc.text('Ayurvedic-Diet-Chart', 200, 40);
				
				doc.addImage(img, "PNG", 20, 60);
				doc.save("Diet-Chart.pdf");
				// doc.save('Diet-Chart.pdf', { returnPromise: true }).then(() => {
					
				// });
			}
		})
  };

	return (
		<div style={styles.cont}>
			<ArrowBack size={'52px'} position={{top: "16px", left: "16px"}}/>
			<div style={styles.card}>
				<div style={styles.heading}>Ayurvedic Diet Recommender</div>
				<label htmlFor="prakriti" style={styles.label}>Select Your Prakriti</label>
				<select id="prakriti" style={styles.dropdown} onChange={() => {}}>
          {mapData.current.prakriti.map((ele, index) => (
            <option key={index} style={styles.option} value={ele}>{ele}</option>
          ))}
				</select>
				<label htmlFor="ritu" style={styles.label}>
					Select the Ritu (Season)
				</label>
				<select
					id="ritu"
					style={styles.dropdown}
					onChange={(e) => {
						// console.log(e);
					}}
				>{mapData.current.ritu.map((ele) => (
            <option style={styles.option} value={ele}>{ele}</option>
          ))}
				</select>
				<button style={styles.getBtn} onClick={handleDietChant}>
					get diet recommendation
				</button>
			</div>
			{dietChartData && (
				<div id="dietChart" style={styles.card}>
					<section>{dietChartData.prakriti.data}</section>
					<section>
						<header
							style={{
								fontSize: "24px",
								fontWeight: "700",
								fontFamily: "Nunito",
                color: '#323232',
							}}
						>
							{`Diet Recommendations for ${dietChartData.ritu.name}`}
						</header>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								rowGap: "22px",
							}}
						>
							<div>{dietChartData.ritu.data.header}</div>
							<div>
								{dietChartData.ritu.data.body.map((item) => (
									<div>
										<header
											style={{
												fontSize: "22px",
												fontWeight: "600",
												fontFamily: "Nunito",
											}}
										>
											{item[0]}
										</header>
										<div style={{
                      padding: "8px 24px",
                    }}>											
											{Array.isArray(item[1]) ? (
												<ul style={{ listStylePosition: "outside", padding: '0px 16px'}}>
													{item[1].map((subItem) => (
														<li>{subItem}</li>
													))}
												</ul>
											) : (
												<p>{item[1]}</p>
											)}
										</div>
									</div>
								))}
							</div>
							<div>{dietChartData.ritu.data.footer}</div>
						</div>
					</section>
				</div>
			)}
      {dietChartData && (
      <div style={styles.bottomBtnCont}>
        <button style={{
          flex: 1,
          color: '#bb88ff',
          backgroundColor: 'transparent',
          height: '42px',
          // padding: '12px 0px',
          border: '3px solid #bb88ff',
          borderRadius: '12px',
          fontSize: '16px',
        }}
					onClick={() => downloadDietChart('img')}
				>Save as Image</button>
        <button style={{
          flex: 1,
          height: '42px',
          backgroundColor: '#bb88ffcc',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
        }}
				onClick={() => downloadDietChart('PDF')}
				>Save as PDF</button>
      </div>)}
		</div>
	);
}

export default AyurvedicDietRecommender;

const styles = {
	cont: {
		// height: '100vh',
		minHeight: "100vh",
		// width: '100%',
		padding: "50px 0px",
		display: "flex",
		flexDirection: "column",
		// justifyContent: 'center',
		alignItems: "center",
		rowGap: "22px",
		// alignItems: 'flex-start',
		backgroundColor: "#edf",
	},
	card: {
		width: "92%",
		maxWidth: "600px",
		// height: '300px',
		padding: "22px",
		display: "flex",
		flexDirection: "column",
		// justifyContent: 'center',
		// alignItems: 'center',
		rowGap: "12px",
		borderRadius: "12px",
		backdropFilter: "blur(8px)",
		backgroundColor: "#ffffffa2",
		// overflow: 'hidden',
	},
	heading: {
		fontSize: "32px",
		color: "#323232",
		textAlign: "center",
		fontWeight: "bold",
		fontFamily: 'Comfortaa',
		// padding: '12px',
	},
	label: {
		fontSize: "18px",
		textAlign: "center",
		fontWeight: "500",
		color: "#464646",
	},
	dropdown: {
		height: "42px",
		borderRadius: "12px",
		backgroundColor: "#ffffff82",
	},
	option: {
		fontSize: "18px",
		color: "#323232",
		textAlign: "center",
		// fontWeight: 'bold',
		paddingTop: "12px",
		backgroundColor: "#bb88ff42",
	},
	getBtn: {
		height: "42px",
		borderRadius: "12px",
		backgroundColor: "#bb88ffbc",
		color: "#ffffff",
		fontSize: "18px",
		fontWeight: "bold",
		textTransform: "uppercase",
		fontFamily: "'Nunito', sans-serif",
		textAlign: "center",
		border: "none",
	},
  bottomBtnCont: {
    width: "92%",
		maxWidth: "600px",
    display: 'flex',
    columnGap: '12px',
    // justifyContent:'space-between',
  }
};
