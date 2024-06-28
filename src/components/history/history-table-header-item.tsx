interface HistoryTableHeaderItemProps {
	children: React.ReactNode;
}

export function HistoryTableHeaderItem({
	children,
}: HistoryTableHeaderItemProps) {
	return (
		<th
			className="bg-base-600 p-4 text-left text-gray-100 text-sm leading-6 first:rounded-tl-lg
		first:pl-6 last:rounded-tr-lg last:pr-6"
		>
			{children}
		</th>
	);
}
