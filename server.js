import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Data
const bookings = [
    {
        "id": 1,
        "user": "Alex Jose",
        "time": "Oct 24, 6:00 PM",
        "type": "5v5 Arena A",
        "status": "Confirmed",
        "statusColor": "bg-emerald-100 text-emerald-700"
    },
    {
        "id": 2,
        "user": "Sarah Smith",
        "time": "Oct 24, 8:00 PM",
        "type": "7v7 Arena B",
        "status": "Pending",
        "statusColor": "bg-amber-100 text-amber-700"
    },
    {
        "id": 3,
        "user": "Mike Davis",
        "time": "Oct 25, 5:00 PM",
        "type": "5v5 Arena A",
        "status": "Confirmed",
        "statusColor": "bg-emerald-100 text-emerald-700"
    },
    {
        "id": 4,
        "user": "Emma Wilson",
        "time": "Oct 25, 7:00 PM",
        "type": "11v11 Main Pitch",
        "status": "Cancelled",
        "statusColor": "bg-rose-100 text-rose-700"
    },
    {
        "id": 5,
        "user": "John Doe",
        "time": "Oct 26, 6:30 PM",
        "type": "7v7 Arena B",
        "status": "Confirmed",
        "statusColor": "bg-emerald-100 text-emerald-700"
    }
];

// API Routes
app.get('/api/bookings', (req, res) => {
    setTimeout(() => {
        res.json(bookings);
    }, 800);
});

const user = [
    {
        "id": 1,
        "user": "Iwin",
        "email": "iwin@gmail.com",
        "password": "iwin123",
    }
];

app.get('/api/users', (req, res) => {
    res.json(user);
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = user.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const newUser = {
        id: user.length + 1,
        user: name,
        email,
        password
    };

    user.push(newUser);
    console.log("New user registered successfully:", newUser);
    console.log("Updated user array:", user);

    res.status(201).json({ success: true, message: "Registration successful", user: { id: newUser.id, user: newUser.user } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const foundUser = user.find(u => u.email === email && u.password === password);

    if (foundUser) {
        res.json({ success: true, message: "Login successful", user: { id: foundUser.id, user: foundUser.user } });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend API Server is running on http://localhost:${PORT}`);
});
