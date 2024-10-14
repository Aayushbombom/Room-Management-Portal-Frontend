import React, { useEffect, useState } from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Button } from '@/components/ui/button'
import { fetchData, fixTimeZone } from '@/services/api'
const UserHistory = ({userID, children}) => {
    const [bookings, setBookings] = useState([]);
   
    
    const [ID, setID] = useState(userID);
    const getBookings = async() => {
        const res = await fetchData("GET", `/api/user/history?userID=${userID}`);
        const getBookings = await res.json();
        getBookings.forEach((booking) => {
            booking.dateOfBooking = fixTimeZone(booking.dateOfBooking);
        })
        setBookings(getBookings);
      }

    useEffect(()=>{
        getBookings();
      }, []);
    
    
  return (
    <>
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent>
                <div className="container">
                    <DrawerHeader>
                        <DrawerTitle>Booking History</DrawerTitle>
                    </DrawerHeader>
                    <Table className="w-full">
                    
                    
                              <TableCaption>
                                {  bookings.length > 0 ?
                                    ''
                                    :
                                    <>
                                    No booking History
                                    </>
                                }
                              </TableCaption>
                    
                            <TableHeader>
                                <TableRow className="">
                                    <TableHead className="text-justify px-5 py-3">BookingID</TableHead>
                                    <TableHead className="text-justify px-5 py-3">RoomName</TableHead>
                                    <TableHead className="text-justify px-5 py-3">DateOfBooking</TableHead>
                                    <TableHead className="text-justify px-5 py-3">From</TableHead>
                                    <TableHead className="text-justify px-5 py-3">To</TableHead>
                                    <TableHead className="text-justify px-5 py-3">Purpose</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="">
                            { bookings.length > 0 ?
                                bookings.map((booking,index) => (
                                <TableRow key={booking.bookingID} className="space-x-20">
                                    <TableCell className="text-justify px-5 py-3">{booking.bookingID}</TableCell>
                                    <TableCell className="text-justify px-5 py-3">{booking.room}</TableCell>
                                    <TableCell className="text-justify px-5 py-3">{booking.dateOfBooking.split('T')[0]}</TableCell>
                                    <TableCell className="text-justify px-5 py-3">{booking.timeFrom}</TableCell>
                                    <TableCell className="text-justify px-5 py-3">{booking.timeTo}</TableCell>
                                    <TableCell className="text-justify px-5 py-3">{booking.purpose}</TableCell>
                                </TableRow>
                                )) :
                                ''
                            }
                            </TableBody>
                        </Table>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default UserHistory