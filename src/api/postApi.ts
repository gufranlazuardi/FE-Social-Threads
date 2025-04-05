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
