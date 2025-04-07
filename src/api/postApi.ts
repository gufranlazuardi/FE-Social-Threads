import axios from '../lib/axiosWithConfig';
import { useQuery } from '@tanstack/react-query';

export interface Author {
    id: string;
    username: string;
    name: string;
}

export interface Post {
    id: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: Author;
    _count: {
        comments: number;
        likes: number;
    }
}

export interface PostsResponse {
    status: string;
    code: number;
    message: string;
    meta: {
        timeStamp: string;
        totalPages: number;
    };
    data: Post[];
}

export interface PostDetail {
    id: string
    content: string
    imageUrl: string
    createdAt: string
    updatedAt: string
    authorId: string
    author: {
        id: string
        username: string
        name: string
    },
    comments: string[],
    likes: string[],
    _count: {
        comments: string[],
        likes: string[],
    }
}

export interface PostDetailResponse {
    status: string;
    code: number;
    message: string;
    meta: {
        timeStamp: string;
    };
    data: Post;
}

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
