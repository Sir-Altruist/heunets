"use client"

import React, { useState } from 'react'
import { Layout } from '../../../sections'
import { Button, SelectField, Table } from '@/components/shared'

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

const tableData = [
    {
        "id": "e357633c-b322-421f-97cd-d96853fb906f",
        "title": "crud application",
        "description": "Build a crud application with nodejs",
        "status": "unassigned",
        "addedBy": "j.doe",
        "assignedTo": null,
        "dateAssigned": null,
        "dateResolved": null,
        "dateClosed": null,
        "createdAt": "2025-10-20T13:53:06.768Z"
    },
    {
        "id": "ea653cc6-b7c9-4ba9-b625-6ee116d0512c",
        "title": "Ticket Tracker",
        "description": "Build a ticket tracker for service request",
        "addedBy": "j.doe",
        "assignedTo": null,
        "dateAssigned": null,
        "status": "in-progress",
        "dateResolved": null,
        "dateClosed": null,
        "createdAt": "2025-10-20T13:53:34.156Z"
    },
    {
        "id": "ea653cc6-b7c9-4ba9-b625-6ee116d0512c",
        "title": "Ticket Tracker",
        "description": "Build a ticket tracker for service request",
        "addedBy": "j.doe",
        "assignedTo": null,
        "dateAssigned": null,
        "status": "resolved",
        "dateResolved": null,
        "dateClosed": null,
        "createdAt": "2025-10-20T13:53:34.156Z"
    },
    {
        "id": "ea653cc6-b7c9-4ba9-b625-6ee116d0512c",
        "title": "Ticket Tracker",
        "description": "Build a ticket tracker for service request",
        "addedBy": "j.doe",
        "assignedTo": null,
        "dateAssigned": null,
        "status": "closed",
        "dateResolved": null,
        "dateClosed": null,
        "createdAt": "2025-10-20T13:53:34.156Z"
    }
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
    const name = 'Oluwasegun'
    const username = 'o.esho'

    const [status, setStatus] = useState("")
    const [requestType, setRequestType] = useState("Assigned to me")

    console.log('status: ', status)


  return (
    <Layout>
        <div className='w-full px-10'>
            {/* Top Details */}
            <div
            className="w-full justify-end p-3 flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg text-gray-800 font-semibold">{username}</p>
                </div>
            </div>
            <div className='w-full mt-14'>
                <div className='w-full flex justify-between'>
                    <div className='flex gap-4'>
                        <div className='border p-2 rounded-lg'>
                            <input
                            type="date" 
                            className='cursor-pointer text-sm'
                            />
                        </div>
                        <div className='border p-2 rounded-lg'>
                            <input
                            type="date"
                            className='cursor-pointer text-sm' 
                            />
                        </div>
                        <SelectField 
                        options={statusOptions}
                        setState={setStatus}
                        value={status}
                        />
                        <SelectField 
                        options={requestOptions}
                        setState={setRequestType}
                        value={requestType}
                        className='w-[200px]'
                        />
                    </div>
                    <div>
                        <Button className='py-2 px-5' text='Fetch tickets'/>
                    </div>
                </div>
                {/* Table */}
                <div className='mt-20'>
                    <Table tableHeaders={tableHeaders} tableData={tableData} />
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default page