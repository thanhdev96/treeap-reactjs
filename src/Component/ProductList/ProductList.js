
import './Product.css'
const ProductList = (props) => {
  const { products , onAddProductToCart} = props;
  return (
    <div className='productLisContainer'>
      {products.map((product) => {
        const {productImage,productName,productPrice, id} = product;
        return(
            <div 
            productName = {productName}
            productImage = {productImage}
            productPrice = {productPrice}
            onAddProductToCart = {onAddProductToCart}
            productId = {id}
            key= {id}
            />
          )
})}
    </div>
  );
};

export default ProductList;
