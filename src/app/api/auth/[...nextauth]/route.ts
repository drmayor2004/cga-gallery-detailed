import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  providers: [
    // Add your authentication providers here
    // For now, we'll use a simple credentials provider for demo purposes
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    async session({ session, token }) {
      // Customize session object
      return session
    },
    async jwt({ token, user }) {
      // Customize JWT token
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }