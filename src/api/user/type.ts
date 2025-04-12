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