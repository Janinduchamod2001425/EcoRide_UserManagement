import React from 'react'
import { Link } from 'react-router-dom';

const PackageDetailsScreen = () => {
  return (
    <div className='py-5'>
        <Link to='/packages'><button>Customize</button></Link>
        <Link to='/reservation'><button>Buy</button></Link>
    </div>
  )
}

export default PackageDetailsScreen