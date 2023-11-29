import React from 'react'
import { convertToDate } from '../../utils'
import reefer from '../../assets/png/reefer.png'
import KindTag  from './utils/KindTag'
import { FaLocationArrow } from "react-icons/fa";
import { useSelector } from 'react-redux';
function CompletedTrips() {


    const vehicleList = useSelector(state => state.vehicleListReducer)
    
    const LogoTag = ({kind}) =>{

        switch (kind) { // Reefer, Heavy, Flatbed, Dry Van  
            case 'Reefer':
                return (
                   <img height={120} width={120} src={reefer} alt=""/>
                )
            case 'Heavy':
                return (
                    <img height={120} width={120} src={reefer} alt=""/>

                )
            case 'Light':
                return (
                    <img height={120} width={120} src={reefer} alt=""/>
                )
            
        }
    }


    const TripModel = ({ trip }) => {
        return (
            <div className='bg-white p-3 rounded-md flex items-center gap-5 w-full'>
                <div className='rounded-md hidden lg:flex overflow-hidden'>
                    <LogoTag kind={trip.kind} />
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <div className='flex justify-between text-xs items-center'>
                        <div><span>Chassis </span>{(trip.chassisNumber).toUpperCase()}</div>
                        <div>
                            {trip.milesDriven} miles
                        </div>
                        <div>
                            <KindTag kind={trip.kind} />    
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>

                        <span className='text-sm'>Reg No</span>
                        <div className='text-xl font-semibold'>{(trip.registrationNumber).toUpperCase()}</div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span><FaLocationArrow size={13}/></span>
                            <div className=''> {`[${trip.lastLocation[0]},${trip.lastLocation[1]}]` }</div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <div className='w-full bg-primary p-2'>
            {/* <div>Completed Trips</div> */}
            <div className='flex flex-col gap-3 p-2 w-full'>
                {
                    vehicleList.filter((veh)=>!veh.active).map((trip, index) => (
                        <div key={index}>
                            <TripModel trip={trip} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CompletedTrips