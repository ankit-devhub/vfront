import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    const vehicleList = useSelector(state => state.vehicleListReducer)
    const itemList = [{
        label: 'Total Vehicles',
        value: vehicleList.length
    }, {
        label: 'Active Vehicles',
        value: vehicleList.filter((vehicle) => vehicle.active).length
    }, {
        label: 'Inactive Vehicles',
        value: vehicleList.filter((vehicle) => !vehicle.active).length
    },
   ]

    const NavBarItem = ({ label, value }) => {
        return (
            <div className='flex flex-col items-center border select-none  border-dashed p-1 rounded-md'>
                <div>{label}</div>
                <div>{value}</div>
            </div>
        )
    }

    return (
        <div className='flex justify-between p-3 md:px-20 py-3 bg-cyan-400 items-center'>
            <div>
                {`{logo}`}
            </div>
            <div className='flex gap-10 items-center'>
                <div className='lg:flex hidden gap-3'>
                    {itemList.map((item, index) => (
                        <div>
                            <NavBarItem key={index} label={item.label} value={item.value} />
                        </div>
                    ))}
                </div>
                <div>
                    <FaRegUserCircle size={40} />
                </div>
              
            </div>
        </div>)
}
export default Navbar