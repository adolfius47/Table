import {DELETE_POST} from '../actions'

export default payload => {
    return {
        type: DELETE_POST,
        payload
    }
}