import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    // http://localhost:3000/api/auth/providersで、callback分かる
    // http://sinple-post.vercel.app/api/auth/providersで、callback分かる
    // https://simple-post-git-main-akiogitgit.vercel.app/api/auth/providers
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  // adapter: PrismaAdapter(prisma),
  secret: 'secret',
})
