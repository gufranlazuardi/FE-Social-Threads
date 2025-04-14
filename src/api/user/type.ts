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



export type UpdateProfileBody = {
    username: string
    bio: string
    name: string
}

export type UpdateProfileResponse = {
    status: string
    code: number
    message: string
    meta: {
        timestamp: string
    },
    data: {
        id: string
        name: string
        username: string
        email: string
        bio: string
        createdAt: Date
        updatedAt: Date
    }
}