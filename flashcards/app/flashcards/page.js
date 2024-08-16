'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    useEffect(() => {}, [user])

    //In case te user signs out while on the page
    if(!isLoaded || !isSignedIn) {
        return null
    }

    

    console.log(user.id) 

    return <></>
}