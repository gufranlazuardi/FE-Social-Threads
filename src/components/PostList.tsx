import { useGetAllPosts } from '@/api/postApi';
import Image from 'next/image';
import dayjs from '@/lib/dayjs';
import Link from 'next/link';


export function PostList() {
    const { data: posts, isLoading, error } = useGetAllPosts();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-500">Failed to load posts</p>
            </div>
        );
    }

    if (!posts?.length) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">No posts found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <Link href={`/post/${post.id}`} key={post.id}>
                    <div key={post.id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-lg font-medium text-gray-600">
                                    {post.author.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-medium">{post.author.name}</h3>
                                <p className="text-sm text-gray-500">@{post.author.username}</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">
                                {dayjs(post.createdAt).fromNow(true)} ago
                            </span>
                        </div>

                        <p className="mb-4">{post.content}</p>

                        {post.imageUrl && (
                            <div className="relative h-64 w-full mb-4 rounded-md overflow-hidden">
                                <Image
                                    src={post.imageUrl}
                                    alt="Post image"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-md"
                                />
                            </div>
                        )}

                        <div className="flex gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                {post._count.comments}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                {post._count.likes}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}