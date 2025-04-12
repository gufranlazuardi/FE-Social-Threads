"use client"

import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useCreatePost } from '@/api/post'
import { Input } from './ui/input'


const NewPostForm = () => {
    const [imageExist, setImageExist] = useState(false)
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<string | File>('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createPostMutation = useCreatePost()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsSubmitting(true)

            const formData = new FormData()
            formData.append("content", content)
            formData.append("image", imageFile)

            await createPostMutation.mutateAsync(formData)

            setContent("")
            setImageFile("")
            toast("Post created successfully!")
        } catch (error) {
            console.error('Error creating post:', error);
            toast("Post created successfully!")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='w-full flex flex-col my-4'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <p className='font-bold text-xl'>Post</p>
                <Textarea
                    placeholder='Enter your post...'
                    className='rounded-sm'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required />

                <Input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0]

                        if (file) {
                            setImageFile(file)
                        }
                    }}
                    className="rounded-sm mt-2 w-fit"
                />

                <div className='flex justify-end'>
                    <Button className='bg-pink-500 w-fit rounded-sm' type='submit' disabled={isSubmitting}>Post</Button>
                </div>
                <hr className='my-2' />
            </form>
        </div>
    )
}

export default NewPostForm