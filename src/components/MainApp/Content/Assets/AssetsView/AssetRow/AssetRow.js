import React, { useEffect, useState } from 'react'
import './AssetRow.scss'

const AssetRow = ({asset, header}) => {


  return (
    <div className='assetRow__rowWrapper'>
      {Object.entries(asset).map(([key, value]) => (
          <div key={key} className={`${key} assetRow__column`}>
            <span>{header ? key : value}</span>
        </div>
      ))}
    </div>
  )
}

export default AssetRow
