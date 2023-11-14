import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import currencies from "../data/currencies.json"

export const CurrencySeleccionada = () => {
	const [currencyId, setCurrencyId] = useState(null)
	const { id } = useParams()

	console.log({ id })
	useEffect(() => {
		setCurrencyId(currency.find(currency => currency.id === Number(id)))
	}, [id])

	if (!currencyId) return <div>Cargando...</div>

	return (
		<main>
			<h1>Detalle de la divisa:</h1>
			<h2>{currencyId.type}</h2>
			<img width={300} src={currencyId.img} alt={currencyId.type} />
			<p>{currencyId.description}</p>
		</main>
	)
}