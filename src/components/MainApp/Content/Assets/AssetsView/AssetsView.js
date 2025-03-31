import React, { useEffect, useState } from 'react';
import './AssetsView.scss';
import axios from 'axios';
import AssetRow from './AssetRow/AssetRow';
import AddAsset from '../AddAsset/AddAsset';

function AssetsView() {
  const [assets, setAssets] = useState()
  const [addAssetActive, toggleAssetActive] = useState(false)
  const getAllAssets = () =>{
    axios({
      method: 'get',
      url: 'https://socialback.bieda.it/app/listAssets',
      withCredentials: false,
    })
    .then(function (response){
      console.log(response.data)
      setAssets(response.data)
    })
    .catch(function (error){
      console.log(error)
    })
  }
  useEffect(()=>{
    getAllAssets()
  },[])
  return (
    <div className='assets__mainWrapper'>
      {addAssetActive && <AddAsset toggleFn={toggleAssetActive}/>}
      {assets === undefined || assets.length ===0 ? 
        <>
          <span>No assets added yet</span>
          {!addAssetActive && <div onClick={()=>toggleAssetActive(true)} className='assets__mainWrapper_addAssetButton'>Add Asset</div>}
        </>
         :
        (<div className='submitted-data'>
          <h2>All Assets</h2>
          <div className='assets__mainWrapper__tableToolsWrapper'>
            <div className='assets__mainWrapper__tableToolsWrapper--tools'>
              <div className='asset__mainWrapper--rowsInfo'>showing {assets.length} of {assets.length} rows</div>
              {!addAssetActive && <div onClick={()=>toggleAssetActive(true)} className='assets__mainWrapper_addAssetButton'>Add Asset</div>}
              </div>
          </div>
          <div className='assets__mainWrapper__tableWrapper'>
            <AssetRow asset={assets[0]} header={true}/>
            {assets.map((x)=><AssetRow key={x.id} asset={x} />)}
          </div>
        </div>)
      }
    </div>
  );
}

export default AssetsView;