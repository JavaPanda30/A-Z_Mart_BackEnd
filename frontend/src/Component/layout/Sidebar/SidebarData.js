import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
// import * as IoIcons from 'react-icons/io'
export const SidebarData = [
    {
        title:"Home",
        path:"/",
        icon:<AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:"Profile",
        path:"/profile",
        icon:<FaIcons.FaUserNinja />,
        cName:'nav-text'
    },
    {
        title:"Product",
        path:"/product",
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    }
]