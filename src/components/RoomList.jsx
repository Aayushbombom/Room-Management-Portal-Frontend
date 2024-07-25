import React, {useEffect, useState} from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardDescription, CardHeader } from './ui/card'
import { fetchData } from '@/services/api'
import { Toaster } from './ui/toaster'
import { useToast } from './ui/use-toast'

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const getRooms = async () => {
        const res = await fetchData("GET", "api/rooms");
        const data = await res.json();
        setRooms(data);
    }

    useEffect(() => {
        console.log("RoomList");
        //getRooms();
    }, []);
    
  return (
    <>
    <div className="relative container space-y-10">
        <div className="search_bar w-full space-x-3 flex flex-row mt-10">
            <Input type="text" placeholder="Type Room Name or Capacity to get Recommendations." value={searchWord} onChange={e => setSearchWord(e.target.value)}/>
            <Button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </Button>
        </div>
        {/* <div className="results w-full grid grid-cols-1 md:grid-cols-4 gap-3">
           { rooms.map((room) => {
                return (
                        <Card className="text-center p-5 bg-secondary hover:border-2 hover:border-primary">
                            <CardHeader>{room.name}</CardHeader>
                            <CardDescription>Capacity: {room.capacity}</CardDescription>
                        </Card>
                )
           }) }
        </div> */}
        <div className="absolute rounded-full bg-primary p-3 right-30 bottom-30 z-1 shadow-2xl shadow-blue-300 cursor-pointer hover:opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    </div>
    
    </>
  )
}

export default RoomList


