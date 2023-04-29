import React from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string'

const usePaginationController = (props) => {
    
	const searchQuery = queryString.parse(window.location.search, {arrayFormat:'bracket'})
	const router = useRouter()
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const searchInitialState = searchQuery.search
    const [search, setSearch] = React.useState(searchInitialState) 
    const [pageInfo, setPageInfo] = React.useState({
        total: 0,
        page_number: 1,
        page_size: 4,
    })

    const createQueryString = async (page, size, query, newFilter, extraOpts, includeLocation) => {
        await router.push(
            `${props.link}${_query}${props.requiredParam ? props.requiredParam : ''}`, 
            `${props.linkAs}${_query}${props.requiredParam ? props.requiredParam : ''}`, 
            {
                scroll: false
            }
        )
	}

    return [ items, pageInfo, loading, search, setSearch, setLoading ];

};

export default usePaginationController;