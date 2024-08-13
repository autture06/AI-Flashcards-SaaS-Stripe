import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
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
                <Typography variant="h4">Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
    );
}
