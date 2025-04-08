import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCrypto = createAsyncThunk(
  "crypto/fetchCurrencies",
  async () => {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr`
    );
    const data = response.json();
    return data;
  }
);

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState: {
    currencies: [],
    filterCrypto: [],
    myCrypto: [],
    total: 0,
    currentCrypto: null,
    loading: null,
    error: null,
  },
  reducers: {
    setMyCrypto: (state, action) => {
      let id = state.myCrypto.find((i) => i.symbol === action.payload.symbol);
      if (id) {
        id.value += action.payload.value;
      } else {
        state.myCrypto.push(action.payload);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    delMyCrypto: (state, action) => {
      state.myCrypto = state.myCrypto.filter((i) => i.id !== action.payload);
    },
    setCurrentCrypto: (state, action) => {
      state.currentCrypto = action.payload;
    },
    setFilterCrypto: (state, action) => {
      state.filterCrypto = state.currencies.filter((i) =>
        i.symbol
          .replace("USDT", "")
          .toLowerCase()
          .includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCrypto.fulfilled, (state, action) => {
        const arr = [];
        state.loading = false;
        action.payload.forEach((el) => {
          if (
            el.symbol.endsWith("USDT") &&
            el.lastPrice > 0 &&
            arr.indexOf(el) == -1
          ) {
            arr.push(el);
          }
        });
        state.currencies = arr;
      })
      .addCase(getCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentCrypto,
  setFilterCrypto,
  setMyCrypto,
  setAllMyCrypto,
  delMyCrypto,
  setTotal,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
