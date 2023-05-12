import "../index.css";

const Table = ({
	name,
	data,
	rowName,
}: {
	key: number | string;
	name: string;
	data: number[];
	rowName: string;
}) => {
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
export default Table;
