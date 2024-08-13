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
                        <Button color="inherit"><CloseIcon /></Button>
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
                <SignUp />
                <Link href="/sign-in" passHref>
                    <Button color="inherit">Already have an account? Login</Button>
                </Link>
            </Box>
        </Container>
    );
}
