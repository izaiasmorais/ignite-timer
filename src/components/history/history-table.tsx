import { CyclesContext } from "../../contexts/cycles-context";
import { HistoryTableHeaderItem } from "./history-table-header-item";
import { HistoryTableItem } from "./history-table-item";
import { useContext } from "react";

export function HistoryTable() {
	const { cycles } = useContext(CyclesContext);

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
				{cycles.map((cycle) => (
					<HistoryTableItem key={cycle.id} cycle={cycle} />
				))}
			</tbody>
		</table>
	);
}
