import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div>
            <div class="search">
                <h3>Twoje ulubione jedzenie już w zasięgu ręki</h3>
                <h4 >Sprawdź restauracje z dostawą w Twojej okolicy</h4>
                <br></br>
            <form>
                <input type="text"  placeholder="Wpisz adres" backgroud ></input>
            </form>
            </div>
        </div>
      );
  };
  
  export default SearchBar;




// class SearchBar extends Component {
//   render(){
    // return (
    //     <div>
    //         <div class="search">
    //             <h3>Twoje ulubione jedzenie już w zasięgu ręki</h3>
    //             <h4 >Sprawdź restauracje z dostawą w Twojej okolicy</h4>
    //             <br></br>
    //         <form>
    //             <input type="text"  placeholder="Wpisz adres" backgroud ></input>
    //         </form>
    //         </div>
    //     </div>
    //   );
// }
// }
// export default SearchBar;
