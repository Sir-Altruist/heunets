"use client"

import React, { useEffect, useState, useContext, useRef } from 'react'
import { Layout } from '../../../sections'
import { Button, SelectField, Table } from '@/components/shared'
import { AuthContext } from '@/contexts/auth'
import { TicketContext } from '@/contexts/tickets'
import { UserServices, TicketServices } from '@/services'
import dayjs from 'dayjs'
import Skeleton from '@/sections/skeleton'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/helpers'
import { AddTicketModal } from '@/sections/screens'
import validations from '@/validations'
import * as yup from "yup";

const tableHeaders = [
    {
        label: "ID",
        key: "id"
    },
    {
        label: "Title",
        key: "title"
    },
    {
        label: "Status",
        key: "status"
    },
    {
        label: "Added By",
        key: "addedBy"
    },
    {
        label: "Assigned To",
        key: "assignedTo"
    },
    {
        label: "Date Added",
        key: "dateAdded"
    },
    {
        label: "Date Assigned",
        key: "dateAssigned"
    },
    {
        label: "Date Resolved",
        key: "dateResolved"
    },
    {
        label: "Date Closed",
        key: "dateClosed"
    },
]


const statusOptions = [
    {
        label: "All",
        value: "",
    },
    {
        label: "Unassigned",
        value: "unassigned"
    },
    {
        label: "In-Progress",
        value: "in-progress"
    },
    {
        label: "Resolved",
        value: "resolved"
    },
    {
        label: "Closed",
        value: "closed"
    }
]

const requestOptions = [
    {
        label: "Assigned to me",
        value: "Assigned to me"
    },
    {
        label: "Added by me",
        value: "Added by me"
    },
]
const page = () => {
    const [requestType, setRequestType] = useState("Assigned to me")
    const [loading, setLoading] = useState({
        profile: false,
        tickets: true,
        upload: false
    })
    const { user, updateUserData } = useContext(AuthContext)
    const { tickets, updateTickets, updateTicketData, ticketData: { title, description } } = useContext(TicketContext)
    const [query, setQuery] = useState({
        startDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        status: "",
    })
    const [trigger, setTrigger] = useState(false);
    const [modalTrigger, setModalTrigger] = useState(false)
     const [alertMessage, setAlertMessage] = useState("")
    const [alertStatus, setAlertStatus] = useState<any>("")
    const [alertTrigger, setAlertTrigger] = useState(false)
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
    }>({});
    const { startDate, endDate, status } = query
    const mounted = useRef(false)
    const router = useRouter()

        useEffect(() => {
        mounted.current = true
        const fetchProfile = async () => {
            setLoading(prev => ({
                ...prev,
                profile: true
            }))
            try {
                const data: any = await UserServices.profile()
                if(data.details.badToken){
                    localStorage.removeItem("access_token")
                    router.push("/")
                }
                if(data.status === "success"){
                    updateUserData(data.details)
                }
            } catch (error) {
                
            } finally {
                setLoading(prev => ({
                    ...prev,
                    profile: false
                }))
            }
        }
       fetchProfile()

       return () => { mounted.current = false }
    }, [])

    useEffect(() => {
        mounted.current = true
        const fetchTickets = async () => {
            setLoading(prev => ({
                ...prev,
                tickets: true
            }))
            try {
                const data: any = await TicketServices.fetchAllTickets(query)
                if(data.status === "success"){
                    updateTickets(data.details?.rows)
                }
            } catch (error) {
                
            } finally {
                setLoading(prev => ({
                    ...prev,
                    tickets: false
                }))
            }
        }
        fetchTickets()

        return () => { mounted.current = false }
    }, [trigger])

    const handlers = {
        handleQueryChange({ target }: React.ChangeEvent<HTMLInputElement>){
            const { name, value } = target
            setQuery(prev => ({
                ...prev,
                [name]: value
            }))
        },

        onChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
            const { name, value } = target
            updateTicketData((prev: any) => ({
                ...prev,
                [name]: value
            }))
        },

        openModal(){
            setModalTrigger(true)
        },

        async handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault()
            setErrors({});
            console.log("here...")
            try {
                setLoading(prev => ({
                    ...prev,
                    upload: true
                }))
                await validations.ticket({
                    title,
                    description
                });
                console.log('afer validation')
                const response: any = await TicketServices.AddTicket({ title, description })
                if(response.status === "success"){
                    setAlertTrigger(true)
                    setAlertStatus("success")
                    setAlertMessage(response.message)
                    setTimeout(() => setAlertTrigger(false), 3000)
                    window.location.reload()
                } else {
                    setAlertTrigger(true)
                    setAlertStatus("error")
                    setAlertMessage(response.message)
                    setTimeout(() => setAlertTrigger(false), 3000)
                }
    
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    const validationErrors: {
                        title?: string,
                        description?: string
                    } = {};
                    error.inner.forEach((err) => {
                        if (err.path) {
                        validationErrors[err.path as keyof typeof validationErrors] = err.message;
                        }
                    });
                    setErrors(validationErrors)
                }
            } finally {
                setLoading(prev => ({
                    ...prev,
                    upload: false
                }))
            }
    
        }
    }

  return (
    <Layout>
        <div className='w-full px-10'>
            {/* Top Details */}
            {
                loading.profile ? <Skeleton.Content /> : (
                    <div className="w-full justify-between p-3 flex items-center space-x-3">
                        <div>
                            <p className='text-[18px] md:text-2xl font-medium'>Welcome back, {user?.firstName} 👋</p>
                            <span className='text-base text-[#5E6775]'>This is your central hub to track and manage work item tickets</span>
                        </div>
                        <div className='flex space-x-3'>
                            <div>
                            <p className="text-sm font-semibold bg-blue-100 text-blue-700 p-1.5 px-4 rounded-full">{user?.username}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='w-full mt-14'>
                <div className='w-full flex justify-between'>
                    <div className='flex gap-4'>
                        <div className='border p-2 rounded-lg'>
                            <input
                            type="date"
                            onChange={e => handlers.handleQueryChange(e)}
                            value={startDate}
                            className='cursor-pointer text-sm'
                            />
                        </div>
                        <div className='border p-2 rounded-lg'>
                            <input
                            type="date"
                            onChange={e => handlers.handleQueryChange(e)}
                            value={endDate}
                            className='cursor-pointer text-sm' 
                            />
                        </div>
                        <SelectField 
                        options={statusOptions}
                        setState={setQuery}
                        value={status}
                        />
                        <SelectField 
                        options={requestOptions}
                        setState={setRequestType}
                        value={requestType}
                        className='w-[200px]'
                        />
                    </div>
                    <div className='flex gap-5'>
                        <div className='flex justify-center'>
                            <button 
                            type='button' 
                            className='text-blue-700 cursor-pointer'
                            onClick={() => handlers.openModal()}
                            >Create Ticket</button>
                        </div>
                        <div>
                            <Button className='py-2 px-5' text='Fetch tickets' handler={() => setTrigger(!trigger)}/>
                        </div>
                    </div>
                </div>
                {/* Table */}
                <div className='mt-20'>
                    {
                        loading.tickets ? <Skeleton.Table /> : <Table tableHeaders={tableHeaders} tableData={tickets} />
                    }
                </div>
            </div>
        </div>
        
          <AddTicketModal 
          isOpen={modalTrigger}
          onClose={() => setModalTrigger(false)}
          handlers={handlers}
          errors={errors}
          values={{ title, description }}
          loading={loading.upload}
          />

          {alertTrigger && 
          <Alert 
            message={alertMessage} 
            type={alertStatus} 
            onClose={() => setAlertTrigger(false)} 
            isVisible={alertTrigger}
           />}
    </Layout>
  )
}

export default page