import React from 'react'   
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
    
const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }
    return (
        <>
        <div className="jumbotron bg-secondary">
            <div className="jumboContent space-y-4 py-20 container flex flex-col items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Book Rooms for Your Events</h1>
                <p className="text-sm text-muted-foreground text-center">India's No.1 Room Management Portal</p>
                <Button className="mx-auto" onClick={handleClick}>Get Started</Button>
            </div>
        </div>
        </>
    )
}

export default Home;

