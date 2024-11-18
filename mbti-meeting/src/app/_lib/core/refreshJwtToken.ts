export default  async function refreshJwtToken (token: string) {
    return await fetchRefreshTokenWithSupabase(token);
}
async function fetchRefreshTokenWithSupabase(refreshToken: string) {
    const body = {
        "refresh_token": refreshToken,
    }
    const response  = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,{
        body:JSON.stringify(body),
        method: 'POST',
        headers:{
            "apikey":`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type":"application/json"
        }
    });
    return await response.json();

}