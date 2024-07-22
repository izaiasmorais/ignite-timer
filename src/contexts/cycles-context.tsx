import { createContext, useEffect, useReducer, useState } from "react";
import { cyclesReducers } from "../reducers/cycles/reducer";
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/action";

export interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptionDate?: Date;
	finishedDate?: Date;
}

interface NewCycleFormData {
	task: string;
	minutesAmount: number;
}

interface CyclesContextData {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	pastSecondsAmount: number;
	setPastSecondsAmount: React.Dispatch<React.SetStateAction<number>>;
	createNewCycle: (data: NewCycleFormData) => void;
	markCurrentCycleAsFinished: () => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cyclesState, dispatch] = useReducer(cyclesReducers, {
		cycles: [],
		activeCycleId: null,
	});

	const [pastSecondsAmount, setPastSecondsAmount] = useState(0);

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);

		localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
	}, [cyclesState]);

	const { cycles, activeCycleId } = cyclesState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function createNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch(addNewCycleAction(newCycle));

		setPastSecondsAmount(0);
	}

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction());
	}

	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction());
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				pastSecondsAmount,
				setPastSecondsAmount,
				createNewCycle,
				interruptCurrentCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	);
}
