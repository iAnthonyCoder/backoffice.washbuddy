import { Router, useRouter } from "next/router"

export default function (props) {
	console.log(props);
	const { router, href, as, params } = props

    let currentUrlParams = new URLSearchParams(window.location.search)
  
    params && params.length > 0 && params.map(x => {
      	if(x.type === 'replace'){
        	currentUrlParams.set(x.key, x.value)
      	}
      	if(x.type === 'remove'){
        	currentUrlParams.delete(x.key)
      	}
    })
	
    router.push(
		router.pathname+'?'+currentUrlParams.toString(), 
		router.asPath ? router.asPath.split('?')[0]+'?'+currentUrlParams.toString() : undefined, 
		{ 
			shallow: true 
		}
	)
}