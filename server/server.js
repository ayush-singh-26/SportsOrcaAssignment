import express from "express";
import axios from 'axios';
import cors from 'cors'
import dotenv from 'dotenv'
const  PORT = 8000

dotenv.config();


const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/',(req,res)=>{
    res.send('Welcome to my Website')
})

app.get('/matches',async (req,res)=>{
    const today = new Date().toISOString().split("T")[0];   //took little help in this line only
    const response = await axios.get(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
        headers : {
            'x-apisports-key' : process.env.API_KEY
        }
    })

    const upcomingMatches = response.data.response.filter(
      match => match.fixture.status.short === "NS"
    );

    res.json(upcomingMatches);    
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})