import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { Button, Container, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
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
      {/* AppBar without the Login button */}
      <AppBar 
        position="fixed" 
        sx={{ bgcolor: 'primary.main', top: 0, left: 0, width: '100%' }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            FlashMaster
          </Typography>
          
          {/* Close Button on the top right corner */}
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Link href="/" passHref>
              <IconButton sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Link>
          </Box>
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
