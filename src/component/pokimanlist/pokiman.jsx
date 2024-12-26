import { useEffect, useState } from "react";
import axios from "axios";
import "./pokimon.css"
import Pokimon from "../pokimonui/pokimonui";

function Pokiman() {
   let [pokimanList, setpokimanList] = useState([]);
   let [islodoing, setislodoing] = useState(true);
   let [pokidexUrl, setpokidexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
   let [nextPokeUrl, setnextPokeUrl] = useState();
   let [prevPokeUrl, setprevPokeUrl] = useState();

   async function DownlodePokiman() {
    setislodoing(true);
     const response = await axios.get(pokidexUrl);
     const resultarry = response.data.results;
      setnextPokeUrl(response.data.next);
     setprevPokeUrl(response.data.previous);
     // Fetch all Pokémon details concurrently
     const pokimonpromices = resultarry.map((pokimon) => axios.get(pokimon.url));
     const pokimondata = await axios.all(pokimonpromices);

     // Process the fetched data
     let res = pokimondata.map((pokeData) => {
       let pokimon = pokeData.data;
       return {
         name: pokimon.name,
         weight: pokimon.weight,
         height: pokimon.height,
         image: pokimon.sprites.other.dream_world.front_default || pokimon.sprites.front_shiny, // Correct way to access image
         types: pokimon.types,
         id: pokimon.id
       };
     });

     // Update the state with the fetched data
     setislodoing(false);
     setpokimanList(res);
   }

   useEffect(() => {
     DownlodePokiman();
   }, [pokidexUrl]);

   return (
     <div>
       <div>Pokémon lists</div>
       <div className="pokiman-list">
       {islodoing ? (
         "loading...."
       ) : (
         pokimanList.map((pokemon) => {
           return (
             <Pokimon
               name={pokemon.name}
               image={pokemon.image}
               key={pokemon.id}
             />
           );
         })

       )}
       </div>
        <div className="controlls">
          
        <button disabled={prevPokeUrl===null} onClick={()=>setpokidexUrl(prevPokeUrl)} id="next">previous</button>
          <button disabled={nextPokeUrl===null} onClick={()=>setpokidexUrl(nextPokeUrl)} id="prev">next</button>
          
          
        </div>
       
       </div>
     
   );
}

export default Pokiman;


