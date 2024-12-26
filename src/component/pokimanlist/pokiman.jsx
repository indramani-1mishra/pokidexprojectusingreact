import { useEffect, useState } from "react";
import axios from "axios";
import "./pokimon.css"
import Pokimon from "../pokimonui/pokimonui";

function Pokiman() {
   let [pokimanList, setpokimanList] = useState([]);
   let [islodoing, setislodoing] = useState(true);

   async function DownlodePokiman() {
     const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
     const resultarry = response.data.results;

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
   }, []);

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
          
          <button>next</button>
          <button>prev</button>
        </div>
       
       </div>
     
   );
}

export default Pokiman;
