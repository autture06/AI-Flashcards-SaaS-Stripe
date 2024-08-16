'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { collection, doc } from "firebase/firestore"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    useEffect(() => {
        async function getFlashcards() {
            //Check to see if document exists
            const docRef = doc(collection(firestore, 'users'), user.id)
            if(docSnap.exists()) {
                console.log('User exists')
            }
            else {
                await setDoc(docRef, {flashcards: []})
            }
        }
    }, [user])

    //In case te user signs out while on the page
    if(!isLoaded || !isSignedIn) {
        return null
    }

    

    console.log(user.id) 

    return <></>
}