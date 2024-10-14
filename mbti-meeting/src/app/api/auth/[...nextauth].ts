// import NextAuth from 'next-auth';
// import { SupabaseAdapter } from '@next-auth/supabase-adapter';
// import KakaoProvider from 'next-auth/providers/kakao';
//
// export default NextAuth({
//     providers: [
//         KakaoProvider({
//             clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
//             clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
//         }),
//     ],
//     debug:true,
//     callbacks:{
//         async session({ session, user }) {
//             console.log("session callback ",session)
//             console.log(user)
//             return session;
//         },
//     },
//     adapter: SupabaseAdapter({
//         url: process.env.NEXT_PUBLIC_SUPABASE_URL,
//         secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
//     }),
//     secret: process.env.NEXTAUTH_SECRET,
// });