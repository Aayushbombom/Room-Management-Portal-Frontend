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
const AddRoom = ({updater, children}) => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAdd = async() => {
        const cap = parseInt(capacity);
        const room = {roomName: name, roomCapacity: cap};
        const res = await fetchData("POST", "/api/rooms", room);
        const data = await res.json();

        if(data.Success != null){
            updater();
            setDialogOpen(false);
        }
        else{
            setErrorMsg(data.Errors);
        }
        
    }

    const handleCancel = () => {
        setName('');
        setCapacity('');
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
            <DialogDescription className="">
                Set name and Capacity
            </DialogDescription>
        </DialogHeader>
        <div className="sm:w-full md:w-1/2 mx-auto py-5">
            <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" onChange={e => setName(e.target.value)} value={name} onFocus={() => setErrorMsg('')}/>
            </div>
            <div className="mb-4">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input type="text" id="capacity" onChange={e => setCapacity(e.target.value)} value={capacity} onFocus={() => setErrorMsg('')}/>
            </div>  
        </div>
        <p className="text-destructive">{errorMsg}</p>
        <DialogFooter>
            <DialogClose className="disabled" asChild><Button variant="outline" onClick={handleCancel}>Cancel</Button></DialogClose>
            <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default AddRoom