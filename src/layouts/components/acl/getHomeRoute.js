/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'administrator') return '/admin'
  else if (role === 'owner') return '/business'
  else return '/'
}

export default getHomeRoute
