'use client'

import { Trash } from 'lucide-react'
import React from 'react'

type IProps = {
    id: string
    mutate?: () => void
}

export const DeleteAction = (props: IProps) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [message, setMessage] = React.useState<{ text: string; type: string; }>({ text: '', type: '' })

    const handleDelete = async (id: string) => {
        setMessage({ text: '', type: '' })
        if (!id) return;

        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json()

            if (data.success) {
                setMessage({ text: 'Booking deleted successfully', type: 'success' })
                props.mutate?.()
            } else {
                setMessage({ text: data.message, type: 'error' })
            }
        } catch (error) {
            setMessage({ text: 'Something went wrong', type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {message.text && <p className={message?.type == 'error' ? 'text-red-500': 'text-green-500'}>{message.text}</p>}
            <button
                className='disabled:cursor-not-allowed'
                disabled={isLoading}
                onClick={() => handleDelete(props.id)}>
                {isLoading ? 'Deleting...' : <Trash className="h-4 w-4 text-gray-500 hover:text-red-500" />}
            </button>
        </>
    )
}
