"use client"

import Image from 'next/image'
import React, { ReactNode } from 'react'
import Logo from "@/assets/images/logo.jpg"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Tools } from '@/utils'
import { LogoutIcon } from '@/assets/icons'

const navItems = [
    {
      name: "Tickets",
      path: '/dashboard/tickets',
    },

    {
      name: "Users",
      path: '/dashboard/users',
    }
]

const { cn } = Tools
const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("access_token")
    router.push("/")
  }
  return (
    <div className='w-full min-h-screen flex'>
      {/* Side menu */}
      <div className='w-[250px] flex flex-col border py-5'>
        {/* Top Logo */}
        <div className='w-full flex justify-center gap-2 border-b pb-5'>
          <Image src={Logo} alt='logo' className='size-10' />
          <h1 className="text-[24px] text-[#1E293B] font-bold">Tracker</h1>
        </div>

        {/* nav links */}
        <div className='flex flex-col gap-2 justify-center mt-10 ml-14'>
          {
            navItems.map(item => {
              const isActive = pathname === item.path
              return (
                <Link 
                key={item.name} 
                href={item.path}
                className={
                  cn(
                      `
                    text-sm py-3 pl-[60px] text-[#64748B] cursor-pointer hover:bg-[#EFF5FF] hover:text-[#0842A6]
                    `,
                    isActive && "border-r-[3px] border-[#0842A6] bg-[#EFF5FF] text-[#0842A6]"
                  )
                }
                >
                  {item.name}
                </Link>
              )
            })
          }
        </div>
        <div className='w-full mt-auto flex justify-center items-center'>
          <div className='inline-flex gap-1 mb-10 cursor-pointer' onClick={logout}>
            <div className='flex justify-center items-center'>
              <LogoutIcon className='text-[#CB1616]' />
            </div>
            <p className='text-[#CB1616]'>Logout</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='w-full pt-5'>
        {children}
      </div>
    </div>
  )
}

export default Layout