import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../../redux/action/user'

const User = () => {

    ///////////////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()
    const { userId } = useParams()

    ///////////////////////////////////// STATES //////////////////////////////////////
    const { currentUser: user } = useSelector(state => state.user)

    ///////////////////////////////////// USE EFFECT ////////////////////////////////////
    useEffect(() => {
        dispatch(getUser(userId))
    }, [userId])

    ///////////////////////////////////// FUNCTION //////////////////////////////////////


    return (
        <div className="w-full h-full flex justify-center items-center gap-[40px] rounded-[4px] " >

            <div className="flex gap-[1rem] w-[80%] in-h-[60vh] h-auto bg-white shadow-box p-[12px] rounded-[4px] ">
                <div className="flex flex-col gap-[8px] flex-[1] ">

                    <div className="flex flex-col justify-center items-center w-full ">
                        <img src={user?.image} alt="avatar" className='w-[8rem] h-[8rem] rounded-full object-cover ' />
                        <span className='text-[20px] text-gray-900 capitalize font-medium ' >{user?.username}</span>
                    </div>

                    <div className="flex flex-col gap-[12px] ">
                        <div className="flex items-center gap-[8px] ">
                            <span className='text-[14px] text-gray-900 ' >Client Name:</span>
                            <span className='text-gray-500 text-[16px] capitalize' >{user?.firstName + ' ' + user?.lastName}</span>
                        </div>
                        <div className="flex items-center gap-[8px] ">
                            <span className='text-[14px] text-gray-900 ' >Gender:</span>
                            <span className='text-[10px] bg-green-900 text-white rounded-[10px] px-[4px] py-[1px] w-fit capitalize' >{user?.gender}</span>
                        </div>
                        <div className="flex items-center gap-[8px] ">
                            <span className='text-[14px] text-gray-900 ' >Martial Status:</span>
                            <span className='text-[10px] bg-violet-900 text-white rounded-[10px] px-[4px] py-[1px] w-fit capitalize' >{user?.martialStatus}</span>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-[8px] flex-[1] ">

                    <div className="flex justify-center items-center h-[40px] rounded-[4px] w-full bg-gray-200 text-black font-[400] ">
                        <h3 className=' ' >Contact Details</h3>
                    </div>
                    <div className="flex flex-col gap-[12px] ">
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Email:</span>
                            <span className='text-gray-500 text-[16px] ' >{user?.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Phone:</span>
                            <span className='text-gray-500 text-[16px] ' >{user?.phone}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Official Number:</span>
                            <span className='text-gray-500 text-[16px] ' >{user?.officialNumber}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >CNIC:</span>
                            <span className='text-gray-500 text-[16px] ' >{user?.cnic}</span>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-[8px] flex-[1] ">

                    <div className="flex justify-center items-center h-[40px] rounded-[4px] w-full bg-gray-200 text-black font-[400] ">
                        <h3 className=' ' >Company Details</h3>
                    </div>
                    <div className="flex flex-col gap-[12px] ">
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Branch:</span>
                            <span className='text-gray-500 text-[16px] capitalize' >{user?.branch}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Salary Type:</span>
                            <span className='text-gray-500 text-[16px] capitalize' >{user?.salaryType}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Account Status:</span>
                            <span className='text-[10px] bg-green-900 text-white rounded-[10px] px-[4px] py-[1px] w-fit capitalize ' >{user?.activeStatus ? 'Active' : 'Inactive'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-[14px] text-gray-900 ' >Password:</span>
                            {/* <span className='text-gray-500 text-[16px] ' >{user?.password}</span> */}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default User