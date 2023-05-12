import { useCallback, useEffect, useState } from "react";
import Table from "./components/Table";
import { ClassType, TableDataType } from "./types/allTypes";

function App() {
	const [wineData, setWineData] = useState<TableDataType[]>([]);
	const [clsObj, setClsObj] = useState({});

	// function for fetching the wine data
	const fetchWineData = useCallback(async () => {
		const res = await fetch("http://localhost:3500/data");
		const data = await res.json();
		setWineData(data);
	}, []);

	// function for setting the gamma field in the wineData state
	const setCalculatedGamma = useCallback((wineData: TableDataType[]) => {
		// Gamma = (Ash * Hue) / Magnesium.
		const newWineData = wineData;
		for (const wData of newWineData) {
			const gmma: number = (+wData.Ash * +wData.Hue) / +wData.Magnesium;
			wData.Gamma = Number(gmma.toFixed(3));
		}
		setWineData(newWineData);
	}, []);

	// function for creating wine classes array
	const setWineClasses = useCallback((wineData: TableDataType[]) => {
		let classObj: ClassType = {};
		for (const wData of wineData) {
			if (classObj[wData?.Alcohol]) {
				classObj = {
					...classObj,
					[wData.Alcohol]: classObj[wData.Alcohol] + 1,
				};
				setClsObj(classObj);
			} else {
				classObj = {
					...classObj,
					[wData.Alcohol]: 1,
				};
				setClsObj(classObj);
			}
		}
	}, []);

	// fetch wine data from the json server using the Wine-Data.json file provided
	useEffect(() => {
		fetchWineData();
	}, [fetchWineData]);

	// calculate the Gamma and add it to the wineData state
	useEffect(() => {
		setCalculatedGamma(wineData);
	}, [wineData, setCalculatedGamma]);

	// create wine data classes array
	useEffect(() => {
		setWineClasses(wineData);
	}, [wineData, setWineClasses]);

	return (
		<div>
			<h1>Wine App Data</h1>
			<Table
				data={wineData}
				classes={clsObj}
				rowName={"Flavanoids"}
				property={"Flavanoids"}
			/>
			<Table
				data={wineData}
				classes={clsObj}
				rowName={"Gamma"}
				property={"Gamma"}
			/>
		</div>
	);
}
export default App;
