import { useCookie } from 'next-cookie'

export default function getUserTokenFromCookies(context){
    const string = useCookie(context).cookie.cookies['accessToken']
    if(string){
        return string
    } else {
        return 'invalid'
    }
    
}