import { createStore } from 'redux'

// 1. Save all the channels at one place - Application State
let initialState = {
    email: '',
    name: '',
    password: '',
    phone: '',
    address: '',
    loginError: false,
    dataMissing: false,
    emailFormatNotMatch: false,
    passwordFormatNotMatch: false,
    submitError: false,
    phoneError: false,
    role: '',
    users: []

}

// 2. function - expose that function - to raise/trigger change requests - dispatch function -
// dispatch(action)

// 3. function - make the necessary changes - reducer function

export function appRuducerFunction(state = initialState, action) {
    //console.log("redux state here", state)
    //console.log("redux action here", action)
    let stateCopy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'email':
            stateCopy.email = action.payload
            return stateCopy;
        case 'name':
            stateCopy.name = action.payload
            return stateCopy;
        case 'phone':
            stateCopy.phone = action.payload
            return stateCopy;
        case 'address':
            stateCopy.address = action.payload
            return stateCopy;
        case 'password':
            stateCopy.password = action.payload
            return stateCopy;
        case "role":
            stateCopy.role = action.payload
            return stateCopy
        case "dataMissing":
            stateCopy.dataMissing = action.payload
            return stateCopy
        case "emailFormatNotMatch":
            stateCopy.emailFormatNotMatch = action.payload
            return stateCopy
        case "passwordFormatNotMatch":
            stateCopy.passwordFormatNotMatch = action.payload
            return stateCopy
        case "loginError":
            stateCopy.loginError = action.payload
            return stateCopy
        case "phoneError":
            stateCopy.phoneError = action.payload
            return stateCopy
        case "submitError":
            stateCopy.submitError = action.payload
            return stateCopy
        case "addUser":
            const users = JSON.parse(localStorage.getItem('users'))
            if (users) {
                users.push(action.payload)
                const newState = JSON.parse(JSON.stringify(stateCopy))
                newState.users = users
                stateCopy = newState
                if (typeof window !== "undefined") {
                    localStorage.setItem("users", JSON.stringify(stateCopy.users));
                }
            }
            else {
                const stateAllUser = JSON.parse(JSON.stringify(stateCopy))
                stateAllUser.users.push(action.payload)
                stateCopy.users = stateAllUser.users
                if (typeof window !== "undefined") {
                    localStorage.setItem("users", JSON.stringify(stateCopy.users));
                }
            }
            return stateCopy
        case "users":
            const allUser = JSON.parse(JSON.stringify(stateCopy))
            allUser.users = action.payload
            stateCopy = allUser
            return stateCopy
        default:
            return state
    }

}

// 4. Create a package - (state, dispatch) - store - there should be a way to create this store - already present in redux
const store = createStore(appRuducerFunction)

export default store;