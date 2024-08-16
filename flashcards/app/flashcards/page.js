'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import db from "@/firebase"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    useEffect(() => {
        async function getFlashcards() {
            if (user === undefined) {
                return
            }
            //Check to see if document exists
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)
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