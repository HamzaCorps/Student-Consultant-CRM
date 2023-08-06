import { Close, Description, Flag, PriorityHigh, Timeline } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTask } from '../../redux/action/task'

const Task = ({ open, setOpen }) => {

    /////////////////////////////////////// VARIABLES //////////////////////////////////////
    const { currentTask: task, isFetching, error } = useSelector(state => state.task)

    /////////////////////////////////////// STATES //////////////////////////////////////

    /////////////////////////////////////// USE EFFECTS //////////////////////////////////////

    /////////////////////////////////////// FUNCTIONS //////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }


    return (
        <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

            <div className='flex flex-col gap-[4px] w-[45vw] min-h-[40vh] h-auto max-h-[80vh] p-[1rem] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

                <div className="flex justify-between items-center w-full ">
                    <h2 className="text-[24px] text-gray-800 font-medium capitalize ">{task?.title}</h2>
                    <div className="flex justify-end items-center">
                        <IconButton onClick={handleClose} ><Close /></IconButton>
                    </div>
                </div>

                <div className="flex justify-between gap-[1rem] ">

                    <div className="flex flex-col gap-[8px] flex-[2] ">

                        <div className="flex flex-col gap-[4px] ">
                            <h5 className='text-gray-600' ><Description /> Description</h5>
                            <hr className='w-full h-[1px] bg-gray-300 ' />
                            <p className="text-[14px] text-gray-500 ">{task?.description}</p>
                        </div>

                    </div>
                    <div className="flex flex-[1] h-full ">
                        <div className="flex flex-col gap-[4px] w-full h-full bg-gray-200 p-[8px] rounded-[4px] ">
                            <h5 className='text-gray-800 text-[16px] font-[400] ' >Settings</h5>
                            <div className="flex flex-col gap-[8px] ">
                                <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
                                    <Timeline style={{ fontSize: '18px' }} className=' ' />
                                    <span className='font-light' >Start Date:</span>
                                    <span className='underline ' >{task?.createdAt}</span>
                                </div>
                                <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
                                    <Timeline style={{ fontSize: '18px' }} className=' ' />
                                    <span className='font-light' >Due Date:</span>
                                    <span className='underline ' >{task?.dueDate}</span>
                                </div>
                                <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
                                    <Flag style={{ fontSize: '18px' }} className=' ' />
                                    <span className='font-light' >Status:</span>
                                    <span className='underline ' >{task?.status}</span>
                                </div>
                                <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
                                    <PriorityHigh style={{ fontSize: '18px' }} className=' ' />
                                    <span className='font-light' >Priority:</span>
                                    <span className='underline ' >{task?.priority}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </Modal>
    )
}

export default Task