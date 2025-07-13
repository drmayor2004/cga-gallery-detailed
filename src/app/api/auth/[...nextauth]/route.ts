import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { NextRequest } from 'next/server'

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

async function GET(req: NextRequest) {
  const handler = NextAuth(authOptions)
  return handler(req)
}

async function POST(req: NextRequest) {
  const handler = NextAuth(authOptions)
  return handler(req)
}

export { GET, POST }