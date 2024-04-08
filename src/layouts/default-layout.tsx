import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div className="bg-base-800 w-full h-screen flex items-center justify-center">
			<div className="bg-base-700 text-white w-[1200px] rounded-md p-12">
				<Header />
				<Outlet />
			</div>
		</div>
	);
}
