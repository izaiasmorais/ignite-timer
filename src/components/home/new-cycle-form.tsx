import { useContext } from "react";

import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../contexts/cycles-context";

export function NewCycleForm() {
	const { activeCycle } = useContext(CyclesContext);
	const { register } = useFormContext();

	return (
		<div
			className="w-full flex items-center justify-center gap-2 text-base-100 text-lg
				font-bold flex-wrap"
		>
			<label htmlFor="task">Vou trabalhar em</label>
			<input
				type="text"
				id="task"
				list="task-suggestions"
				className="bg-transparent h-10 border-0 border-base-500 border-b-2 font-bold text-lg
						text-base-100 flex-1 placeholder:shadow-none focus:border-emerald-500 focus:outline-none
						appearance-none"
				placeholder="Nome do projeto"
				{...register("task")}
				disabled={!!activeCycle}
			/>

			<datalist id="task-suggestions">
				<option value="Projeto 1" />
				<option value="Projeto 2" />
				<option value="Projeto 3" />
				<option value="Projeto 4" />
			</datalist>

			<label htmlFor="minutesAmount">durante</label>
			<input
				id="minutesAmount"
				type="number"
				className="bg-transparent h-10 border-0 border-base-500 border-b-2 font-bold text-lg
						text-base-100 flex-1 w-16 placeholder:shadow-none focus:border-emerald-500 focus:outline-none"
				placeholder="00"
				step={1}
				min={1}
				max={60}
				{...register("minutesAmount", { valueAsNumber: true })}
				disabled={!!activeCycle}
			/>

			<span>minutos.</span>
		</div>
	);
}
