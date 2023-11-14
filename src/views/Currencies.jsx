import { Link, useParams } from "react-router-dom"

import currencies from "../data/currencies.json"

export const Currencies = () => {
	const { categoryId } = useParams()

	console.log(categoryId)

	return (
		<ul>
			{currencies.map(currency => (
				<li key={currency.id}>
					{currency.name}
					<Link to={`/currencies/${currency.id}`}>
						<button>Comprar</button>
					</Link>
				</li>
			))}
		</ul>
	)
}