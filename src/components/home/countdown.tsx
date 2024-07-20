import { useContext, useEffect } from "react";
import { CyclesContext } from "../../pages/home";
import { differenceInSeconds } from "date-fns";

export function CountDown() {
	const {
		activeCycle,
		activeCycleId,
		markCurrentCycleAsFinished,
		pastSecondsAmount,
		setPastSecondsAmount,
	} = useContext(CyclesContext);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: number;

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					new Date(activeCycle.startDate)
				);

				if (secondsDifference >= totalSeconds) {
					markCurrentCycleAsFinished();
					setPastSecondsAmount(totalSeconds);
					clearInterval(interval);
				} else {
					setPastSecondsAmount(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [
		activeCycle,
		activeCycleId,
		markCurrentCycleAsFinished,
		pastSecondsAmount,
		setPastSecondsAmount,
	]);

	const currentSeconds = activeCycle ? totalSeconds - pastSecondsAmount : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondsAmount).padStart(2, "0");

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [activeCycle, minutes, seconds]);

	return (
		<div className="font-robotoMono text-[10rem] leading-[8rem] text-base-100 flex gap-4">
			<span className="bg-base-600 py-8 px-4 rounded-lg">{minutes[0]}</span>
			<span className="bg-base-600 py-8 px-4 rounded-lg">{minutes[1]}</span>
			<span className="text-emerald-500 flex items-center justify-center py-8 w-16">
				:
			</span>
			<span className="bg-base-600 py-8 px-4 rounded-lg">{seconds[0]}</span>
			<span className="bg-base-600 py-8 px-4 rounded-lg">{seconds[1]}</span>
		</div>
	);
}
