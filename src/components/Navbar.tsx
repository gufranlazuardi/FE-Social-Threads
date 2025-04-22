import { Home, MessageCircle, PersonStanding, Search } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Navbar = () => {

    const [openSearch, setOpenSearch] = useState(false)
    const [search, setSearch] = useState("")

    async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setOpenSearch(true)
        setSearch(e.target.value)
    }

    return (
        <div className='flex mx-auto py-2 px-4 w-full space-x-8 border border-pink-400 rounded-md items-center backdrop-blur-2xl'>
            <div className='flex items-center bg-pink-600 rounded-full p-2 cursor-pointer'>
                <Home className='text-white' size={16} />
            </div>
            <Dialog>
                <DialogTrigger>
                    <div className='flex items-center bg-pink-600 rounded-full p-2 cursor-pointer'>
                        <Search className='text-white' size={16} />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-[6px] border-pink-500">
                    <DialogHeader>
                        <DialogTitle>Search</DialogTitle>
                        <DialogDescription>
                            Explore your feed here!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="w-full items-center gap-4">
                            <Input className="" onChange={handleSearch} placeholder='Search...' />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className='flex items-center bg-pink-600 rounded-full p-2 cursor-pointer'>
                <MessageCircle className='text-white' size={16} />
            </div>
            <Avatar className='cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Navbar