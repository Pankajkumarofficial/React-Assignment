import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
        }
    }, [location.state]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !email) {
            setMessage('Please fill in all fields.');
            return;
        }
        const userDetails = { name, phone, email };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        navigate('/second');
    };

    return (
        <Container maxWidth="sm" className="mt-10">
            {message && <p className="text-red-500">{message}</p>}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        label="Phone Number"
                        variant="outlined"
                        className="w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="w-full mt-4"
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default UserForm;
