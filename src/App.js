import React, {useState} from 'react';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';
import { DataProvider } from './DataProvider';

const App = () =>{
  const [content, setContent] = useState(<SearchBar/>)
  const updateContent = (newContent) =>{
    setContent(newContent)}

  return(
    <DataProvider>
      <NavigationBar updateContent={updateContent}/>
      <main className='mainContent'>
        {content}
      </main>
      <footer>
        Autorzy projektu: Agnieszka Włodawiec i Kacper Lang <br></br>
        Pizza icon created by <a href="https://www.freepik.com/icon/pizza_6978255">Freepik</a>
      </footer>
    </DataProvider>
  );
};

export default App;