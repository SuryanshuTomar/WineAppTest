import { useCallback, useEffect, useState } from "react";
import Table from "./components/Table";

export type TableDataType = {
	[key: string]: number | string;
};

export type ClassType = {
	[key: string]: number;
};

let classObj: ClassType = {};

function App() {
	const [wineData, setWineData] = useState<TableDataType[]>([]);
	const [gamma, setGamma] = useState<number[]>([]);

	const fetchWineData = useCallback(async () => {
		const res = await fetch("http://localhost:3500/data");
		const data = await res.json();
		setWineData(data);
	}, []);

	const setCalculatedGamma = useCallback((wineData: TableDataType[]) => {
		// Gamma = (Ash * Hue) / Magnesium.
		const newWineData = wineData;
		for (const wData of newWineData) {
			const gmma: number = (+wData.Ash * +wData.Hue) / +wData.Magnesium;
			wData.Gamma = Number(gmma.toFixed(3));
			setGamma([gmma]);
		}
		setWineData(newWineData);
	}, []);

	useEffect(() => {
		fetchWineData();
	}, [fetchWineData]);

	useEffect(() => {
		setCalculatedGamma(wineData);
	}, [wineData, setCalculatedGamma]);

	const setWineClasses = (wineData: TableDataType[]) => {
		for (const wData of wineData) {
			if (classObj[wData?.Alcohol]) {
				classObj = {
					...classObj,
					[wData.Alcohol]: classObj[wData.Alcohol] + 1,
				};
			} else {
				classObj = {
					...classObj,
					[wData.Alcohol]: 1,
				};
			}
		}
	};
	setWineClasses(wineData);

	return (
		<div>
			<h1>Wine App Data</h1>
			<Table
				data={wineData}
				classes={classObj}
				rowName={"Flavanoids"}
				property={"Flavanoids"}
			/>
			<Table
				data={wineData}
				classes={classObj}
				rowName={"Gamma"}
				property={"Gamma"}
			/>
		</div>
	);
}
export default App;
