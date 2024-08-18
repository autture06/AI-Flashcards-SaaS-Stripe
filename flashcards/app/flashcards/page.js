'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "../../firebase"
import { Container, Grid, Card, CardActionArea, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from 'next/link';

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
                const collections = docSnap.data().flashcards
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
        <div>
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: 'primary' }} elevation={0}>
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
                    FlashMaster
                </Typography>
                <SignedOut>
                    <Link href="/sign-in" passHref>
                    <Button sx={{ color: 'white' }}>
                        Login
                    </Button>
                    </Link>
                    <Link href="/sign-up" passHref>
                    <Button variant="outlined" sx={{ ml: 2, color: 'white', borderColor: 'white' }}>
                        Sign Up
                    </Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="md">
                <Grid container spacing={3} sx={{mt: 4}}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)} sx={{cursor: 'pointer'}}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
