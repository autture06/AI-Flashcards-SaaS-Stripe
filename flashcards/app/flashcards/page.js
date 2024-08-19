'use client';

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "../../firebase"
import { Container, Grid, Card, CardActionArea, CardContent, Typography, AppBar, Toolbar, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;

            // Check to see if document exists
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Get all collection names from doc
                const collections = docSnap.data().flashcards;
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    // In case the user signs out while on the page
    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) {
            router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <div>
            <SignedIn>
                {/* Navbar */}
                <AppBar position="static" sx={{ bgcolor: 'primary' }} elevation={0}>
                    <Toolbar>
                        {/* Left section with FlashMaster text and links */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            {/* FlashMaster text with hover effect */}
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    mx: 1,
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        textDecoration: 'none',
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                onClick={() => router.push('/')}
                            >
                                FlashMaster
                            </Typography>

                            {/* SignedIn section with Generate and Flashcards */}
                            <SignedIn sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    variant="h8"
                                    sx={{
                                        color: 'lightgrey',
                                        mx: 1,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'none', color: 'white' }
                                    }}
                                    onClick={() => router.push('/generate')}
                                >
                                    Generate
                                </Typography>
                                <Box display='flex' flexDirection='column' sx={{ position: 'relative', alignItems: 'center' }}>
                                    <Typography
                                        variant="h8"
                                        sx={{
                                            color: 'lightgrey',
                                            mx: 1,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'none', color: 'white' }
                                        }}
                                        onClick={() => router.push('/flashcards')}
                                    >
                                        Flashcards
                                    </Typography>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '-23px',
                                            width: 0,
                                            height: 0,
                                            borderLeft: '10px solid transparent',
                                            borderRight: '10px solid transparent',
                                            borderBottom: '10px solid white',
                                            transform: 'translateX(-50%)',
                                            left: '50%',
                                        }}
                                    />
                                </Box>
                            </SignedIn>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* UserButton aligned to the right */}
                            <SignedIn>
                                <UserButton sx={{ ml: 3 }} />
                            </SignedIn>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="md">
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(flashcard.name)} sx={{ cursor: 'pointer' }}>
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
            </SignedIn>
            <SignedOut>
                {/* SignedOutRedirect logic is now in useEffect above */}
            </SignedOut>
        </div>
    );
}
