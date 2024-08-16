'use client'
import { useUser } from "@clerk/nextjs"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()

    //In case te user signs out while on the page
    if(!isLoaded || !isSignedIn) {
        return null
    }

    console.log(user.id) 

    return <></>
}