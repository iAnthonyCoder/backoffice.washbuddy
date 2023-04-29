import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

function GetFiltersHook(props) {

	const router = useRouter()

  	const [allFilters, setAllFilters] = useState([]);

	const handleAllFilters = (paramsString) => {

		let currentUrlParams = new URLSearchParams(paramsString)

    	let filter_field = currentUrlParams.getAll('filter_field[]')
    	let filter_type = currentUrlParams.getAll('filter_type[]')
    	let filter_value = currentUrlParams.getAll('filter_value[]')
		
    	
    	setAllFilters(filter_field.map((x, i) => {
			return {
				filter_field: filter_field[i],
				filter_type: filter_type[i],
				filter_value: filter_value[i]
			}
		}))
	}

  	useEffect(() => {
		const handleRouteChange = (url) => {
		  	handleAllFilters(url.split('?')[1])
		}
	
		router.events.on('routeChangeStart', handleRouteChange)
	
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [])

	useEffect(() => {
		handleAllFilters(window.location.href.split('?')[1])
	}, [])


  	return [
		allFilters,
	]

}

export default GetFiltersHook