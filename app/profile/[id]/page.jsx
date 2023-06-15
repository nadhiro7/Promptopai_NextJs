'use client';
import { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import { useParams } from 'next/navigation';
function page ()
{
    const [ prompts, setPrompts ] = useState( [] );
    const [user , setUser] = useState({})
    const params = useParams()
    useEffect( () =>
    {
        const fetchUser = async () =>
        {
            const response = await fetch( `/api/user/${ params.id }` );
            const data = await response.json();
            setUser( data );
        };
        const fetchPrompts = async () =>
        {
            const response = await fetch( `/api/user/${ params.id }/prompt` );
            const data = await response.json();
            setPrompts( data );
        };
        if ( params.id ){
            fetchUser()
            fetchPrompts();
        }
    }, [] );

    return (
        <Profile
            name={user?.username}
            desc='Welcome to your personalized profile page'
            data={ prompts }
        />
    );
}

export default page;