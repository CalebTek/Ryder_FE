import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import '../../styles/ryderEarnings.css'
import Vector from '../../images/Vector.svg';
import Time from '../../images/Time.svg'
import RiderNavbar from '../../components/dashboard/riderNavbar'



export default function RyderEarnings(){
  return (
    <div>
     <RiderNavbar/>
     <div className='container-fluid parent mt-4'>
        <div className='container-fluid layer'></div>
        <div className="card container">
            <div className='container show-earnings text-center py-3'>
                <p className='myEarnings'>MY EARNINGS</p>
                <h4 className='fs-3 fw-bold earning-amount'>N236,000</h4>
                <div className='container d-flex flex-row justify-content-evenly mt-4'>
                    <section>
                        <img src= {Vector} alt='car'/>
                        <span className='ps-2'>112 Rides</span>
                    </section>

                    <section>
                        <img src={Time} alt="time" />
                        <span className='ps-2'>890hrs . 20mins</span>
                    </section>
                </div>
            </div>
            <div className="card-body">
               <TodayEarnings/>
               <TodayEarnings/>
               <TodayEarnings/>
              
            </div>
        </div>
     </div>
    </div>
    
  )
}


function TodayEarnings(){
    return (
        <div className='container child-container d-flex flex-row justify-content-between border shadow-sm mb-3'>
            <span className='align-self-center today'><span className='fw-bold'>Today</span>, 10:15AM</span>
            <span className='lh-1 py-3'>
                <p className='delivered border py-2 px-4'>Delivered</p>
                <p className='ps-4'>N2,200.00</p>
            </span>
        </div>
    )
}