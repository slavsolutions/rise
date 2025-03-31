import React, {useEffect, useState} from 'react'
import './AppSettings.scss'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import axiosRequests from '../../../../functions/axios-requests/assets';


const Settings = () => {
  const [formData, setFormData] = useState({ assetCategory: '' });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const assetCategories = ['Laptop','Desktop','Mobile']
  useEffect(()=>{
    console.log(formData.assetCategory)
  },[formData])
  return (
    <div className='AppSettings__wrapper'>
      <section className='AppSettings__general AppSettings__section'>
        <div className='AppSettings__general-title'>General settings <IoMdArrowDropdown className='asd'/></div>
        <div className='AppSettings__settingsList'>

        </div>
      </section>
      <section className='AppSettings__assetsSettings AppSettings__section'>
        <div className='AppSettings__general-title'>Asset management settings <IoMdArrowDropdown /></div>
        <div className='AppSettings__settingsList'>
          <div className='field-modification'>
            <span>Assets categories:</span>
            <div className='asset__categories'>
              {assetCategories.map((x)=>
              <div className='category-item' key={x}>
                <span>{x}</span>
                <span className='category-item__icon'><FaCircleMinus size={14} color="red" onClick={axiosRequests.getAssetTypes} /></span>
              </div>
            )}
            <div className='category-item'>
              <input type="text" name="assetCategory" placeholder='Add new category' onChange={handleChange} value={formData.assetCategory} 
              />
              <span className='category-item__icon'><FaCirclePlus size={14} color="green" onClick={() => axiosRequests.addAsset(formData)}/></span>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
