import React, { useEffect, useState, useRef } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
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
import { Label } from './ui/label'
import { fetchData } from '@/services/api'
const Room = ({type, id, toast, children, body, actions}) => {
  
    const [date, setDate] = useState(body.dateOfBooking.split('T')[0]);
    const [from, setFrom] = useState(body.timeFrom);
    const [to, setTo] = useState(body.timeTo);
    const [purpose, setPurpose] = useState(body.purpose);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [buttonState, setButtonState] = useState(true);
    const isAvailable = () => {
        setErrorMsg('');
        if(date != '' && from != '' && to != '' && purpose != ''){
            
            setButtonState(false);
        }
        else{
            setButtonState(true);

        }
    }

    const handleBooking = async (e) => {
        let method,title,description,secOffset;
        if(type === "Book"){
            method = "POST";
            title = "Booking Confirmed";
            description = "Check your Upcoming Bookings For Details";
            secOffset = ":00";
        }
        else{
            method = "PATCH";
            title = "Booking Updated";
            description = "Check your Upcoming Bookings For Details";
            secOffset = "";
        }
        const booking = {
            userID: -1,
            roomID: id,
            dateOfBooking: new Date(date).toISOString().split('T')[0],
            timeFrom: from.concat(secOffset),
            timeTo: to.concat(secOffset),
            purpose: purpose
        }

        if(type === "Update")
            booking.bookingID = body.bookingID;
        const res = await fetchData(method, "/api/book", booking);
        const data = await res.json();

        if(data.Error != undefined){
            setErrorMsg(data.Error);
        }
        else if(res.status != 200){
            setErrorMsg("Oops, some Error Occured");
        }
        else{
            setDate(body.dateOfBooking.split('T')[0]);
            setFrom(body.timeFrom);
            setTo(body.timeTo);
            setPurpose(body.purpose);
            setDialogOpen(false);
            if(actions != undefined) actions();
            toast.toast({
                title,
                description
            })
        }
    }
    useEffect(() => setErrorMsg(''), [dialogOpen]);
    useEffect(isAvailable, [date,from,to,purpose]);
  return (
    <>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogDescription className="">
                        Select date and time
                    </DialogDescription>
                </DialogHeader>
                <div className="sm:w-full md:w-1/2 mx-auto py-5">
                    <div className="mb-4">
                            <Label htmlFor="date">Date</Label>
                            <Input type="date" id="date" onChange={e => setDate(e.target.value)} value={date}/>
                    </div>
                    <div className="control flex flex-row justify-between">
                        <div className='space-y-2'>
                            <Label htmlFor="from">From</Label>
                            <Input type="time" id="from" onChange={e => setFrom(e.target.value)} value={from}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="to">To</Label>
                            <Input type="time" id="to" onChange={e => setTo(e.target.value)} value={to}/>
                        </div>
                    </div>
                    <div className="mt-4">
                            <Label htmlFor="to">Purpose</Label>
                            <Input type="text" id="to" onChange={e => setPurpose(e.target.value)} value={purpose}/>
                    </div>
                </div>
                <p className="text-destructive">{errorMsg}</p>
                <DialogFooter>
                    <DialogClose className="disabled" asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleBooking} disabled={buttonState}>{type}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>   
    </>
  )
}

export default Room