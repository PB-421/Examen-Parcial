import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import City from "../../components/City.tsx"

type data = {
    country: string,
    city: string,
    temperature: number
}

export const handler:Handlers<data> = {
    GET: async (_req: Request,ctx: FreshContext<unknown,data>) => {
        const {city} = ctx.params
        const apiKey = Deno.env.get("API_KEY")
        if(!apiKey) throw new Error("Api key not found")
        const urlApi = "https://api.api-ninjas.com/v1/city?name="+city
        const data = await fetch(urlApi,{
            headers: {
            'X-Api-Key': apiKey
            }
        })
        if(data.status !== 200) throw new Error("Error en la respuesta de la api City")
        const response = await data.json()
        console.log(response)
        const urlApiWeather = "https://api.api-ninjas.com/v1/weather?lat="+response[0].latitude+"&lon="+response[0].longitude
        const dataWeather = await fetch(urlApiWeather,{
            headers: {
            'X-Api-Key': apiKey
            }
        })
        if(dataWeather.status !== 200) throw new Error("Error en la respuesta de la api Weather")
        const responseWeather = await dataWeather.json()
        return ctx.render({country: response[0].country,city: response[0].name,temperature: responseWeather.temp})
    }
}

export default function Page(props:PageProps<data>) {
    const {country,city,temperature} = props.data
    return (
        <>
            <City country={country} city={city} temperature={temperature} />
        </>
    )

}