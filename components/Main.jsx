import React, { useEffect, useState } from "react"
export default function Main() {
const [meme,setMeme] = useState({
    topText:"One does not simply",
    bottomText:"Walk into Mordor",
    imgUrl:"http://i.imgflip.com/1bij.jpg"
})
  const [allMemes, setAllMemes] = useState([])
useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes").then(res=>{
        res.json().then(data=>{
            setAllMemes(data.data.memes)
            console.log(allMemes)
            const randomIndex = Math.floor(Math.random() * allMemes.length)
            const randomUrl = allMemes[randomIndex].url

        })
    })
},[])

   function getNewMemeImage() {
        if (allMemes.length === 0) return
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const randomUrl = allMemes[randomIndex].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl: randomUrl
        }))
    }
function handleChange(event) {
    const {value,name} = event.currentTarget
    setMeme(prevMeme=> ({
        ...prevMeme,[name]:value
        
    }))
}
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder={meme.topText}
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder={meme.bottomText}
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                        
                    />
                </label>
                <button onClick={getNewMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.imgUrl}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}