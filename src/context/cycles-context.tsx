import { createContext, useState } from "react";

interface Cycle {
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

export function CyclesContextProvider({ children }: { children: React.ReactNode }) {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [pastSecondsAmount, setPastSecondsAmount] = useState(0);
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

	function createNewCycle(data: NewCycleFormData) {
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

		// reset();
	}

	function interruptCurrentCycle() {
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
