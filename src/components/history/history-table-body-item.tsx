interface HistoryTableBodyItemProps {
	children: React.ReactNode;
}

export function HistoryTableBodyItem({ children }: HistoryTableBodyItemProps) {
	return (
		<td
			className="bg-base-700 border-4 border-base-800 p-4 text-sm leading-6
		first:w-[50%] first:pl-6 last:pr-6"
		>
			{children}
		</td>
	);
}
