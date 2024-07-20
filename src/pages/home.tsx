import { createContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { NewCycleForm } from "../components/home/new-cycle-form";
import { CountDown } from "../components/home/countdown";
import * as zod from "zod";

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
		.max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptionDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextData {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	pastSecondsAmount: number;
	setPastSecondsAmount: React.Dispatch<React.SetStateAction<number>>;
	markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycle, setActiveCycle] = useState<Cycle | undefined>(undefined);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [pastSecondsAmount, setPastSecondsAmount] = useState(0);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	function handleCreateNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setActiveCycleId(id);

		setCycles((state) => [...state, newCycle]);

		setPastSecondsAmount(0);

		reset();
	}

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
	}

	function handleInterruptCycle() {
		setActiveCycleId(null);

		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptionDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
	}

	const task = watch("task");
	const isSubmitButtonDisabled = !task;

	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				className="flex flex-col items-center gap-14"
			>
				<CyclesContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						markCurrentCycleAsFinished,
						pastSecondsAmount,
						setPastSecondsAmount,
					}}
				>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>

					<CountDown />
				</CyclesContext.Provider>

				{!activeCycle && (
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
				)}

				{activeCycle && (
					<button
						type="submit"
						disabled={isSubmitButtonDisabled}
						onClick={handleInterruptCycle}
						className="bg-red-500 w-full flex items-center gap-2 justify-center p-4 rounded-lg
					font-bold cursor-pointer text-base-100 hover:bg-red-600 transition-colors"
					>
						<HandPalm size={24} />
						Interromper
					</button>
				)}
			</form>
		</div>
	);
}
