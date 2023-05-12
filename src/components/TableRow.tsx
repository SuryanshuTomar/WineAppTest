import "../index.css";
import { TableRowType } from "../types/allTypes";

const TableRow = ({ name, data, rowName }: TableRowType) => {
	return (
		<tr>
			<td>
				{rowName} <br />
				{name}
			</td>
			{data?.map((dta) => (
				<td key={Math.random() * new Date().getTime()}>{dta.toFixed(3)}</td>
			))}
		</tr>
	);
};
export default TableRow;
