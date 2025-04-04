import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx"
import Footer from "../components/Footer.tsx"


export default function layout(props:PageProps) {
    const Component = props.Component
    return (
        <>
        <Header />
        <Component />
        <Footer />
        </>
    )

}