import { combineReducers } from "redux"
import { vehicleListReducer ,editVehicleStateReducer,vehicleEditReducer} from "./vehicle"

const rootReducer = combineReducers({
 vehicleListReducer,editVehicleStateReducer,vehicleEditReducer
})

export default rootReducer