import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuList, 
    navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { fetchData } from '@/services/api'
const Navbar = ({NavItems, NavRefs}) => {

    const handleSignOut = async () => {
        const res = await fetchData("GET", "/api/user/logout");
    }

    const NavList = NavItems.map((NavItem, i) => {
        return(
            NavItem != "SignOut" ?
            <NavigationMenuItem key= {i}>
                <NavLink to={`/${NavRefs[i]}`} className={navigationMenuTriggerStyle()} end>
                        {NavItem} 
                </NavLink>
            </NavigationMenuItem> 
            :
            <NavigationMenuItem key= {i}>
                <NavLink to={`/${NavRefs[i]}`} className={navigationMenuTriggerStyle()} onClick={handleSignOut} end>
                        {NavItem} 
                </NavLink>
            </NavigationMenuItem> 

        )
    }) 
            //Breaks at 498px
    return (
        <div className="bg-secondary w-full p-3">
            <div className="container flex flex-row justify-between">
            <h2 className="logo scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">BOOK iT</h2>
            <NavigationMenu>
                <NavigationMenuList className = "">
                        {NavList}
                </NavigationMenuList>
            </NavigationMenu>
            </div>
        </div>
    )
}

export default Navbar

