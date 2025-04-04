import { FreshContext, PageProps } from "$fresh/server.ts";
import Formulario from "../components/Formulario.tsx";
import { Handlers } from "$fresh/server.ts";

type data = {
  format_international: string,
  country: string,
  is_valid: boolean
}

export const handler:Handlers<data> = {
    GET: async (req:Request, ctx:FreshContext<unknown,data>) => {
      const url = new URL(req.url)
      const phone = url.searchParams.get("phone")|| undefined
      if(phone === undefined) return ctx.render({format_international: "",country: "",is_valid: false})
      const apiKey = Deno.env.get("API_KEY")
      if(!apiKey) throw new Error("Api key not found")
      const urlApi = "https://api.api-ninjas.com/v1/validatephone?number="+phone
      const data = await fetch(urlApi,{
        headers: {
          'X-Api-Key': apiKey
        }
      })
      if(data.status !== 200) throw new Error("Error en la respuesta de la api Phone")
      const response = await data.json()
      return ctx.render({format_international: response.format_international,country: response.country,is_valid: response.is_valid})
    }
}

export default function Home(props:PageProps<data>) {
  const {format_international,country,is_valid} = props.data
  return (
    <Formulario phone={format_international} country={country} is_valid={is_valid}/>
  );
}
