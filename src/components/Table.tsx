import "../index.css";
import TableRow from "./TableRow";
import { TableType } from "../types/allTypes";
import { calcMeanMedianMode } from "../utils/features";

const Table = ({ data, classes, rowName, property }: TableType) => {
	// set the mean median mode data for the current row
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
