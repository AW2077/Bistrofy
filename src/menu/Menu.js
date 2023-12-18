import React, {useState} from 'react';
import './Menu.css'
import NaviBarMenu from './NavBarMenu';
import Pizza from './subpages/Pizza';

const Menu = () => {
  const [content, setContent] = useState(<Pizza/>)
  const updateContent = (newContent) =>{
    setContent(newContent); }

  return(
    <div>
      <NaviBarMenu updateContent={updateContent}/>
      <div className='mainContent'>{content}</div>
    </div>
    );
  
  };
export default Menu;
