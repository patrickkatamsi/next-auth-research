import { withAuth } from "next-auth/middleware"
import routes, {verify} from "./helpers/routes"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // @ts-ignore
      if(verify(req.nextUrl.pathname, token?.user?.userRole)) return true
      return false
    },
  },
})

const matcher = routes.map((route) => route.route)
export const config = { matcher: ['/me'] }
