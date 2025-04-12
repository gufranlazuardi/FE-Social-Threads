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

// export interface CreatePostBody {
//     content: FormData
//     imageFile: FormData
// }