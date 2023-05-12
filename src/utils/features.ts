import { TableDataType } from "../types/allTypes";

// function for calculating mean median and mode for tables
export const calcMeanMedianMode = (
	data: TableDataType[],
	classNumber: number,
	property: string
) => {
	const classWineData = data.filter((wine) => wine.Alcohol === classNumber);
	const classWineLength = classWineData.length;
	const calcMean: number =
		classWineData.reduce((acc, wine) => acc + Number(wine[property]), 0) /
		classWineLength;

	let calcMedian: number;
	if (classWineLength % 2 === 0) {
		calcMedian =
			(Number(classWineData[classWineLength / 2][property]) +
				Number(classWineData[classWineLength / 2 + 1][property])) /
			2;
	} else {
		calcMedian = Number(classWineData[(classWineLength + 1) / 2][property]);
	}

	const modeCounter: { [key: string]: number } = {};
	for (const wine of classWineData) {
		if (modeCounter[wine[property]]) {
			modeCounter[wine[property]]++;
		} else {
			modeCounter[wine[property]] = 1;
		}
	}

	let calcMode = -Infinity;
	let frequency = -Infinity;
	for (const [key, value] of Object.entries(modeCounter)) {
		if (frequency < value) {
			frequency = value;
			calcMode = Number(key);
		}
	}

	return [calcMean, calcMedian, calcMode];
};
