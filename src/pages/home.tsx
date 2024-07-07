import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Play } from "phosphor-react";
import { z } from "zod";
import { useState } from "react";

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, "Informe a tarefa"),
	minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activerCycleId, setActiveCycleId] = useState<string | null>(null);
	const [pastSecondsAmount, setPastSecondsAmount] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	function handleCreateNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
		};

		setActiveCycleId(id);

		setCycles((state) => [...state, newCycle]);

		reset();
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activerCycleId);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - pastSecondsAmount : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondsAmount).padStart(2, "0");
	const task = watch("task");
	const isSubmitButtonDisabled = !task;

	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				className="flex flex-col items-center gap-14"
			>
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
						step={5}
						min={5}
						max={60}
						{...register("minutesAmount", { valueAsNumber: true })}
					/>

					<span>minutos.</span>
				</div>

				<div className="font-robotoMono text-[10rem] leading-[8rem] text-base-100 flex gap-4">
					<span className="bg-base-600 py-8 px-4 rounded-lg">{minutes[0]}</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">{minutes[1]}</span>
					<span className="text-emerald-500 flex items-center justify-center py-8 w-16">
						:
					</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">{seconds[0]}</span>
					<span className="bg-base-600 py-8 px-4 rounded-lg">{seconds[1]}</span>
				</div>

				<button
					type="submit"
					disabled={isSubmitButtonDisabled}
					className="bg-product-500 w-full flex items-center gap-2 justify-center p-4 rounded-lg
					font-bold cursor-pointer text-base-100 hover:bg-product-600 transition-colors
					disabled:bg-product-700 disabled:cursor-not-allowed"
				>
					<Play size={24} />
					Começar
				</button>
			</form>
		</div>
	);
}
