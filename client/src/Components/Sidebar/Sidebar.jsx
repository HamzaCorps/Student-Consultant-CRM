import SidebarItem from "./SidebarItem"
import { Avatar, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { Close, HomeOutlined, PeopleAltOutlined, AssignmentOutlined, AccountCircleOutlined, LockOutlined, LocalAtmOutlined, ShoppingCartOutlined, CardGiftcardOutlined, SummarizeOutlined, StarBorder, ExpandLess, ExpandMore, Create, Today, OpenInNewOutlined, Money, AccountBalanceOutlined, ReceiptLong, Receipt } from '@mui/icons-material'
import { useState } from "react"

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const links = [
        {
            id:1,
            title: "Dashboard",
            link: "/",
            icon: <HomeOutlined />,
            childrens: []
        },
        {
            id:2,
            title: "Leads",
            icon: <PeopleAltOutlined />,
            childrens: [
                {
                    title: "Create Lead",
                    icon: <Create />,
                    link: "/leads/create"
                },
                {
                    title: "Get All Leads",
                    icon: <PeopleAltOutlined />,
                    link: "/leads"
                },
            ]
        },
        {
            id:3,
            title: "Projects",
            icon: <AccountBalanceOutlined />,
            childrens: [
                {
                    title: "All Projects",
                    icon: <Today />,
                    link: "/projects"
                },
                {
                    title: "Create Project",
                    icon: <OpenInNewOutlined />,
                    link: "/projects/create"
                },
            ]
        },
        {
            id:4,
            title: "To Do Tasks",
            icon: <AssignmentOutlined />,
            childrens: [
                {
                    title: "Create Task",
                    icon: <Create />,
                    link: "tasks/create"
                },
                {
                    title: "My Tasks",
                    icon: <AssignmentOutlined />,
                    link: "/tasks"
                },
            ]
        },
        {
            id:5,
            title: "User",
            icon: <AccountCircleOutlined />,
            childrens: [
                {
                    title: "Create User",
                    icon: <Create />,
                    link: "/users/create"
                },
                {
                    title: "Clients",
                    icon: <AccountCircleOutlined />,
                    link: "/clients"
                },
                {
                    title: "Employees",
                    icon: <AccountCircleOutlined />,
                    link: "/employees"
                },
            ]
        },
        {
            id : 6 ,
            title: "Authorization",
            icon: <LockOutlined />,
            childrens: [
                {
                    title: "Approvals",
                    icon: <Create />,
                    link: "/authorization/request"
                },
                {
                    title: "Vouchers",
                    icon: <LockOutlined />,
                    link: "/users"
                },
            ]
        },
        {
            id:7,
            title: "Sales",
            icon: <ShoppingCartOutlined />,
            childrens: [
                {
                    title: "Generate Sale",
                    icon: <Create />,
                    link: "/sales/create"
                },
                {
                    title: "All Sales",
                    icon: <ShoppingCartOutlined />,
                    link: "/sales"
                },
            ]
        },
        {
            id:8,
            title: "Cash Book",
            icon: <AccountBalanceOutlined />,
            childrens: [
                {
                    title: "Today Cash Book",
                    icon: <Today />,
                    link: "/cashbook"
                },
                {
                    title: "View Cash Book",
                    icon: <OpenInNewOutlined />,
                    link: "/view/cashbook"
                },
            ]
        },
        {
            id:9,
            title: 'Vouchers',
            icon: <Receipt />,
            childrens: [
                {
                    title: "All Vouchers",
                    icon: <ReceiptLong />,
                    link: "/voucher"
                },
                {
                    title: "Create Voucher",
                    icon: <Create />,
                    link: "/voucher/create"
                },
            ]
        },
    ]
    
    const [openedMenu, setOpenedMenu] = useState(false);

    return (
        <>
            {/* desktop sidebar */}
            <div className={`flex shadow-none h-[100vh] ${showSidebar ? 'md:flex hidden' : 'hidden'} bg-white z-[1000] border-r-[1px] border-r-gray-300 border-b-[1px] border-b-gray-300`} >
                <div className='flex flex-col gap-[1.3px] w-56 py-[8px] text-gray' >
                    <div className="border-b-[1px] border-b-gray-300 p-[7.5px]">
                        {!showSidebar ? "" : <img className="h-10" src="/favicon/GrowLOGO.png" />}
                    </div>
                    {
                        links.map((link, index) => (
                            <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                        ))
                    }
                </div>
            </div>

            {/* mobile sidebar */}
            {
                showSidebar &&
                <div className='absolute top-0 left-0 bg-white shadow-box w-[16rem] h-screen md:hidden flex z-[1100] ' >
                    <div className='wrapper flex flex-col w-full h-full overflow-y-scroll p-[10px] ' >
                        <div className='w-full flex justify-between items-center mb-[1rem] ' >
                            <img src="/favicon/GrowLOGO.png" />
                            <IconButton className='' onClick={() => setShowSidebar(false)} ><Close /></IconButton>
                        </div>
                        <div className="flex flex-col gap-[5px] ">
                            {
                                links.map((link, index) => (
                                    <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar;