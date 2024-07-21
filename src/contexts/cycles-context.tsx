import { createContext, useReducer, useState } from "react";

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
	markCurrentCycleAsFinished: () => void;
	createNewCycle: (data: NewCycleFormData) => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesState {
	cycles: Cycle[];
	activeCycleId: string | null;
}

export function CyclesContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cyclesState, dispatch] = useReducer(
		(state: CyclesState, action: any) => {
			if (action.type === "ADD_NEW_CYCLE") {
				return {
					...state,
					cycles: [...state.cycles, action.payload.newCycle],
					activeCycleId: action.payload.newCycle.id,
				};
			}

			if (action.type === "MARK_CURRENT_CYCLE_AS_FINISHED") {
				return {
					...state,
					cycles: state.cycles.map((cycle) => {
						if (cycle.id === state.activeCycleId) {
							return { ...cycle, finishedDate: new Date() };
						} else {
							return cycle;
						}
					}),
					activeCycleId: null,
				};
			}

			return state;
		},
		{
			cycles: [],
			activeCycleId: null,
		}
	);

	const [pastSecondsAmount, setPastSecondsAmount] = useState(0);
	const { cycles, activeCycleId } = cyclesState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function markCurrentCycleAsFinished() {
		dispatch({
			type: "MARK_CURRENT_CYCLE_AS_FINISHED",
			payload: {
				activeCycleId,
			},
		});

		// setCycles((state) =>
		// 	state.map((cycle) => {
		// 		if (cycle.id === activeCycleId) {
		// 			return { ...cycle, finishedDate: new Date() };
		// 		} else {
		// 			return cycle;
		// 		}
		// 	})
		// );
	}

	function createNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		// setCycles((state) => [...state, newCycle]);
		dispatch({
			type: "ADD_NEW_CYCLE",
			payload: {
				newCycle,
			},
		});

		setPastSecondsAmount(0);
	}

	function interruptCurrentCycle() {
		dispatch({
			type: "INTERRUPT_CURRENT_CYCLE",
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
