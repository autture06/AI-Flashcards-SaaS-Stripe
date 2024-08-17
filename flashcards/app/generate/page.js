'use client'
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, TextField, Paper, Button, Modal, Fade, Backdrop } from '@mui/material'
import { useRouter } from "next/navigation"
import { getDoc, setDoc, collection, doc, writeBatch } from 'firebase/firestore'
import db from "../../firebase" // Assuming the correct path for firebase config

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = async () => {
        if (!user) return 

        const response = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ text }), // Sending text as JSON
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setFlashcards(data)
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name for the flashcard collection')
            return
        }

        // Begin Firestore batch write
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)
        

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('A flashcard collection with this name already exists!')
                return
            }
            else {
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]})
        }
        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })
        await batch.commit()
        handleClose()
        router.push('/flashcards')
        
    }

    return (
        <Container maxWidth="md">
            {/* Input Section */}
            <Box
                sx={{
                    mt: 4,
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Generate Flashcards
                </Typography>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <TextField 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        label="Enter text" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined" 
                        sx={{ mb: 2 }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit} 
                        fullWidth
                    >
                        Submit
                    </Button>
                </Paper>
            </Box>

            {/* Flashcards Preview Section */}
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Flashcards Review
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
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
                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                                                        boxSizing: 'border-box'
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        sx={{ mt: 3 }}
                        fullWidth
                    >
                        Add to Firebase
                    </Button>
                </Box>
            )}

            {/* Modal for Saving Flashcards */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box 
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            Save Flashcards to Firebase
                        </Typography>
                        <TextField
                            fullWidth
                            label="Enter collection name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={saveFlashcards}
                            fullWidth
                        >
                            Save
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    )
}


