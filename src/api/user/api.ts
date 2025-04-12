import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosWithConfig";
import { GetMeResponse } from "./type";

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