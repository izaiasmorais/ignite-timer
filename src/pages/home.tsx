import { NewCycleForm } from "../components/home/new-cycle-form";
import { CyclesContext } from "../contexts/cycles-context";
import { CountDown } from "../components/home/countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import * as zod from "zod";

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(1, "O ciclo precisa ser de no mínimo 1 minutos.")
		.max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { createNewCycle, activeCycle, interruptCurrentCycle } =
		useContext(CyclesContext);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	function handleCreateNewCycle(data: NewCycleFormData) {
		createNewCycle(data);
		reset();
	}

	const task = watch("task");
	const isSubmitButtonDisabled = !task;

	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				className="flex flex-col items-center gap-14"
			>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>

				<CountDown />

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
						onClick={interruptCurrentCycle}
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
