import React, {useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';
import { DataProvider } from './DataProvider';

const App = () =>{
  const [content, setContent] = useState(<SearchBar/>);
  const updateContent = (newContent) =>{
    setContent(newContent);
  };

  return(
    <DataProvider>
      <NavigationBar updateContent={updateContent}/>
      <main>
        <div>{content}</div>
      </main>
    </DataProvider>
  );
  
  
};

export default App;


