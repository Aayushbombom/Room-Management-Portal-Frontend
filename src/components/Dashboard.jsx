import React, { useContext, useState, useEffect } from 'react'
import { Card } from './ui/card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from './ui/button'
import { userContext } from '@/pages/User'
import { fetchData } from '@/services/api'
import Room from './Room'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

const Dashboard = () => {
  const userDetails = useContext(userContext);
  const [bookings, setBookings] = useState([]);
  const toast = useToast();

  const getBookings = async() => {
    const res = await fetchData("GET", `/api/user/upcoming?userID=${userDetails.userID}`);
    const getBookings = await res.json();
    getBookings.forEach((booking) => {
        booking.dateOfBooking = fixTimeZone(booking.dateOfBooking);
    })
    setBookings(getBookings);
  }

  const cancelBooking = async(e) => {
    const bookingID = parseInt(e.target.parentElement.parentElement.children[0].innerText);
    const res = await fetchData("DELETE", `/api/book?bookingID=${bookingID}`);
    const deleteBookings = await res.json();
    if(deleteBookings.Success)
      getBookings();
  }

  const fixTimeZone = (dateString) => {
    const localDate = new Date(dateString);
    const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcDate = new Date(localDate.getTime() - timezoneOffset);

    return utcDate.toISOString();
  }

  useEffect(()=>{
    getBookings();
  }, []);

  return (
    <>
        <div className="container mt-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">Welcome, {userDetails.name}</h1>
            <div className="mx-auto max-w-fit">
                <Card className="px-10 md:px-16  sm:w-full py-10 space-y-8 bg-secondary divide-y-2">
                    <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 mt-50 text-center">Upcoming Bookings</h2>
                    <Table className="w-full">
                        
                          
                          <TableCaption>
                            {  bookings.length > 0 ?
                                ''
                                :
                                <>
                                No upcoming bookings
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
                                <Room type="Update" key={index} id={booking.roomID} toast={toast} body={booking} actions={getBookings}>
                                  <TableCell className="text-justify px-5 py-3"><Button className="">Update</Button></TableCell>
                                </Room>
                                <TableCell className="text-justify px-5 py-3"><Button className="bg-destructive text-destructive-foreground" onClick={cancelBooking}>Cancel</Button></TableCell>
                            </TableRow>
                            )) :
                            ''
                        }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
        <Toaster/>
    </>
  )
}

export default Dashboard


