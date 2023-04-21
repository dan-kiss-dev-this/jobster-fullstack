import { useEffect } from "react"

export default function Dashboard() {
    const fetchData = async () => {
        try {
            // note the package.json here has the proxy value added so '/api/v1' maps to 'http://localhost:4000' we dont use just '/' as per the create react app defaults that links to index.html page which is not something we can make into a json() which leads to the error ' SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON'
            const response = await fetch('/api/v1')
            const data = await response.json()
            console.log(66, data)
        } catch (error) {
            console.log(88, error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>Dashboard</div>
    )
}
