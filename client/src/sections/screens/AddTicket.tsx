import React from 'react'
import { Modal } from '@/components/helpers'
import { Button, InputField } from '@/components/shared'
import { IHandlers } from '@/interfaces';

interface IAddTicket {
    isOpen: boolean;
    onClose: () => void;
    handlers: IHandlers,
    errors: any;
    values: any;
    loading: boolean
}
const AddTicket = ({ 
    isOpen, 
    onClose,
    handlers,
    errors,
    values,
    loading
}: IAddTicket) => {

  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Add Ticket"
    size='md'
    showCloseButton={true}
    closeOnOverlayClick={false}
    >
        <form className='flex flex-col gap-4' onSubmit={(e) => handlers.handleSubmit(e)}>
            <InputField
            label="Title"
            placeholder="Please enter title"
            name="title"
            handlers={handlers}
            error={errors.title as string}
            value={values.title}
            />
            <InputField
            label="Description"
            placeholder="Please enter description"
            inputType="password"
            name="description"
            type="textarea"
            handlers={handlers}
            error={errors.description as string}
            value={values.description}
            />
            <Button 
            size="full" 
            text={loading ? "Loading..." : "Submit"}
            type="submit"
            />
        </form>
    </Modal>
  )
}

export default AddTicket