import { useState, useEffect } from 'react'
interface Product {
    name: string;
    price: number;
    type: string;
    image: string;
}

const oneProduct = () => {

  const [loading, setLoading] = useState(false);
  

  return (
    <div className='container oneProduct'>
        
    </div>
  )
}

export default oneProduct