'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
function page ()
{
    const router = useRouter();
    const [ prompts, setPrompts ] = useState( [] );
    const { data: session } = useSession();
    useEffect( () =>
    {
        const fetchPrompts = async () =>
        {
            const response = await fetch( `/api/user/${ session?.user.id }/prompt` );
            const data = await response.json();
            setPrompts( data );
        };
        if ( session?.user.id ) fetchPrompts();
    }, [ session ] );
    const handleEdit = async ( prompt ) =>
    {
        router.push( `/update-prompt?id=${ prompt._id }` );
    };

    const handleDelete = async ( prompt ) =>
    {
        const hasConfirmed = confirm( "are you sure want to delete this prompt?" );
        if ( hasConfirmed )
        {
            try
            {
                await fetch( `/api/prompt/${ prompt._id.toString() }`,
                    {
                        method: "DELETE"
                    }
                );
                const filteredPrompt = prompts.filter( p => p._id !== prompt._id );
                setPrompts( filteredPrompt );
            } catch ( error )
            {
                console.log( error );
            }
        }
    };

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={ prompts }
            handleEdit={ handleEdit }
            handleDelete={ handleDelete }
        />
    );
}

export default page;