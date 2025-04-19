"use client"

import type React from "react"

import { useGetCommentsById } from "@/api/comment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import dayjs from "@/lib/dayjs"
import { MessageCircle, SendHorizontal, X } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"

interface CommentSheetProps {
    postId: string
    commentCount: number
}

export function CommentSheet({ postId, commentCount }: CommentSheetProps) {
    const [open, setOpen] = useState(false)
    const { data: comments, isLoading } = useGetCommentsById(postId)
    const [commentText, setCommentText] = useState("")

    const handleCommentClick = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation to post detail
        e.stopPropagation() // Prevent event bubbling
        setOpen(true)
    }

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        // Add your comment submission logic here
        console.log("Submitting comment:", commentText)
        setCommentText("")
    }

    return (
        <>
            <button className="flex items-center gap-1 text-gray-500 cursor-pointer" onClick={handleCommentClick}>
                <MessageCircle size={16} />
                {commentCount}
            </button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="bottom" className="flex flex-col h-[80vh] rounded-t-xl p-0">
                    {/* Header - Fixed at top */}
                    <SheetHeader className="border-b p-4 sticky top-0 bg-white z-10">
                        <div className="flex items-center justify-between">
                            <SheetTitle>Comments</SheetTitle>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X size={18} />
                            </Button>
                        </div>
                        <SheetDescription>
                            {commentCount} {commentCount === 1 ? "comment" : "comments"}
                        </SheetDescription>
                    </SheetHeader>

                    {/* Content - Scrollable area */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-24">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : comments && comments.length > 0 ? (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col space-y-0.5">
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-medium text-sm">{comment.author.username}</span>
                                                <span className="text-xs text-gray-500">{dayjs(comment.createdAt).fromNow()}</span>
                                            </div>
                                            <p className="text-sm text-wrap">{comment.content}</p>
                                            <p className="text-xs font-semibold text-pink-500 mt-1">Reply</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">No comments yet</div>
                        )}
                    </div>

                    <div className="bottom-0 border-t bg-white p-4 mt-auto">
                        <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
                            <Input
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" variant="ghost" disabled={!commentText.trim()}>
                                <SendHorizontal size={18} className="text-primary" />
                            </Button>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
