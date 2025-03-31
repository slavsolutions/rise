import React,{useState} from 'react';
import './Sidebar.scss';
import MenuItem from './MenuItem/MenuItem';
import Assets from '../Content/Assets/AssetsView/AssetsView';
import Dashboard from '../Content/Dashboard/Dashboard';
import AppSettings from '../Content/Settings/AppSettings';
import { IoHomeOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({changeView}) => {
  const [isSidebarExtended, setIsSidebarExtened] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const viewComponents = {
      Dashboard, 
      Assets,
      AppSettings}
  const menuIcons = {
      Dashboard: <IoHomeOutline />,
      Assets: <FaListUl />,
      AppSettings: <IoSettingsOutline />
  }
  const menuitems = Object.keys(viewComponents)
  const handleChangeView = (x,y) =>{
    changeView(x)
    setActiveItem(y)
  }
  const handleSidebarResize = () =>{
    console.log('clicked')
    setIsSidebarExtened((prevState) => !prevState);

  }

    return (
    <div className={`sidebar_main_wrapper ${isSidebarExtended ? "sidebar-extended" : ""}`}>
      <div className='sidebar'>
        <div className='sidebar-logoWrapper'>
            <div className='sidebar-logoSpacer'></div>
            <div className='sidebar-listIcon' onClick={handleSidebarResize}>
              <div className='sidebar-icon'><FiSidebar />
              </div>
            </div>
        </div>
            {menuitems.map((x,y) => <MenuItem activator={()=>handleChangeView(x,y)}
            title={x}
            isActive={y === activeItem ? true : false}
            key={x}
            icon={menuIcons[x]}
            />)}
      </div>
    </div>
  )
}



export default Sidebar;

