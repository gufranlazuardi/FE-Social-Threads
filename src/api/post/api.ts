import axios from '../../lib/axiosWithConfig';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post, PostDetailResponse, PostsResponse } from './types';

export const fetchPosts = async (page = 1, limit = 5): Promise<Post[]> => {
    const response = await axios.get<PostsResponse>('/api/post', {
        params: { page, limit }
    });
    return response.data.data;
};

export const useGetAllPosts = (page = 1, limit = 5) => {
    return useQuery({
        queryKey: ['posts', page, limit],
        queryFn: () => fetchPosts(page, limit),
    });
};

export const fetchPostsPage = async ({ pageParam = 1, limit = 5 }): Promise<{
    posts: Post[],
    nextPage: number | null,
    totalPages: number
}> => {
    const response = await axios.get<PostsResponse>('/api/post', {
        params: { page: pageParam, limit }
    });

    const totalPages = response.data.meta.totalPages || 0
    const nextPage = pageParam < totalPages ? pageParam + 1 : null;

    return {
        posts: response.data.data,
        nextPage,
        totalPages
    };
};

export const useGetPostsInfinite = (limit = 5) => {
    return useInfiniteQuery({
        queryKey: ['postsInfinite', limit],
        queryFn: ({ pageParam }) => fetchPostsPage({ pageParam, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
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

