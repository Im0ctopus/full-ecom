import { handleUser } from '@/lib/queries'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await handleUser(user.email!)
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
