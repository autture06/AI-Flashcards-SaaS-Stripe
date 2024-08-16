'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "../../firebase"
import {Container, Grid, Card, CardActionArea, CardContent, Typography} from '@mui/material'
import {useRouter} from 'next/navigation'

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;

            //Check to see if document exists
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                //Get all collection names from doc
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            }
            else {
                await setDoc(docRef, {flashcards: []});
            }
        }
        getFlashcards()
    }, [user])

    //In case te user signs out while on the page
    if(!isLoaded || !isSignedIn) {
        return null;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{mt: 4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard)} sx={{cursor: 'pointer'}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {flashcard}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}