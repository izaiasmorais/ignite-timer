import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
	return (
		<div className="flex items-center justify-between">
			<img src="/Logo.svg" alt="" />

			<nav className="flex gap-2">
				<NavLink
					to="/"
					title="Timer"
					className="border-transparent border-[3px] active:bg-green-500"
				>
					<Timer size={24} />
				</NavLink>

				<NavLink
					to="/history"
					title="Histórico"
					className="border-transparent border-[3px] active:bg-green-500"
				>
					<Scroll size={24} />
				</NavLink>
			</nav>
		</div>
	);
}
