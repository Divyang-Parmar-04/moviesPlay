import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  popularMovies: [],
  hollywoodMovies: [],
  bollywoodMovies: [],
  ShowResult:[],
  disclaimer:true,
  series: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setHollywoodMovies: (state, action) => {
      state.hollywoodMovies = action.payload;
    },
    setBollywoodMovies: (state, action) => {
      state.bollywoodMovies = action.payload;
    },
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setShowResult:(state,action)=>{
      state.ShowResult = action.payload
    },
    setDisclaimer:(state)=>{
      state.disclaimer = false
    }
  },
});

export const {
  setPopularMovies,
  setHollywoodMovies,
  setBollywoodMovies,
  setSeries,
  setShowResult,
  setDisclaimer
} = dataSlice.actions;

export default dataSlice.reducer;
