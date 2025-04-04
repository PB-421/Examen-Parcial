type data = {
    capital: string,
    country: string
}

export default function Country(props:data) {
    const capital = props.capital
    const country = props.country
    return (
    <div>
        <h4>Pais: {country}</h4>
        <h4>Capital: <a href={"../city/"+capital}>{capital}</a></h4>
    </div>
    )
}