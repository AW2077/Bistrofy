import React, {useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';

const App = () =>{
  const [content, setContent] = useState(<SearchBar/>);
  const [basket, setBasket] = useState([]);

  const updateContent = (newContent) =>{
    setBasket([]);
    setContent(newContent);
  };

  return(
    <div>
      <NavigationBar updateContent={updateContent}/>
      <div>{content}</div>
    </div>
  )
  
  
};

export default App;






// //DOM - obiektowy model dokumentu
// class App extends Component {

// //To jest odpowiedzialne za wczytywanie domyślnego komponentu - w naszym przypadku to ten search bar
// constructor(props){
//   super(props);
//   this.state = {
//     activeComponent: SearchBar,
//   };
// }
// //funkcja obsługująca klikanie po navigation barze - ustala za aktywny fragment ten na który kliknięto
// handleLinkClick = (newComponent) => {
//   this.setState({activeComponent: newComponent});
// };

// //model dokumentu który na twardo składa się z aktywnego zawsze navigation baru i wybranego aktywnego komponentu
// render() {
//   const {activeComponent: ActiveComponent} = this.state;
//   return(
//       <div>
//         <NavigationBar handleLinkClick={this.handleLinkClick} />
//         <ActiveComponent/>
//       </div>
//   );
  
// }
// }
// export default App;
