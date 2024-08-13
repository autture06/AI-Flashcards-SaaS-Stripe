"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Box, Grid, AppBar, Toolbar } from '@mui/material';
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <Container
      maxWidth="xl"
    >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create your flashcards from text'/>
      </Head>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
          <SignedOut>
            <Link href="/sign-in" passHref>
              <Button sx={{color:'white'}}>Login</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button sx={{color:'white'}}>Sign Up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box 
        sx={{ 
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant='h2'>Welcome to Flashcard SaaS</Typography>
        <Typography variant='h5'> 
          The easiest way to make your flashcards from text
        </Typography>
        <Button variant='contained' sx={{ mt: 2 }}>Get Started</Button>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant='h4' component='h2'>
          Features:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='h6'>Easy Text Input</Typography>
              <Typography>
                Quickly input and format your text to create flashcards effortlessly.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='h6'>Customizable Flashcards</Typography>
              <Typography>
                Customize the appearance and content of your flashcards to suit your needs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='h6'>Progress Tracking</Typography>
              <Typography>
                Track your progress and performance to optimize your learning.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant='h4'>Pricing</Typography>
        <Grid container spacing={4} justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h6'>Free Plan</Typography>
              <Typography>
                Basic features with limited flashcard creation.
              </Typography>
              <Button variant='outlined' sx={{ mt: 2 }}>Learn More</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h6'>Pro Plan</Typography>
              <Typography>
                Full access to all features and unlimited flashcards.
              </Typography>
              <Button variant='contained' sx={{ mt: 2 }}>Get Started</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
