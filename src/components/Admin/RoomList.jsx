import React, {useEffect, useState} from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '../ui/card'
import { fetchData } from '@/services/api'
import { Toaster } from '../ui/toaster'
import { useToast } from '../ui/use-toast'
import UpdateRoom from './UpdateRoom'
import AddRoom from './AddRoom'
import DeleteAlert from './DeleteAlert'
const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const getRooms = async () => {
        const res = await fetchData("GET", "/api/rooms");
        const data = await res.json();
        data.sort((a, b) => a.roomID - b.roomID);
        setRooms(data);
    }
    const deleteRoom = (e) => {
        e.stopPropgation();
    }
    useEffect(() => {
        getRooms();
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
        <div className="results w-full grid grid-cols-1 md:grid-cols-4 gap-3">
           { rooms.map((room) => {
                return (
                    
                        <Card className="text-center p-5 bg-secondary hover:border-1 hover:border-primary">
                            <CardHeader>{room.name}</CardHeader>
                            <CardDescription>Capacity: {room.capacity}</CardDescription>
                            <div className="mt-5 flex flex-row justify-between">
                                <UpdateRoom key={room.roomID} Id={room.roomID} Name={room.name} Capacity={room.capacity} updater={getRooms}>
                                <Button>Update</Button>
                                </UpdateRoom>
                                <DeleteAlert Id={room.roomID} className="float-end" onClick={deleteRoom} updater={getRooms}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:opacity-70">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </DeleteAlert>
                            </div>
                        </Card>
                    
                )
           }) }
           <AddRoom updater={getRooms}>
                <div className="fixed bottom-20 right-20 rounded-full bg-primary p-3 z-10 shadow-md cursor-pointer hover:opacity-90"a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </AddRoom>
        </div>
        
    </div>
    
    </>
  )
}

export default RoomList


