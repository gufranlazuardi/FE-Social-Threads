import axios from '../../lib/axiosWithConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post, PostDetailResponse, PostsResponse } from './types';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get<PostsResponse>('/api/post');
    return response.data.data;
};

export const useGetAllPosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
};

export const fetchDetailPost = async (id: string): Promise<Post> => {
    const response = await axios.get<PostDetailResponse>(`/api/post/${id}`)
    return response.data.data
}

export const useGetDetailPost = (id: string) => {
    return useQuery({
        queryKey: ['detailPost', 'id'],
        queryFn: () => fetchDetailPost(id),
        enabled: !!id, // Only run the query if we have an ID
    })
}

export const createPost = async (formData: FormData): Promise<Post> => {
    const response = await axios.post<PostDetailResponse>(`http://localhost:3000/api/post/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data.data
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}
