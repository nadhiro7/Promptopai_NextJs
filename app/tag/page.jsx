'use client'
import PromptCard from "@components/PromptCard";
import { useSearchParams } from "next/navigation"
import {useState , useEffect} from 'react'
function PromptsByTag() {
    const params = useSearchParams ()
    const [ prompts, setPrompts ] = useState( [] );
    useEffect( () =>
    {
        const fetchPrompts = async () =>
        {
            const response = await fetch( `/api/prompt/tag/${ params.get('tag') }` );
            const data = await response.json();
            setPrompts( data );
        };
        if (params.get('tag')){
            fetchPrompts();
        }
    }, [] );
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>#{params.get('tag')}</span>
      </h1>
      <div className='mt-10 prompt_layout'>
      {
        prompts.map(prompt=>(
          <PromptCard
            key={prompt._id}
            prompt={prompt}
          />
        ))
      }
    </div>
    </section>
  )
}

export default PromptsByTag