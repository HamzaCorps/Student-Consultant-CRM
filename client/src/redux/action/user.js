import * as api from '../api'
import { start, end, error, registerReducer, loginReducer, logoutReducer, getUserReducer, getClientsReducer, getUsersReducer, getEmployeesReducer, createClientReducer, createEmployeeReducer, updateUserReducer, deleteUserReducer, } from '../reducer/user'
import Cookies from 'js-cookie'

export const register = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        dispatch(registerReducer(data.result))
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        const { token, ...result } = data.result
        Cookies.set('crm_profile', JSON.stringify(data.result))
        dispatch(loginReducer(result))
        navigate('/')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.logout()
        dispatch(logoutReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        console.log('data', data)
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getClients = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getClients()
        console.log('data', data)
        dispatch(getClientsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getEmployees = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployees()
        dispatch(getEmployeesReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createClient = (clientData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createClient(clientData)
        dispatch(createClientReducer(data.result))
        navigate('/clients')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createEmployee = (employeeData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createEmployee(employeeData)
        dispatch(createEmployeeReducer(data.result))
        navigate('/employees')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateRole = (userId, role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateRole(userId, role)
        dispatch(updateUserReducer(data.result))

        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateUser = (userId, userData, role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userId, userData)
        dispatch(updateUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteUser(userId)
        dispatch(deleteUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}