"use client";

import * as React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const Home = () => {
  {/*
  return (
  <Container maxWidth="lg">
    <Head>
      <title>Flashcard SaaS</title>
      <meta name="description" content="Create flashcards from your text" />
    </Head>

    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flashcard SaaS
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign Up</Button>
      </Toolbar>
    </AppBar>

    <Box sx={{ textAlign: "center", my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Flashcard SaaS
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        The easiest way to create flashcards from your text.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
        Get Started
      </Button>
      <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
        Learn More
      </Button>
    </Box>

    <Box sx={{ my: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Easy Text Input
          </Typography>
          <Typography>
            Simply input your text, and let our software do the rest. Creating flashcards has never been easier.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Smart Flashcards
          </Typography>
          <Typography>
            Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Accessible Anywhere
          </Typography>
          <Typography>
            Access your flashcards from any device, at any time. Study on the go with ease.
          </Typography>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ my: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Pricing
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Basic
            </Typography>
            <Typography variant="h6" gutterBottom>
              $5 / month
            </Typography>
            <Typography>
              Access to basic flashcard features and limited storage.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Choose Basic
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h6" gutterBottom>
              $15 / month
            </Typography>
            <Typography>
              Unlimited flashcards and storage, with priority support.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Choose Pro
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="body2">
        &copy; 2024 Flashcard SaaS. All rights reserved.
      </Typography>
    </Box>
  </Container>
  );  
  */}

  
  const router = useRouter();
 
  return (
    <div>
      <Head>
        <title>FlashMaster</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: 'primary' }} elevation={0}>
        <Toolbar>
          {/* Left section with FlashMaster text and links */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* FlashMaster text with hover effect */}
            
            <Box display='flex' flexDirection='column' sx={{ position: 'relative', alignItems: 'center' }}>
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
              <SignedIn>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-17px',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: '10px solid white',
                        transform: 'translateX(-50%)',
                        left: '50%',
                    }}
                />
              </SignedIn>
            </Box>

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

          {/* Right section with user icon and signed out links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* SignedOut section */}
            <SignedOut>
              <Button sx={{ color: 'white' }} onClick={() => router.push('/sign-in')}>
                Login
              </Button>
              <Button variant="outlined" sx={{ ml: 2, color: 'white', borderColor: 'white' }} onClick={() => router.push('/sign-up')}>
                Sign Up
              </Button>
            </SignedOut>

            {/* UserButton aligned to the right */}
            <SignedIn>
              <UserButton sx={{ ml: 3 }} />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h2" gutterBottom color="black">
          Simplify Your Learning with Flashcards
        </Typography>
        <Typography variant="h6" paragraph color="black">
          Generate powerful flashcards from text in seconds and boost your study routine with FlashMaster.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" size="large" color="primary" sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" size="large" color="primary">
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose FlashMaster?
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  AI-Powered Creation
                </Typography>
                <Typography variant="body2">
                  Automatically generate flashcards from any text, powered by cutting-edge AI algorithms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography variant="body2">
                  Simple, intuitive interface that allows you to focus on studying, not technology.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Study Anywhere
                </Typography>
                <Typography variant="body2">
                  Flashcards are stored in the cloud, so you can access them from any device.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Pricing Plans
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Free Plan
                </Typography>
                <Typography variant="h6" color="primary">
                  $0/month
                </Typography>
                <Typography variant="body2">
                  Basic flashcard creation with limited features.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" fullWidth>
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Premium Plan
                </Typography>
                <Typography variant="h6" color="primary">
                  $9.99/month
                </Typography>
                <Typography variant="body2">
                  Unlimited flashcards, advanced features, and priority support.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Choose Premium
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: '#333', color: 'white', textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} FlashMaster. All rights reserved.</Typography>
      </Box>
    </div>
  );
}

export default Home;