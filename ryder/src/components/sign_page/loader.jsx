import React from 'react'
import { RevolvingDot } from  'react-loader-spinner'
import '../../styles/special.css'

function Loader({visiblility}) {
  return (
    <div>
        <div className='holderprocess'>
            <div className="content">
                <RevolvingDot
                radius="45"
                strokeWidth="5"
                color="#00b61e85"
                secondaryColor='#FB8500'
                ariaLabel="revolving-dot-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={visiblility}
                />
                <span>Processing Information...</span>
            </div>
        </div>
    </div>
  )
}

export default Loader;
