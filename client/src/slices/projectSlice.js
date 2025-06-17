

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../utils/http';
export const fetchProjects= createAsyncThunk('projects/fetchProjects', async () => {
  const response = await http.get('/api/projects');
  return response.data;
});
const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        status: 'idle', // 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProjects.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default projectSlice.reducer;