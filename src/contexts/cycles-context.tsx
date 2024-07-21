import { createContext, useReducer, useState } from "react";
import { ActionTypes, cyclesReducers } from "../reducers/cycles";

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
	const { cycles, activeCycleId } = cyclesState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function markCurrentCycleAsFinished() {
		dispatch({
			type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
			payload: {
				activeCycleId,
			},
		});
	}

	function createNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch({
			type: ActionTypes.ADD_NEW_CYCLE,
			payload: {
				newCycle,
			},
		});

		setPastSecondsAmount(0);
	}

	function interruptCurrentCycle() {
		dispatch({
			type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
			payload: {
				activeCycleId,
			},
		});
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
