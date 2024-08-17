/*
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { Button, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SignUpPage() {
    return (
        <Container maxWidth='sm'>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' style={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
                    <Link href="/" passHref>
                        <Button sx={{color:'white'}}><CloseIcon /></Button>
                    </Link>
                </Toolbar>
            </AppBar> 
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                sx={{ my: 4 }}
            >
                <Typography variant="h4">Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    );
}
*/


import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { Button, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

export default function SignInPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* AppBar with Close Button */}
      <AppBar 
        position="fixed" 
        sx={{ bgcolor: 'primary.main', top: 0, left: 0, width: '100%' }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            FlashMaster
          </Typography>
          <Link href="/" passHref>
            <Button sx={{ color: 'white' }}>
              <CloseIcon />
            </Button>

          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>          </Typography>
            <Button color="inherit">
              <Link href="/login" passHref>
                Login
              </Link>
            </Button>
          </Toolbar>
      </AppBar>

      {/* Sign In Form */}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          mt: 10, // Margin to avoid overlap with the AppBar
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        
        {/* Wrapper around Clerk's SignIn to control centering */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <SignIn />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}