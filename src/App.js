import React, { Component} from 'react';
import './App.css';
import SearchBarComponent from './SearchBarComponent';
import NavigationBar from './NavigationBar';

//DOM - obiektowy model dokumentu
class App extends Component {

//To jest odpowiedzialne za wczytywanie domyślnego komponentu - w naszym przypadku to ten search bar
constructor(props){
  super(props);
  this.state = {
    activeComponent: SearchBarComponent,
  };
}
//funkcja obsługująca klikanie po navigation barze - ustala za aktywny fragment ten na który kliknięto
handleLinkClick = (newComponent) => {
  this.setState({activeComponent: newComponent});
};

//model dokumentu który na twardo składa się z aktywnego zawsze navigation baru i wybranego aktywnego komponentu
render() {
  const {activeComponent: ActiveComponent} = this.state;
  return(
      <div>
        <NavigationBar handleLinkClick={this.handleLinkClick} />
        <ActiveComponent />
      </div>
  );
  
}
}
export default App;
