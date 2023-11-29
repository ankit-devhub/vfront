import { UPDATEVEHICLELIST,UPDATEEDITSTATE,UPDATEVEHICLE } from "../constants/actionTypes";  

export const vehicleList = (data) => {
  return {
    type: UPDATEVEHICLELIST,
    payload: data
  }
}

export const vechileEditState = (data) => {
  return {
    type: UPDATEEDITSTATE,
    payload: data
  }
}


export const editVehicle = (data) => {
  return {
    type: UPDATEVEHICLE,
    payload: data
  }
}



