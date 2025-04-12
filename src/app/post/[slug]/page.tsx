'use client'

import { useGetDetailPost } from '@/api/post/api'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'



const Post = () => {

    const params = useParams()
    const postId = params.slug as string

    const { data: post, isLoading, error } = useGetDetailPost(postId)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-500">Failed to load post</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">Post not found</p>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-3xl">
            <Link href="/" className="flex items-center text-gray-600 mb-6 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                </svg>
                Back to posts
            </Link>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                            {post.author.name.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h2 className="font-medium text-lg">{post.author.name}</h2>
                        <p className="text-sm text-gray-500">@{post.author.username}</p>
                    </div>
                    <span className="text-sm text-gray-400 ml-auto">
                        {dayjs(post.createdAt).format('MMM D, YYYY · h:mm A')}
                    </span>
                </div>

                <p className="text-lg mb-6">{post.content}</p>

                {post.imageUrl && (

                    <div className="relative h-96 w-full mb-6 rounded-md overflow-hidden">
                        <>
                            {/* <Image
                                src={post.imageUrl}
                                alt="Post image"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                            /> */}
                            <Image
                                src={post.imageUrl}
                                alt={post.content}
                                className='object-cover rounded-md'
                                fill
                            />
                        </>
                    </div>

                )}

                <div className="flex gap-6 text-sm text-gray-500 pt-4 border-t">
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        {post._count.comments} comments
                    </span>
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {post._count.likes} likes
                    </span>
                </div>
            </div>
        </main>
    )
}

export default Post