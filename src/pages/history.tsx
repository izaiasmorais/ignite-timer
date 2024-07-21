import { HistoryTable } from "../components/history/history-table";

export function History() {
	return (
		<div className="flex-1 p-14 flex flex-col">
			<h1 className="text-2xl text-gray-100">Meu Histórico</h1>

			<div className="flex-1 overflow-auto mt-8">
				<HistoryTable />
			</div>
		</div>
	);
}
