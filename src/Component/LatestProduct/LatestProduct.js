import React from 'react'
import ProducstItem from './ProducstItem';


const LatestProduct = ({ latestProduct, setProduct }) => {
  return (
    <div>
      <ProducstItem latestProduct={latestProduct} setProduct={setProduct} />

    </div>
  )
}

export default LatestProduct