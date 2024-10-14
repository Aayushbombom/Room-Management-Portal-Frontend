import {React, useState} from 'react'
import { Button } from '../ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { fetchData } from '@/services/api';

const DeleteAlert = ({Id, children, updater}) => {
    const [id, setId] = useState(Id);
    const [dialogOpen, setDialogOpen] = useState(false);

    const deleteRoom = async() => {
        const res = await fetchData("DELETE", `/api/rooms?roomID=${id}`);
        const data = await res.json();
        if(data.Error == null){
            updater();
        }
        setDialogOpen(false);
    }
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Deleting the room will delete all bookings related to it, which might affect the users.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel >Cancel</AlertDialogCancel>
                <Button onClick={deleteRoom}>Delete</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert