type data = {
    capital: string,
    country: string
}

export default function Country(props:data) {
    const capital = props.capital
    const country = props.country
    const capitalSeparada = capital.split(',')
    const capitalRevamped = capitalSeparada[0]
    return (
    <div>
        <h4>Pais: {country}</h4>
        <h4>Capital: <a href={"../city/"+capitalRevamped}>{capitalRevamped}</a></h4>
    </div>
    )
}