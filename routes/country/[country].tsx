import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Country from "../../components/Country.tsx"
type data = {
    country: string,
    capital: string
}

export const handler:Handlers<data> = {
    GET: async (_req: Request,ctx: FreshContext<unknown,data>) => {
        const {country} = ctx.params
        const apiKey = Deno.env.get("API_KEY")
        if(!apiKey) throw new Error("Api key not found")
        const urlApi = "https://api.api-ninjas.com/v1/country?name="+country
        const data = await fetch(urlApi,{
            headers: {
            'X-Api-Key': apiKey
            }
        })
        if(data.status !== 200) throw new Error("Error en la respuesta de la api Country")
        const response = await data.json()
        const countrySeparated = country.split('%20')
        if(countrySeparated[1]){
        const countryRevamped = countrySeparated[0] +" "+ countrySeparated[1]
        return ctx.render({country: countryRevamped, capital: response[0].capital})
        }
        return ctx.render({country: country, capital: response[0].capital})
    }
}

export default function Page(props:PageProps<data>) {
    const {country,capital} = props.data
    return (
        <>
        <Country country={country} capital={capital}/>
        </>
    )

}