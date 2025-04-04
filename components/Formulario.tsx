
type data = {
    phone: string,
    country: string,
    is_valid: boolean
}

export default function Formulario(props:data) {
    const phone = props.phone || null
    const country = props.country
    const is_valid = props.is_valid
    return (
    <>
    <form method="GET" action="/" >
    <input name="phone" type="text" placeholder="telefono" required/>
    <button type="submit">Enviar</button>
    </form>
    {!is_valid && phone && <h4 style={{color: "red"}}>Telefono no valido</h4>}
    {is_valid && <h4>Telefono: {phone}</h4>}
    {is_valid && <h4>Pais: <a href={"../country/"+country}>{country}</a></h4>}
    </>
    )
}