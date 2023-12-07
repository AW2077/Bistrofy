import React, {useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';

const App = () =>{
  const [content, setContent] = useState(<SearchBar/>);

  const updateContent = (newContent) =>{
    setContent(newContent);
  };

  return(
    <div>
      <NavigationBar updateContent={updateContent}/>
      <div>{content}</div>
    </div>
  );
  
  
};

export default App;


