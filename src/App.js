import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppSettings from "./components/Contexts/AppSettings";
import HomePage from "./components/Homepage/Homepage";

import SaarPariksha from "./components/SaarPariksha/SaarPariksha";

import PrakritiParikshan from "./components/PrakritiParikshan/PrakritiParikshan";
import AgniParikshan from "./components/AgniParikshan/AgniParikshan";
import KosthaParikshan from "./components/KosthaParikshan/KosthaParikshan";
import AyurvedicDietRecommender from "./components/AyurvedicDietRecommender/AyurvedicDietRecommender";
import ResultPage from "./components/ResultPage";

// let c = 0;
const App = () => {
	const [isDark, setTheme] = useState(
		window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
	);
	const [isMobile, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  )

	useEffect(() => {
    window.matchMedia("(max-width: 768px)").addEventListener('change', (e) => {
			setMatches(e.matches);
		});
  }, []);

	return (
		<AppSettings.Provider value={{isDark, setTheme, isMobile}}>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<HomePage isDark={isDark} />} />
					<Route path="saar_pariksha/*" element={<SaarPariksha />} />
					<Route path="prakriti_pariksha/*" element={<PrakritiParikshan />} />
					<Route path="agni_parikshan" element={<AgniParikshan />} />
					<Route path="kostha_parikshan" element={<KosthaParikshan />} />
					<Route path="diet_recommender" element={<AyurvedicDietRecommender />} />
					<Route path="result" element={<ResultPage />} />
				</Routes>
			</BrowserRouter>
		</AppSettings.Provider>
	);
};

export default App;