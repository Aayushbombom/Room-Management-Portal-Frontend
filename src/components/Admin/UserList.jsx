import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button'
import { fetchData } from '@/services/api'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserHistory from './UserHistory'
const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async() => {
    const res = await fetchData("GET", "/api/user/users");
    const data = await res.json();

    setUsers(data);
  }

  useEffect(() => {
      getUsers();
  },[]);
  return (
      <div className='container mt-10'>
         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">Active Users</h1>
         <Table className="w-full">       
                        <TableCaption>
                          {  users.length > 0 ?
                              ''
                              :
                              <>
                              No Active Users
                              </>
                          }
                        </TableCaption>
                      
                      <TableHeader>
                          <TableRow className="">
                              <TableHead className="text-justify px-5 py-3">UserName</TableHead>
                              <TableHead className="text-justify px-5 py-3">Email ID</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody className="">
                      { users.length > 0 ?
                          users.map((user,index) => (
                          <TableRow key={user.userID} className="space-x-20">
                              <TableCell className="text-justify px-5 py-3">{user.name}</TableCell>
                              <TableCell className="text-justify px-5 py-3">{user.email}</TableCell>
                              <UserHistory userID={user.userID}>
                                <TableCell className="text-justify px-5 py-3"><Button className="">View History</Button></TableCell>
                              </UserHistory>
                          </TableRow>
                          )) :
                          ''
                      }
                      </TableBody>
                  </Table>
      </div>
  )
}

export default UserList