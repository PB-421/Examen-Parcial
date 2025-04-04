type data = {
    country: string,
    city: string,
    temperature: number
}

export default function City(props:data) {
    const city = props.city
    const country = props.country
    const temperature = props.temperature
    return (
    <div>
        <h4>Ciudad: {city}</h4>
        <h4>Pais: <a href={"../country/"+country}>{country}</a></h4>
        <h4>Temperatura: {temperature}</h4>
    </div>
    )
}