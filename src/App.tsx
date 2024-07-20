import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { CyclesContextProvider } from "./context/cycles-context";

export default function App() {
	return (
		<BrowserRouter>
			<CyclesContextProvider>
				<Router />
			</CyclesContextProvider>
		</BrowserRouter>
	);
}
