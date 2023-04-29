import UserProfile from "src/views/pages/user-profile/UserProfile";


const UserProfileTab = (props) => {
    return <UserProfile {...props} />
}


export async function getServerSideProps(context){
    const { 
        params:{
            id
        } 
    } = context

    return {
        props: {
            id
        }
    }
   
}

export default UserProfileTab
