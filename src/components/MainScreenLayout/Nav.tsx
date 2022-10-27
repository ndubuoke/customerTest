import React from 'react'
import TopNav from './TopNav'
import GoBack from './GoBack'

const Nav = () => {
  return (
    <nav className='flex flex-col gap-10'>
      <TopNav />
      <GoBack />
    </nav>
  )
}

export default Nav
