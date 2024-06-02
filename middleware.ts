import { withAuth } from 'next-auth/middleware'
import { sql } from '@vercel/postgres'

const roles = ['Owner', 'Admin', 'Moderator']

export const getRoleEmail = async (email: string) => {
  const role = await sql`SELECT Users.email, Role.name AS user_role
    FROM Users
    JOIN Role ON Users.roleId = Role.id
    WHERE Users.email = ${email};
  `
  if (!role.rows[0]) return false
  return roles.includes(role.rows[0].user_role)
}

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: async ({ token }) => await getRoleEmail(token?.email!),
  },
  pages: {
    signIn: '/',
  },
})

export const config = { matcher: ['/backoffice'] }
