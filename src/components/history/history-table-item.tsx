import { HistoryTableBodyItem } from "./history-table-body-item";

export function HistoryTableItem() {
	return (
		<tr>
			<HistoryTableBodyItem>Estudar React</HistoryTableBodyItem>
			<HistoryTableBodyItem>20 minutos</HistoryTableBodyItem>
			<HistoryTableBodyItem>Há 2 dias</HistoryTableBodyItem>
			<HistoryTableBodyItem>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-green-500" />
					Concluído
				</div>
			</HistoryTableBodyItem>
		</tr>
	);
}
