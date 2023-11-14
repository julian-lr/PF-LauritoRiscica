import { Link, useParams } from "react-router-dom"
import currencies from "../data/currencies.json"

export const Currencies = () => {
	const { categoryId } = useParams()

	console.log(categoryId)

	return (
		<ul>
			{currencies.map(currency => (
				<li key={currency.category}>
					{currency.name}
					<Link to={`/currencies/${currency.category}`}>
						<button>Comprar</button>
					</Link>
				</li>
			))}
		</ul>
	)
}