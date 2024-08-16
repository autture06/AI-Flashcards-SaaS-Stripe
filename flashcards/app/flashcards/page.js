'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    useEffect(() => {
        async function getFlashcards() {
            //Check to see if document exists
            const docRef = doc(collection(firestore, 'users'), user.id)
            if(docSnap.exists()) {
                //Get all collection names
                const collections = await getDocs(docRef)

            }
            else {
                //Create
                await setDoc(docRef, {})
            }
        }

        getFlashcards()
    }, [user])

    //In case te user signs out while on the page
    if(!isLoaded || !isSignedIn) {
        return null
    }

    

    console.log(user.id) 

    return <></>
}