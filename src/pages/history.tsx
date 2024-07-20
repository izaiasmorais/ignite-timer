import { useContext } from "react";
import { HistoryTable } from "../components/history/history-table";
import { CyclesContext } from "../context/cycles-context";

export function History() {
	const { cycles } = useContext(CyclesContext);

	return (
		<div className="flex-1 p-14 flex flex-col">
			<h1 className="text-2xl text-gray-100">Meu Histórico</h1>

			<div className="flex-1 overflow-auto mt-8">
				<HistoryTable />
			</div>
		</div>
	);
}
