import Pokiman from "../pokimanlist/pokiman";
import Search from "../Search/search";
import "./pokidex.css";  // Agar CSS file ussi folder mein ho


function PokiDex()
{

    return(
        <div className="itemcontainer">
            <h1>pokedex</h1>
            <Search />
            <Pokiman />
        </div>
    );u
}
export default PokiDex;