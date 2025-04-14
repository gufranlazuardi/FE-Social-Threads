"use client"

import { useGetMe } from '@/api/user'
import { useUpdateProfile } from '@/api/user/api'
import { UpdateProfileBody } from '@/api/user/type'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast, Toaster } from 'sonner'
import React, { ChangeEvent, useEffect, useState } from 'react'


const Profile = () => {
    const { data: me, isLoading, error } = useGetMe()
    const [isEdit, setIsEdit] = useState(false)

    const [formData, setFormData] = useState<UpdateProfileBody>({
        name: '',
        username: '',
        bio: ''
    })

    const updateProfileMutation = useUpdateProfile()

    // Set initial form data setelah me data tersedia
    useEffect(() => {
        if (me?.data) {
            setFormData({
                name: me.data.name,
                username: me.data.username,
                bio: me.data.bio || ''
            })
        }
    }, [me])

    const handleEditProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const editProfile = () => setIsEdit(true)

    const saveEdit = () => {
        if (!me?.data.id) return
        updateProfileMutation.mutate({ id: me.data.id, data: formData }, {
            onSuccess: () => {
                setIsEdit(false)
                toast("Profile successfully edited!")
            },
            onError: () => {
                toast("Failed to edit profile")
            }
        })

    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-500">Failed to load profile</p>
            </div>
        )
    }

    return (
        <div className='flex items-center justify-center mt-[10%]'>
            <Toaster position="bottom-right" />
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
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleEditProfile}
                                    disabled={!isEdit}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleEditProfile}
                                    disabled={!isEdit}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={me?.data.email}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleEditProfile}
                                    disabled={!isEdit}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {!isEdit ? (
                        <Button onClick={editProfile} className='cursor-pointer'>Edit</Button>
                    ) : (
                        <Button onClick={saveEdit} className='bg-pink-500 cursor-pointer'>
                            {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile
