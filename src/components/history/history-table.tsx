import { HistoryTableHeaderItem } from "./history-table-header-item";
import { HistoryTableItem } from "./history-table-item";

export function HistoryTable() {
	return (
		<table className="w-full border-collapse min-w-[600px]">
			<thead>
				<tr>
					<HistoryTableHeaderItem>Tarefa</HistoryTableHeaderItem>
					<HistoryTableHeaderItem>Duração</HistoryTableHeaderItem>
					<HistoryTableHeaderItem>Início</HistoryTableHeaderItem>
					<HistoryTableHeaderItem>Status</HistoryTableHeaderItem>
				</tr>
			</thead>

			<tbody>
				<HistoryTableItem />
				<HistoryTableItem />
				<HistoryTableItem />
				<HistoryTableItem />
				<HistoryTableItem />
				<HistoryTableItem />
			</tbody>
		</table>
	);
}
