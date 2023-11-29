import React from 'react'
import reefer from '../../assets/png/reefer.png'
import KindTag from './utils/KindTag'
import { MdOutlineArchive } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editVehicle, vechileEditState, vehicleList } from '../../state/actions/vehicle';
import { toast } from 'react-toastify';

function ActiveVehicles() {


    const dispatch = useDispatch();
    const vechiles = useSelector(state => state.vehicleListReducer);

    console.log(vechiles);
    

 



    const handleDelete = (id) => {
        axios
            .delete(`https://crudbackend-three.vercel.app/vehicles/${id}`)
            .then((res) => {
                console.log('Delete request successful:', res.data);
                dispatch(vehicleList(vechiles.filter((v) => v._id !== id)));
                toast.success('Vehicle deleted successfully');
            })
            .catch((err) => {
                console.log('Error deleting vehicle:', err);
            });
    };


    const VehicleTag = ({ vehicle }) => {

        const handleEdit = (vehicle) => {
            dispatch(editVehicle(vehicle));
            dispatch(vechileEditState(true));
       
        }
        return (
            <div className='flex flex-col bg-white h-full w-full rounded-md p-3'>
                <div className='flex gap-3 border-b'>
                    <img height={120} width={120} src={reefer} alt=""/>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex justify-end'>
                            <KindTag kind={vehicle.kind} />
                        </div>
                        <div className='text-xs'>
                            Chassis : {(vehicle.chassisNumber).toUpperCase()}
                        </div>
                        <div className='text-lg font-semibold'>
                            Reg No:{(vehicle.registrationNumber).toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>

                    <div className='p-2 text-sm flex justify-between border-b'>
                        <span>
                            Location : {`[${vehicle.lastLocation[0]},${vehicle.lastLocation[1]}]`}
                        </span>
                        <span>
                            Miles : {vehicle.milesDriven}
                        </span>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <MdOutlineArchive size={20} className='cursor-pointer'/>
                        <MdDelete size={20} fill='red' className='cursor-pointer' onClick={()=>handleDelete(vehicle._id)} />
                        <FaEdit size={20} className='cursor-pointer' onClick={()=>handleEdit(vehicle)} />
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className='grid grid-flow-row grid-cols-1 p-4 gap-4 lg:grid-cols-2 2xl:grid-cols-3'>
           
            {
                vechiles.filter((veh)=>veh.active).map((v, index) => (
                    <div key={index}>
                        <VehicleTag vehicle={v} />
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveVehicles