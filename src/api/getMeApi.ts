import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosWithConfig";

export interface GetMeResponse {
    status: string;
    code: number;
    message: string;
    meta: {
        timeStamp: string;
    };
    data: {
        id: string
        email: string
        username: string
        name: string
        bio: string
        createdAt: string
        updatedAt: string
    }
}

export const fetchGetMe = async (): Promise<GetMeResponse> => {
    const response = await axios.get('/api/auth/me')
    return response.data
}

export const useGetMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: fetchGetMe
    })
}