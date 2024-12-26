import './pokimonui.css';
function Pokimon({ name, image }) {
    return (
      
      <div className='pokiman'>
          <div className='name'>{name} </div>
      <div className='imgc'> <img src={image} alt={name}  id='img2'/></div>  {/* Render the image using the 'img' tag */}
         
      </div>

      
    );
  }
  
  export default Pokimon;
  