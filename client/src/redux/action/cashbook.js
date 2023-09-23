import * as api from '../api'
import { start, end, error, getCashbookReducer, getCashbooksReducer, getSpecificDateCashbookReducer, getIncomeAndExpensesReducer, getPaymentsReducer, createCashbookReducer, deleteCashbookReducer, } from '../reducer/cashbook'
import { deleteApproval } from './approval'
import { updateLead } from './lead'


export const getCashbook = (cashbookId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbook(cashbookId)
        dispatch(getCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getCashbooks = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbooks()
        dispatch(getCashbooksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getLeadCashbooks = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadCashbooks(leadId)
        dispatch(getCashbooksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getSpecificDateCashbook = (type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSpecificDateCashbook(type)
        dispatch(getSpecificDateCashbookReducer({ cashIn: data.result.cashIn, cashOut: data.result.cashOut }))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getIncomeAndExpenses = (year) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getIncomeAndExpenses(year)
        dispatch(getIncomeAndExpensesReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getPayments = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getPayments()
        dispatch(getPaymentsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createCashbook = (cashbookData, approvalId, leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createCashbook(cashbookData)

        if (cashbookData.password) {    // in case of refund, after successful createCashbook, we have to delete that approval + we need to update the status of lead
            dispatch(deleteApproval(approvalId, 'refund'))
            dispatch(updateLead(leadId, { isAppliedForRefund: false }))
        }

        dispatch(createCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteCashbook = (cashbookId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteCashbook(cashbookId)
        dispatch(deleteCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}