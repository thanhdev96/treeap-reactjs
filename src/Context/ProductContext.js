import { createContext , useState} from "react";

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]); 
    const [cart, setNewCart] = useState([]);
  
    return (
      <ProductContext.Provider value={{ product, setProduct }}>
        {children}
      </ProductContext.Provider>
    );
  };

export default ProductContext;