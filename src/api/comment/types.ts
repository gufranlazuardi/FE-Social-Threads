export type CommentResponse<T = any> = {
    status: string
    code: number
    message: string
    meta: {
        timeStamp: Date
    }
    data: T
}

export type CommentData = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    authorId: string
    postId: string
    author: {
        id: string
        username: string
        name: string
    }
}