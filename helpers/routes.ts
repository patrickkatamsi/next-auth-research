const routes = [
    {
      label: 'Home',
      route: '/',
      restricted: false,
    },
    {
      route: "/client",
      label: "Client",
      restricted: false,
    },
    {
      route: "/server",
      label: "Server",
      restricted: true,
      eligibleRole: ['developer']
    },
    {
      route: "/protected",
      label: "Protected",
      restricted: true,
      eligibleRole: ['developer', 'admin']
    },
    {
      route: "/api-example",
      label: "API",
      restricted: true,
      eligibleRole: ['developer']
    },
    {
      route: "/admin",
      label: "Admin",
      restricted: true,
      eligibleRole: ['admin']
    },
    {
      route: "/me",
      label: "Me",
      restricted: false
    },
    {
      route: "/login",
      label: "Login",
      restricted: false,
    },
]

export const verify = (pathname: string, role: string) => {
    if(!role) {
        return false
    }

    const finder = routes.find((route) => {
        if(route.route === pathname) {
            if(route.restricted === false) return true
            if(route.restricted === true && route.eligibleRole?.includes(role)) return true
        }
        return false
    })

    console.log(pathname, role)

    return Boolean(finder)
}

export default routes