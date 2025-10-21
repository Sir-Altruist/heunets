import React from 'react'
import { Modal } from '@/components/helpers'
import { Button, InputField } from '@/components/shared'
import { IHandlers } from '@/interfaces';
import { Tools } from '@/utils';
import dayjs from "dayjs"

interface ITicketDetails {
    isOpen: boolean;
    onClose: () => void;
    // handlers: IHandlers,
    data: any;
    // loading: boolean
}

const { getStatusColor } = Tools
const TicketDetails = ({ 
    isOpen, 
    onClose,
    // handlers,
    data,
    // loading
}: ITicketDetails) => {

  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="View Ticket Details"
    size="md"
    showCloseButton={true}
    closeOnOverlayClick={false}
    >
        <div className='flex flex-col gap-10'>
            <div className='w-full flex justify-between'>
                <span className='py-1.5 px-3 rounded-full bg-blue-100 text-blue-700'>
                    {data?.id}
                </span>
                <span
                className='py-1.5 px-3 rounded-full'
                style={{
                    backgroundColor: getStatusColor(data?.status)?.bgColor,
                    color: getStatusColor(data?.status)?.textColor
                }}>
                    {data?.status}
                </span>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                    <label className='text-[#64748b] text-base'>Title</label>
                    <input
                    readOnly
                    value={data.title}
                    className='bg-transparent text-base'
                    />
                </div>
                <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                    <label className='text-[#64748b] text-base'>Added By</label>
                    <input
                    readOnly
                    value={data.addedBy}
                    className='bg-transparent text-base'
                    />
                </div>
            </div>
            <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                <label className='text-[#64748b] text-base'>Description</label>
                <textarea 
                rows={4} 
                readOnly
                value={data.description} 
                className='bg-transparent text-base outline-none'
                />
            </div>
            {
                data.assignedTo && (
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                            <label className='text-[#64748b] text-base'>Assigned To</label>
                            <input
                            readOnly
                            value={data.assignedTo || "N/A"}
                            className='bg-transparent text-base'
                            />
                        </div>
                        <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                            <label className='text-[#64748b] text-base'>Date Assigned</label>
                            <input
                            readOnly
                            value={data.dateAssigned ? dayjs(data.dateAssigned).format("YYY-MM-DD HH:mm:ss a") : "N/A"}
                            className='bg-transparent text-base'
                            />
                        </div>
                    </div>
                )
            }
            <div className='grid grid-cols-2 gap-4'>
                {
                    data.dateResolved && (
                        <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                            <label className='text-[#64748b] text-base'>Date Resolved</label>
                            <input
                            readOnly
                            value={dayjs(data.dateResolved).format("YYY-MM-DD HH:mm:ss a")}
                            className='bg-transparent text-base'
                            />
                        </div>
                    )
                }
                {
                    data.dateClosed && (
                        <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                            <label className='text-[#64748b] text-base'>Date Closed</label>
                            <input
                            readOnly
                            value={dayjs(data.dateClosed).format("YYY-MM-DD HH:mm:ss a")}
                            className='bg-transparent text-base'
                            />
                        </div>
                    )
                }
            </div>
            {/* <div className='flex flex-col bg-[#f8fafc] py-2 px-4 rounded-md gap-2'>
                <label className='text-[#64748b] text-base'>Description</label>
                <textarea 
                rows={4} 
                readOnly
                value={data.description} 
                className='bg-transparent text-base outline-none'
                />
            </div> */}
        </div>
            <Button 
            size="full" 
            text='Assign'
            // text={loading ? "Loading..." : "Submit"}
            type="submit"
            />
    </Modal>
  )
}

export default TicketDetails;