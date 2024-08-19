'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import db from "../../firebase"
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, AppBar, Toolbar, Button } from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const router = useRouter()

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return

            const colRef = doc(collection(db, 'users', user.id, 'flashcards'), search)
            const docs = await getDocs(colRef)
            const flashcards = []
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    useEffect(() => {
        if (!isLoaded) return
        if (!isSignedIn) {
            router.push('/')
        }
    }, [isLoaded, isSignedIn, router])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return null
    }

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
                        {flashcards.map((flashcard) => (
                            <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                    },
                                                }}
                                            >
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
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
    )
}
