function Pokimon({ name, image }) {
    return (
      <div>
        <div>{name}</div>
        <img src={image} alt={name} /> {/* Render the image using the 'img' tag */}
      </div>
    );
  }
  
  export default Pokimon;
  