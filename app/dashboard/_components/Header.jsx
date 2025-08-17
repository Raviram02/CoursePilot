import Logo from '@/app/_components/Logo'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-end items-center p-5 shadow-sm'>
        {/* <Logo /> */}
        <UserButton />
    </div>
  )
}

export default Header