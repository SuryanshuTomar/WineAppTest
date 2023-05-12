export type TableDataType = {
	[key: string]: number | string;
};

export type ClassType = {
	[key: string]: number;
};

export type TableType = {
	data: TableDataType[];
	classes: ClassType;
	extraData?: number[];
	rowName: string;
	property: string;
};

export type TableRowType = {
	key: number | string;
	name: string;
	data: number[];
	rowName: string;
};
