import type { Cycle } from "../../contexts/cycles-context";
import { HistoryTableBodyItem } from "./history-table-body-item";
import { formatDistanceToNow } from "date-fns";

interface HistoryTableItemProps {
	cycle: Cycle;
}

export function HistoryTableItem({ cycle }: HistoryTableItemProps) {
	return (
		<tr key={cycle.id}>
			<HistoryTableBodyItem>{cycle.task}</HistoryTableBodyItem>
			<HistoryTableBodyItem>{cycle.minutesAmount} minutos</HistoryTableBodyItem>
			<HistoryTableBodyItem>
				{formatDistanceToNow(new Date(cycle.startDate), {
					addSuffix: true,
				})}
			</HistoryTableBodyItem>
			<HistoryTableBodyItem>
				{cycle.finishedDate && (
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-green-500" />
						Concluído
					</div>
				)}

				{cycle.interruptionDate && (
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-red-500" />
						Interrompido
					</div>
				)}

				{!cycle.finishedDate && !cycle.interruptionDate && (
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-yellow-500" />
						Em andamento
					</div>
				)}
			</HistoryTableBodyItem>
		</tr>
	);
}
