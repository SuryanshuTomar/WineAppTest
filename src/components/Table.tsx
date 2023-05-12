import "../index.css";
import { ClassType, TableDataType } from "../App";
import TableRow from "./TableRow";

const Table = ({
	data,
	classes,
	rowName,
	property,
}: {
	data: TableDataType[];
	classes: ClassType;
	extraData?: number[];
	rowName: string;
	property: string;
}) => {
	const calcMeanMedianMode = (
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
			calcMedian = Number(
				classWineData[(classWineLength + 1) / 2][property]
			);
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

	let meanArr: number[] = [];
	let medianArr: number[] = [];
	let modeArr: number[] = [];
	const classWiseData = (clsArr: string[]) => {
		for (const cls of clsArr) {
			const [mean, median, mode] = calcMeanMedianMode(
				data.slice(),
				+cls,
				property
			);

			meanArr = [...meanArr, mean];
			medianArr = [...medianArr, median];
			modeArr = [...modeArr, mode];
		}
	};
	classWiseData(Object.keys(classes));

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>{"Measure"}</th>
						{Object.keys(classes).map((cls) => (
							<td key={cls}>Class {cls}</td>
						))}
					</tr>
				</thead>

				<tbody>
					<TableRow
						key={Math.random() * new Date().getTime()}
						name="Mean"
						data={meanArr}
						rowName={rowName}
					/>
					<TableRow
						key={Math.random() * new Date().getTime()}
						name="Median"
						data={medianArr}
						rowName={rowName}
					/>
					<TableRow
						key={Math.random() * new Date().getTime()}
						name="Mode"
						data={modeArr}
						rowName={rowName}
					/>
				</tbody>
			</table>
		</>
	);
};
export default Table;
