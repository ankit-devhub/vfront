import { UPDATEVEHICLELIST,UPDATEEDITSTATE,UPDATEVEHICLE} from "../constants/actionTypes";


const VLS = [];



export const vehicleListReducer = (STATE = VLS, actionTypes) => {
    switch (actionTypes.type) {
        case UPDATEVEHICLELIST:
            return (STATE = actionTypes.payload);
        default:
            return STATE;
    }
}

const EVS = false;

export const editVehicleStateReducer = (STATE = EVS, actionTypes) => {

    switch (actionTypes.type) {
        case UPDATEEDITSTATE:
            return (STATE = actionTypes.payload);
        default:
            return STATE;
    }
}

const EV = {};
export const vehicleEditReducer = (STATE = EV, actionTypes) => {
    switch (actionTypes.type) {
        case UPDATEVEHICLE:
            return (STATE = actionTypes.payload);
        default:
            return STATE;
    }
}