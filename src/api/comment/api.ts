import axios from "@/lib/axiosWithConfig"
import { CommentData, CommentResponse } from "./types"
import { useQuery } from "@tanstack/react-query"


export const getCommentsById = async (id: string) => {
    const response = await axios.get<CommentResponse<CommentData[]>>(`/api/comment/post/${id}`)
    return response.data.data
}

export const useGetCommentsById = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getCommentsById(postId)
    })
}