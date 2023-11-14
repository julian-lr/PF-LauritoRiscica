import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"

import data from "../data/currencies.json"

export const Home = () => {
	const [currencies, setCurrencies] = useState([])
	const { currencyId } = useParams()

	useEffect(() => {
		if (currencyId) {
			const currenciesFilteredByCategory = data.filter(
				currency => currency.category === currencyId
			)

			console.log({ data, currenciesFilteredByCategory })
			setCurrencies(currenciesFilteredByCategory)
		} else {
			setCurrencies(data)
		}
	}, [currencyId])

	return (
		<Container>
			<div className="d-flex container flex-wrap">
				{currencies.map(currency => (
					<Card key={currency.id}>
						<Card.Img variant="top" src={currency.img} height="200" />
						<Card.Body>
							<Card.Title>{currency.type}</Card.Title>
							<Card.Text>{currency.description}</Card.Text>
							<Link to={`/currencies/${currency.id}`}>
								<Button variant="primary">Comprar</Button>
							</Link>
						</Card.Body>
					</Card>
				))}
			</div>
		</Container>
	)
}