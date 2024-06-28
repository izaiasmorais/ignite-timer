import { Play } from "phosphor-react";
import { useState } from "react";

export function Home() {
	const [task, setTask] = useState("");

	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<form className="flex flex-col items-center gap-14">
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
					/>

					<datalist id="task-suggestions">
						<option value="Projeto 1" />
						<option value="Projeto 2" />
						<option value="Projeto 3" />
						<option value="Projeto 4" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<input
						type="number"
						id="minutesAmount"
						className="bg-transparent h-10 border-0 border-base-500 border-b-2 font-bold text-lg
						text-base-100 flex-1 w-16 placeholder:shadow-none focus:border-emerald-500 focus:outline-none"
						placeholder="00"
						step={5}
						min={5}
						max={60}
					/>

					<span>minutos.</span>
				</div>

				<div className="font-robotoMono text-[10rem] leading-[8rem] text-base-100 flex gap-4">
					<span className="bg-base-600 py-8 px-4 rounded-lg">0</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">0</span>
					<span className="text-emerald-500 flex items-center justify-center py-8 w-16">
						:
					</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">0</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">0</span>
				</div>

				<button
					type="submit"
					className="bg-product-500 w-full flex items-center gap-2 justify-center p-4 rounded-lg
					font-bold cursor-pointer text-base-100 hover:bg-product-600 transition-colors"
				>
					<Play size={24} />
					Começar
				</button>
			</form>
		</div>
	);
}
