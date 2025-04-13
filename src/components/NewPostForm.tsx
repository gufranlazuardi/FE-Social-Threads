"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useCreatePost } from '@/api/post'
import { Input } from './ui/input'

const NewPostForm = () => {
    // const [imageExist, setImageExist] = useState(false)
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<string | File>('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const createPostMutation = useCreatePost()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLDivElement>(null)

    // Handle file from drag and drop
    const handleFileFromDrop = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file)
            // setImageExist(true)

            // Create image preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            toast.error("Please upload an image file")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsSubmitting(true)

            const formData = new FormData()
            formData.append("content", content)

            if (imageFile) {
                formData.append("image", imageFile)
            }

            await createPostMutation.mutateAsync(formData)

            setContent("")
            setImageFile("")
            setImagePreview(null)
            // setImageExist(false)
            toast("Post created successfully!")
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error("Error creating post")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file) {
            handleFileFromDrop(file)
        }
    }

    const removeImage = () => {
        setImageFile("")
        setImagePreview(null)
        // setImageExist(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // Handle regular file input change
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileFromDrop(file)
        }
    }

    // Setup document-level drag events to detect dragging outside the textarea
    useEffect(() => {
        const handleDocumentDragOver = (e: DragEvent) => {
            e.preventDefault()
            if (!isDragging) {
                setIsDragging(true)
            }
        }

        const handleDocumentDragLeave = (e: DragEvent) => {
            e.preventDefault()
            // Only set isDragging to false if we're leaving the document entirely
            if (e.clientX <= 0 || e.clientY <= 0 ||
                e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                setIsDragging(false)
            }
        }

        const handleDocumentDrop = (e: DragEvent) => {
            setIsDragging(false)
        }

        // Add document-level listeners
        document.addEventListener('dragover', handleDocumentDragOver)
        document.addEventListener('dragleave', handleDocumentDragLeave)
        document.addEventListener('drop', handleDocumentDrop)

        return () => {
            // Clean up event listeners
            document.removeEventListener('dragover', handleDocumentDragOver)
            document.removeEventListener('dragleave', handleDocumentDragLeave)
            document.removeEventListener('drop', handleDocumentDrop)
        }
    }, [isDragging])

    return (
        <div className='w-full flex flex-col my-4'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <p className='font-bold text-xl'>Post</p>

                <div
                    ref={textareaRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="w-full"
                >
                    {isDragging ? (
                        <div className="flex items-center justify-center w-full h-16 rounded-md border-2 border-dashed border-pink-500 bg-pink-50 transition-colors duration-300">
                            <div className="text-center">
                                <p className='text-pink-500 font-medium'>Drop your photo here!</p>
                            </div>
                        </div>
                    ) : (
                        <Textarea
                            placeholder='Enter your post...'
                            className='rounded-sm w-full'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    )}
                </div>

                {/* Image preview */}
                {imagePreview && (
                    <div className="relative w-full border rounded-md p-2">
                        <div className="relative h-48 w-full">
                            <img
                                src={imagePreview}
                                alt="Image preview"
                                className="h-full w-auto mx-auto object-contain"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                aria-label="Remove image"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* <Input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="rounded-sm mt-2 w-fit"
                /> */}

                <div className='flex justify-end'>
                    <Button
                        className='bg-pink-500 w-fit rounded-sm'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </Button>
                </div>
                <hr className='my-2' />
            </form>
        </div>
    )
}

export default NewPostForm