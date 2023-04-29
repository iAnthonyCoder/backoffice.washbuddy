export default function (props) {

    let currentUrlParams = new URLSearchParams(window.location.search)

    let filter_field = currentUrlParams.getAll('filter_field[]')
    let filter_type = currentUrlParams.getAll('filter_type[]')
    let filter_value = currentUrlParams.getAll('filter_value[]')
    
    if(props.filter_field && props.filter_type){

        let index = filter_field.indexOf(props.value)

        if(index>=0){
            return {
                filter_field: filter_field[index],
                filter_type: filter_type[index],
                filter_value: filter_value[index]
            }
        }

    } else {
        return filter_field.map((x, i) => {
            return {
                filter_field: filter_field[i],
                filter_type: filter_type[i],
                filter_value: filter_value[i]
            }
        })
    }

}