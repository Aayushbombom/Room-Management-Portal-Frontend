import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { fetchData } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
const UpdateRoom = ({Name, Capacity, Id, updater, children}) => {
    const [name, setName] = useState(Name);
    const [capacity, setCapacity] = useState(Capacity.toString());
    const [id, setId] = useState(Id);
    const [errorMsg, setErrorMsg] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleUpdate = async() => {
        const cap = parseInt(capacity);
        const room = {roomID: id, roomName: name, roomCapacity: cap};
        const res = await fetchData("PATCH", "/api/rooms", room);
        const data = await res.json();
        console.log(data);
        if(data.Success != null){
            updater();
            setDialogOpen(false);
        }
        else{
            setErrorMsg(data.Errors);
        }
        
    }

    const handleCancel = () => {
        setName(Name);
        setCapacity(Capacity);
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Update Room</DialogTitle>
            <DialogDescription className="">
                Change name or Capacity
            </DialogDescription>
        </DialogHeader>
        <div className="sm:w-full md:w-1/2 mx-auto py-5">
            <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" onChange={e => setName(e.target.value)} value={name}/>
            </div>
            <div className="mb-4">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input type="text" id="capacity" onChange={e => setCapacity(e.target.value)} value={capacity}/>
            </div>  
        </div>
        <p className="text-destructive">{errorMsg}</p>
        <DialogFooter>
            <DialogClose className="disabled" asChild><Button variant="outline" onClick={handleCancel}>Cancel</Button></DialogClose>
            <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default UpdateRoom