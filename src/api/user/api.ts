import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosWithConfig";
import { GetMeResponse, UpdateProfileBody, UpdateProfileResponse } from "./type";

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

export const updateProfile = async (id: string, data: UpdateProfileBody): Promise<UpdateProfileResponse['data']> => {
    const response = await axios.put(`/api/user/${id}`, data)
    return response.data.data
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProfileBody }) =>
            updateProfile(id, data),
        onError: (error) => {
            console.error("Failed to update profile: ", error)
        }
    })
}