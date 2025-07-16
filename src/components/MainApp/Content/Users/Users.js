import React, { useEffect } from 'react'
import './Users.scss'
import axiosRequestsUsers from '../../../../functions/axios-requests/users'
import { useSelector } from 'react-redux';
import AssetRow from '../Assets/AssetsView/AssetRow/AssetRow';


const Users = () => {
  const usersList = useSelector((state) => state.usersList);


  const spans = (user) => {
    return Object.entries(user).flatMap(([key, value]) => {
      if (key.startsWith('_')) return null;
      if (typeof value === 'object' && value !== null) {
        return Object.entries(value)
          .filter(([xkey]) => !xkey.startsWith('_'))
          .map(([xkey, xvalue]) => (
            <span key={xkey}>{xvalue}</span>
          ));
      } else {
        return <span key={key}>{value}</span>;
      }
    });
  };

  useEffect(()=>{
    if(usersList.length > 0){
      console.log('prawidowy', spans2(usersList[0]))
      console.log('lalala' ,spans(usersList))
    }
  },[usersList])

  const spans2 = (user) =>{
    const userx = []
    Object.entries(user).map((x)=>{
      if (typeof x[1] === 'object' && x[1] !== null && !Array.isArray(x[1])){
        Object.entries(x[1]).map((q)=>userx.push(q))
      }
      else{
        userx.push(x)
      }
    })
    return userx
  }

  const flattenUser = (user) => {
    const flat = {};
    Object.entries(user).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([innerKey, innerValue]) => {
          flat[innerKey] = innerValue;
        });
      } else {
        flat[key] = value;
      }
    });
    return flat;
  };
  
  

  return (
    <div className='users_wrapper'>
      <button onClick={axiosRequestsUsers.addUser}>add user</button>
      <button onClick={axiosRequestsUsers.getUsersList}>get users list</button>
      <div className='assets__mainWrapper__tableWrapper'>
      {usersList.length > 0 ? <AssetRow key='initial' asset={flattenUser(usersList[0])} header={true} /> : null}
      {usersList.map((x,y)=>
      <AssetRow key={y} asset={flattenUser(x)}/>
      )}
      </div>
    </div>
  )
}

export default Users

// {flattenUsers.map((x)=><span>{x}</span>)}
   //typeof x === Array ? console.log(x) : Object.entries(x).map((z)=>console.log(z))