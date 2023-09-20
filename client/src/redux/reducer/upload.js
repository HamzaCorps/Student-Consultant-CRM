import { createSlice } from "@reduxjs/toolkit";
import { rootURL } from "../../constant";

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        url: null,
        urls: [],
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },

        uploadImageReducer: (state, action) => {
            const { result, isMultiple } = action.payload
            console.log('[`${rootURL}${result}`, ...state.urls]', [`${rootURL}${result}`, ...state.urls])
            isMultiple
                ?
                state.urls = [`${rootURL}${result}`, ...state.urls]
                :
                state.url = `${rootURL}${result}`
        },
        deleteImageReducer: (state, action) => {
            const { filename, isMultiple } = action.payload
            isMultiple
                ?
                state.urls = state.urls.filter(url => url != `${rootURL}/uploads/${filename}`)
                :
                state.url = null
        },
        deleteAllImagesReducer: (state) => {
            state.urls = []
        }
    }
})

export const {
    start,
    end,
    error,
    uploadImageReducer,
    deleteImageReducer,

    deleteAllImagesReducer,

} = uploadSlice.actions
export default uploadSlice.reducer