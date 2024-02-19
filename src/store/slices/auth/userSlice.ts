import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';

export type UserState = {
  authority?: string[];
  user?: {
    name?: string;
    organizationName?: string;
    status?: string;
  };
  completedSteps?: number[];
  lastCompletedStep?: number;
  nextStepNumber?: number;
  totalSteps?: number;
};

const initialState: UserState = {
  authority: [],
  user: {
    name: '',
    organizationName: '',
    status: '',
  },
  completedSteps: [],
  lastCompletedStep: 0,
  nextStepNumber: 1,
  totalSteps: 0,
};

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.authority = action.payload?.authority || initialState.authority;
      state.user = action.payload?.user || initialState.user;
      state.completedSteps = action.payload?.completedSteps || initialState.completedSteps;
      state.lastCompletedStep = action.payload?.lastCompletedStep || initialState.lastCompletedStep;
      state.nextStepNumber = action.payload?.nextStepNumber || initialState.nextStepNumber;
      state.totalSteps = action.payload?.totalSteps || initialState.totalSteps;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
