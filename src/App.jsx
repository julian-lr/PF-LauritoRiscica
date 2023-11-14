import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./views/Home"
import { NavBar } from "./components/NavBar"
import { CurrencySeleccionada } from "./views/CurrencySeleccionada"

import "./App.css"

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/currencies/:id" element={<CurrencySeleccionada />} />
				<Route path="/currencies/:categoryId" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App