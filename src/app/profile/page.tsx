"use client"

import { useGetMe } from '@/api/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const Profile = () => {
    const { data: me, isLoading, error } = useGetMe();
    const [isEdit, setIsEdit] = useState(false)

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

    const editProfile = () => {
        setIsEdit(true)
    }
    const saveEdit = () => {
        console.log("save edit button")
    }

    return (
        <div className='flex items-center justify-center mt-[10%]'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Your profile</CardTitle>
                    <CardDescription>Want to edit your profile?</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder={me?.data.name} defaultValue={me?.data.name} disabled={!isEdit} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder={me?.data.name} defaultValue={me?.data.username} disabled={!isEdit} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="name" placeholder={me?.data.email} defaultValue={me?.data.email} disabled />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Bio</Label>
                                <Input id="name" placeholder={me?.data.bio} defaultValue={me?.data.bio} disabled={!isEdit} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {!isEdit ? (
                        <Button onClick={() => editProfile()}>Edit</Button>
                    ) : (
                        <Button onClick={() => saveEdit()} className='bg-pink-500'>Save</Button>

                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile