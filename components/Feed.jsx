'use client'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {
        data.map(prompt=>(
          <PromptCard 
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}


function Feed() {
  const [searchText , setSearchText] = useState('')
  const [prompts , setPrompts] = useState([])
  const [searchedPrompts , setSearchedPrompts] = useState(null)
  const router = useRouter()
  const handleSearchChange= (e)=>{
    setSearchText(e.target.value)
    const sp = prompts.filter(p=>{
      if(e.target.value.startsWith("#")) return p.tag.toLowerCase().includes(e.target.value.slice(1).toLowerCase())
      else if (e.target.value.startsWith("@")) return p.creator.username.toLowerCase().includes(e.target.value.slice(1).toLowerCase())
	   else return p.prompt.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setSearchedPrompts(sp)
  }

  useEffect(()=>{
    const fetchPrompts = async ()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPrompts(data);
    }
    fetchPrompts()
  },[])
  const handleTagClick =(tag)=>{
    router.push(`/tag?tag=${tag}`)
  }
  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompt content , a #tag or a @username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedPrompts ? searchedPrompts : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed