import { Clear, Close, UploadFile } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { updateProject } from '../../redux/action/project'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'

const EditModal = ({ open, setOpen }) => {

  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch()
  const imageRef = useRef(null)
  const { currentProject: project, isFetching } = useSelector(state => state.project)

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [projectData, setProjectData] = useState(project)
  const [images, setImages] = useState([])

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setProjectData(project)
  }, [project])

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProject(project._id, { ...projectData }))
    setOpen(false)
  }
  const handleImageButtonClick = (e) => {
    e.preventDefault();
    imageRef.current.querySelector('input[type="file"]').click();
  }
  const handleAddImage = (files) => {
    let imagesArr = []
    files.map((img) => {
      if (images.includes(img)) console.log('image already exist')
      else imagesArr = imagesArr.concat(img.base64)
    })
    setImages([...images, ...imagesArr])
  }
  const removeImage = (e, img) => {
    e.preventDefault()
    setImages(images.filter(i => i != img))
  }
  const handleChange = (e) => {
    setProjectData(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

        <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update Project</h2>
          <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full p-[1rem] ' >

          <div className="flex flex-col gap-[1rem] rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
            {/* heading */}
            <div className="px-[1rem] py-[12px] bg-neutral-600 text-white ">
              <h4 className='font-medium text-[1rem] ' >Project Fields</h4>
            </div>
            <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
              {/* images */}
              <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
                {
                  images?.map((img, index) => (
                    <div key={index} className="relative rounded-[8px] overflow-hidden w-[10rem] h-[10rem] p-[8px] flex justify-center items-center  " >
                      <img src={img} alt="" className="w-full h-full object-cover rounded-[8px] " />
                      <button onClick={(e) => removeImage(e, img)} className="absolute top-[6px] right-[6px] text-white   " ><Clear /></button>
                    </div>
                  ))
                }
                <div ref={imageRef} id='filebase_image' className="flex justify-center items-center rounded-[8px] h-[10rem] w-[10rem] p-[8px] overflow-hidden bg-gray-300 ">
                  <button onClick={handleImageButtonClick} className="flex  justify-center items-center " >
                    <UploadFile style={{ fontSize: '4rem', color: '#555' }} />
                  </button>
                  <FileBase type="file" multiple onDone={(files) => handleAddImage(files)} />
                </div>
              </div>
              {/* all inputs */}
              <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                {/* title */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="title">Title:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="title" value={projectData?.title} onChange={handleChange} />
                </div>
                {/* city */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={projectData?.city} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                  </select>
                </div>
                {/* block */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="block">Block:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='block' value={projectData?.block} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="block1">Block1</option>
                    <option value="block2">Block2</option>
                    <option value="block3">Block3</option>
                  </select>
                </div>
                {/* property type */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={projectData?.propertyType} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="type1">Type1</option>
                    <option value="type2">Type2</option>
                    <option value="type3">Type3</option>
                  </select>
                </div>
                {/* home type */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={projectData?.homeType} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="type1">Type1</option>
                    <option value="type2">Type2</option>
                    <option value="type3">Type3</option>
                  </select>
                </div>
                {/* price */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="price">Price:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="price" value={projectData?.price} onChange={handleChange} />
                </div>
                {/* area unit */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="areaUnit">Area Unit:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='areaUnit' value={projectData?.areaUnit} onChange={handleChange} >
                    <option value="">Square Feet</option>
                    <option value="unit1">unit1</option>
                    <option value="unit2">unit2</option>
                    <option value="unit3">unit3</option>
                  </select>
                </div>
                {/* area */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">Area:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="area" value={projectData?.area} onChange={handleChange} />
                </div>
                {/* priority */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Project Priority:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={projectData?.priority} onChange={handleChange} >
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                {/* beds */}
                <div className="flex flex-col justify-start gap-[4px] w-[22.5%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={projectData?.beds} onChange={handleChange} />
                </div>
              </div>
              {/* button */}
              <div className="w-full flex justify-end items-center">
                <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                  {isFetching ? 'Saving' : 'Save'}
                </button>
              </div>
            </div>
          </div>

        </form>



      </div>

    </Modal>
  )
}

export default EditModal