import React, {useEffect, useState} from 'react'
import './AppSettings.scss'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import axiosRequests from '../../../../functions/axios-requests/assets';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [formData, setFormData] = useState({assetCategory: '', assetBrand: '', assetModel: {category: '', brand: '', model: ''}});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const modelInputPlaceholderModificator = 
    formData.assetModel.category === '' ? 'Select category' : formData.assetModel.brand === '' ? 'Select brand' : `type in model` ;
  const assetTypes = useSelector((state) => state.assetTypes);
  const assetModelList = useSelector((state) => state.models);
  const assetBrandsList = useSelector((state) => state.assetBrands);
  const assetCategories = assetTypes;
  const triggerHandler = {
    addAssetCategory: () => {if(formData.assetCategory !== ''){
      axiosRequests.addAssetCategory(formData);
      setFormData((prev)=> ({...prev, assetCategory: ''}))
    }},
    addAssetBrand: () => {if(formData.assetBrand !== ''){
      axiosRequests.addAssetBrand(formData);
      setFormData((prev)=> ({...prev, assetBrand: ''}))
    }},
    addAssetModel: () =>{if(Object.values(formData.assetModel).every(value => value !== '')){
      axiosRequests.addModel(formData.assetModel);
      setFormData((prev)=> ({...prev, assetModel: {category:'', brand: '', model: ''}}))
    }}
  }
  useEffect(()=>{
    console.log(formData)
  },[formData])
  return (
    <div className='AppSettings__wrapper'>

    <section className='AppSettings__assetsSettings AppSettings__section'>
        <div className='AppSettings__general-title'>General settings <IoMdArrowDropdown className='asd'/></div>
        <div className='AppSettings__settingsList'>
          <div className='field-modification'>
             <span>Assets categories:</span>
             <div><span>sdfsdf</span></div>
          </div>
        </div>
      </section>

      <section className='AppSettings__assetsSettings AppSettings__section'>
        <div className='AppSettings__general-title'>Asset management settings <IoMdArrowDropdown /></div>
        <div className='AppSettings__settingsList'>
          <div className='field-modification'>
            <span>Assets categories:</span>
            <div className='assets-box'>
              {assetCategories.map((x)=>
              <div className='category-item' key={x._id}>
                <span>{x.name}</span>
                <span className='category-item__icon'><FaCircleMinus size={14} color="red" onClick={() => axiosRequests.deleteAssetType(x)} /></span>
              </div>
            )}
            <div className='category-item'>
              <input type="text" name="assetCategory" placeholder='Add new category' onChange={handleChange} value={formData.assetCategory} 
              />
              <span className='category-item__icon'><FaCirclePlus size={14} color="green" onClick={triggerHandler.addAssetCategory}/></span>
            </div>
            </div>
            <span>Assets brands:</span>
            <div className='assets-box'>
              {assetBrandsList.map((x)=>
              <div className='category-item' key={x._id}>
              <span>{x.name}</span>
              <span className='category-item__icon'><FaCircleMinus size={14} color="red" onClick={() => axiosRequests.deleteAssetBrand(x._id)} /></span>
            </div>
              )}
              <div className='category-item'>
              <input type="text" name="assetBrand" placeholder='Add new brand' onChange={handleChange} value={formData.assetBrand} 
              />
              <span className='category-item__icon'><FaCirclePlus size={14} color="green" onClick={triggerHandler.addAssetBrand}/></span>
            </div>
            </div>
            <span>Assets models:</span>
            <div className='assets-box'>
              {assetModelList.map((x,y)=>
              <div className='category-item' key={x._id}>
              <span>{`${x.category} - ${x.brand} - ${x.name}`}</span>
              <span className='category-item__icon'><FaCircleMinus size={14} color="red" onClick={() => axiosRequests.deleteAssetModel(x._id)} /></span>
            </div>
              )}
            <div className='appSettings-spacer' />
            <div>
              <span>Add new model</span>
            </div>
              <form>
                <div className='category-item'>
                  <select name='assetModel.category' className='settings-dropdown-settings' id='assetModel-category'value={formData.assetModel.category} onChange={handleChange}>
                    <option value="" disabled hidden key='selCat'>Select category</option>
                    {assetTypes.map((x)=>
                    <option value={x.name} key={x._id}>{x.name}</option>
                    )}
                  </select>
                </div>
                <div className='category-item'>
                <select name='assetModel.brand' className='settings-dropdown-settings' id='assetModel-category'value={formData.assetModel.brand} onChange={handleChange}>
                <option value="" disabled hidden key='selBrand'>Select brand</option>
                    {assetBrandsList.map((x)=>
                    <option value={x.name} key={x._id}>{x.name}</option>
                    )}
                  </select>
                </div>
              </form>
              <div className='category-item'>
              <input type="text" name="assetModel.model" placeholder={modelInputPlaceholderModificator} onChange={handleChange} value={formData.assetModel.model} 
              />
              <span className='category-item__icon'><FaCirclePlus size={14} color="green" onClick={triggerHandler.addAssetModel}/></span>
            </div>
            <div className='category-item preview'>
                <span className='preview'>Preview: {`${formData.assetModel.category} - ${formData.assetModel.brand} - ${formData.assetModel.model}`}</span>
              </div>
           </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
