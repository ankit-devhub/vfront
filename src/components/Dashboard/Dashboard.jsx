import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import CompletedTrips from '../Vehicles/CompletedTrips'
import CreateNewModel from '../Vehicles/CreateNewModel'
import ActiveVehicles from '../Vehicles/ActiveVehicles'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { vehicleList } from '../../state/actions/vehicle'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

    const dispatch = useDispatch();
    const [loadingSplash, setLoadingSplash] = React.useState(true)
    

    useEffect(() => {

        axios.get('https://crudbackend-three.vercel.app/vehicles/').then(res => {
            console.log(res.data);
            dispatch(vehicleList(res.data))
        }).catch(err => {
            console.log(err);
            
        }).finally(() => {  
            setLoadingSplash(false)
        })

    }, [])

    const [showCreateNewModel, setShowCreateNewModel] = React.useState(false)
    const editvechileState = useSelector(state => state.editVehicleStateReducer)
    return (
        <div className='flex flex-col gap-2 h-screen w-full'>
            <Navbar />
            <div className='h-full w-full grid grid-flow-row grid-cols-1 gap-2 p-2 md:p-1 md:gap-8 md:grid-cols-3 xl:px-20 bg-gradient-to-br'>
                <div className='col-span-2 pb-4 flex flex-col gap-3'>
                    <div className='flex justify-between'>
                        <div className='font-semibold text-xl p-2'>
                            Active Vehicles
                        </div>
                        <div className=' p-2 bg-green-300 rounded-md px-3 cursor-pointer' onClick={() => setShowCreateNewModel(true)} >
                            Create New
                        </div>
                    </div>
                    <div className='bg-primary rounded-md h-full'>
                        <ActiveVehicles loadingSplash={loadingSplash}/>
                    </div>

                </div>
                <div className='col-span-1 pb-4 flex flex-col gap-3'>
                   <div className='flex justify-between'>
                        <div className='font-semibold text-xl p-2'>
                            Inactive Vehicles
                        </div>
                    </div>
                    <div className='bg-primary rounded-md h-full overflow-y-auto'>
                        <CompletedTrips />
                    </div>
                </div>
            </div>
            {
                (showCreateNewModel || editvechileState) && <CreateNewModel updateVisiblity={setShowCreateNewModel} />
            }

            <ToastContainer />
        </div>

    )
}

export default Dashboard