import {QueryFunctionContext} from "@tanstack/react-query";

export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL


interface HttpFetcherProps {
    contentType: string
}

const defaultOption: HttpFetcherProps = {
    contentType: "application/json",
}

export async function httpFetcher<T>(queryContext: QueryFunctionContext): Promise<T> {
    try {
        console.log(queryContext,defaultOption)

        const keys = queryContext.queryKey.join("/")
        console.log(keys)
        const result = await fetch(`${serverURL}/${keys}`, {
            headers: {
                "Content-Type": defaultOption.contentType,
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NWEyNTcwOC1lNDBiLTRjOGUtOTgzYy0wZTI2NWJmNjY1MzMiLCJpYXQiOjE3MjgxMTQwNDYsImV4cCI6MjA0MzQ3NDA0NiwiaWQiOjEsInByb3ZpZGVyIjoia2FrYW8iLCJlbWFpbCI6Im5vdmEwMjA1MTBAbmF2ZXIuY29tIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0wNFQxMDoyMTozOS4yNDMyMTQiLCJtZW1iZXIiOnsiaWQiOjEsIm5pY2tOYW1lIjoi7J247YWU65ah7IOB6riw7JuQM-uFhOywqCIsIm1idGkiOiJJTlRQIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0wNFQxMDoyMTo0My42NDk0NTEiLCJwcm9maWxlSW1hZ2UiOnsiaWQiOjEsImZpbGUiOnsiaWQiOjEsInByb2ZpbGVVcmwiOiIvVXNlcnMva290bGluYW5kbm9kZS9zZXVuZ2hvL3VwbG9hZHMv4YSJ4YWz4YSP4YWz4YSF4YW14Yar4YSJ4YWj4Ya6IDIwMjQtMTAtMDIg4YSL4YWp4YSS4YWuIDExLjE1LjI0LnBuZyIsImNyZWF0ZWRBdCI6bnVsbH19fX0.-qStonxjOkLl3sG6GQ1AUT-o4y_id8zCWUA0gu_YoXw'
            }
        })
        const jsonData = await result.json();
        console.log(jsonData)
        return jsonData as T
    } catch (e) {
        console.log(e)
        throw Error(e)
    }

}