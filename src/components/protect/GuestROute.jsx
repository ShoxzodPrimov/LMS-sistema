import { Navigate } from "react-router-dom";

export default function GuestRoute({children}) {
    const auth = localStorage.getItem('accessToken');
    
    if ( auth ) {
        return <Navigate to={'/dashboard'} />
    }

    return children
}