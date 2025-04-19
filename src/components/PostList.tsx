"use client"

import Image from "next/image"
import dayjs from "@/lib/dayjs"
import Link from "next/link"
import { useRef, useCallback } from "react"
import { useGetPostsInfinite } from "@/api/post"
import { CommentSheet } from "./CommentSheet"
import { Heart } from "lucide-react"

export function PostList() {
    const limit = 5

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetPostsInfinite(limit)

    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useCallback(
        (element: HTMLDivElement | null) => {
            // Skip setup if we're already loading more posts
            if (isFetchingNextPage || !element) return

            // Create a new intersection observer for infinite scrolling
            const setupInfiniteScroll = () => {
                // Clean up previous observer if it exists
                if (observerRef.current) {
                    observerRef.current.disconnect()
                }

                // Create new observer that watches for the element to become visible
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        const isVisible = entries[0]?.isIntersecting

                        // When the loading element becomes visible and we have more pages
                        if (isVisible && hasNextPage) {
                            fetchNextPage() // Load the next page of posts
                        }
                    },
                    { threshold: 1.0 }, // Trigger when element is 100% visible
                )

                // Start observing the loading element
                observerRef.current.observe(element)
            }

            setupInfiniteScroll()
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage],
    )

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
                <p className="text-red-500">Failed to load posts</p>
            </div>
        )
    }

    const posts = data?.pages.flatMap((page) => page.posts) || []

    if (!posts.length) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">No posts found</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4">
                    <Link href={`/post/${post.id}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-lg font-medium text-gray-600">{post.author.name.charAt(0)}</span>
                            </div>
                            <div>
                                <h3 className="font-medium">{post.author.name}</h3>
                                <p className="text-sm text-gray-500">@{post.author.username}</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">{dayjs(post.createdAt).fromNow(true)} ago</span>
                        </div>

                        <p className="mb-4">{post.content}</p>

                        {post.imageUrl && (
                            <div className="relative h-64 w-full mb-4 rounded-md overflow-hidden">
                                <Image
                                    src={post.imageUrl || "/placeholder.svg"}
                                    alt="Post image"
                                    fill
                                    className="rounded-md object-contain"
                                />
                            </div>
                        )}
                    </Link>

                    <div className="flex gap-4 text-sm">
                        {/* Comment Sheet Component */}
                        <CommentSheet postId={post.id} commentCount={post._count.comments} />

                        {/* Like Button */}
                        <button className="flex items-center gap-1 text-gray-500">
                            <Heart size={16} />
                            {post._count.likes}
                        </button>
                    </div>
                </div>
            ))}

            {/* Load more trigger element */}
            <div ref={loadMoreRef} className="flex justify-center py-4">
                {isFetchingNextPage && (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
                )}
                {!hasNextPage && posts.length > 0 && <p className="text-gray-500 text-sm">No more posts to load</p>}
            </div>
        </div>
    )
}
