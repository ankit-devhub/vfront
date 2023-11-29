import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import InputType from './utils/InputType'
import { FaLocationDot } from "react-icons/fa6";
import { MdModeOfTravel } from "react-icons/md";
import { IoCarSharp } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { vechileEditState, vehicleList } from '../../state/actions/vehicle';
import { toast } from 'react-toastify';

function CreateNewModel({ updateVisiblity}) {
  const [chassisNumber, setChassisNumber] = React.useState('');
  const [milesDriven, setMilesDriven] = React.useState('');
  const [registrationNumber, setRegistrationNumber] = React.useState('');
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [lastInspectionDate, setLastInspectionDate] = React.useState('');
  const [kind, setKind] = React.useState('Reefer');
  const [action, setAction] = React.useState('New');
  const [id, setId] = React.useState('')
  const vechiles = useSelector(state => state.vehicleListReducer);
  const editvechileState = useSelector(state => state.editVehicleStateReducer)
  const editVehicle = useSelector(state => state.vehicleEditReducer)
  useEffect(() => {
    if( editvechileState){
      handleEdit(editVehicle)
      console.log(editVehicle);
    }
  }, [])

  const handleEdit = (info) => {
    setChassisNumber(info.chassisNumber);
    setRegistrationNumber(info.registrationNumber);
    setLongitude(info.lastLocation[0]);
    setLatitude(info.lastLocation[1]);
    setKind(info.kind);
    setMilesDriven(info.milesDriven);
    setAction("Update")
    setId(info._id)
}

  const resetKeys = () => {
    setChassisNumber('');
    setRegistrationNumber('');
    setKind('');
    setMilesDriven('');
    setLongitude('');
    setLatitude('');
}
const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (action === 'New') {
      axios.post('https://crudbackend-three.vercel.app/vehicles/', {
        chassisNumber,
        milesDriven,
        registrationNumber,
        lastLocation: [longitude, latitude],
        lastInspectionDate,
        kind
      }).then(res => {
        console.log(res);
        dispatch(vehicleList([...vechiles, res.data]))
        updateVisiblity(false);
        toast.success('Vehicle Added Successfully')
      }).catch(err => {
        console.log(err);
      })
    }
    else {
      axios.put(`https://crudbackend-three.vercel.app/vehicles/${id}`, {
        chassisNumber,
        milesDriven,
        registrationNumber,
        lastLocation: [longitude, latitude],
        lastInspectionDate,
        kind
      }).then(res => {
        console.log(res);
        dispatch(vehicleList(vechiles.map((v) => v._id === id ? res.data.updatedVehicle : v)));
        updateVisiblity(false);
        toast.success('Vehicle Updated Successfully')
        dispatch(vechileEditState(false));
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div className='absolute bg-black bg-opacity-50 w-full h-screen flex items-center justify-center'>
      <div className='bg-white p-10 rounded-md shadow-2xl relative flex flex-col gap-2'>
        <div className='absolute top-2 right-2 cursor-pointer' onClick={() => {updateVisiblity(false); dispatch(vechileEditState(false));}}>
          <IoMdClose size={30} />
        </div>
        <div className='text-2xl font-semibold'>
          Create New Vehicle
        </div>

        <form action="" onSubmit={handleSubmit} className='flex flex-col w-full gap-6 mt-8'>
          <InputType required={true} label={<IoCarSharp size={30} />} type='text' value={chassisNumber} setValue={setChassisNumber} placeholder='Chassis Number' />
          <InputType required={true} label={<IoCarSharp size={30} />} type='text' value={registrationNumber} setValue={setRegistrationNumber} placeholder='Registration No' />
          <div className='flex gap-6'>
            <InputType label={<FaLocationDot />} required={true} type='Number' value={longitude} setValue={setLongitude} placeholder='Longitude' />
            <InputType label={<FaLocationDot />} required={true} type='Number' value={latitude} setValue={setLatitude} placeholder='latitude' />
          </div>
          <select className="p-3 px-4 rounded-md bg-slate-100" onChange={(e) => setKind(e.target.value)} value={kind} placeholder='Select Vehicle Kind'>
            <option value="Reefer">Reefer</option>
            <option value="Heavy">Heavy</option>
            <option value="Light">Light</option>
          </select>
          <InputType label={<MdModeOfTravel />} required={true} type='Number' min={0} value={milesDriven} setValue={setMilesDriven} placeholder='Miles Driven' />

          <div className='flex items-center justify-center gap-5'>
            <input className='p-2 px-3 text-lg bg-green-200 rounded-md cursor-pointer' type="submit" value={`${action === 'New' ? "Add" : "Update"}`} />
            <input className='p-2 px-3 text-lg bg-red-300 rounded-md cursor-pointer' type="reset" value="Reset" onClick={() => {
              resetKeys();
              setAction("New");
            }} />
          </div>
        </form>
        <div className='w-fit hidden md:flex'>
          <div className=''>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewModel