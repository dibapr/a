import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// asyncThunk buat ngejalanin function yang sifatnya async, cocok buat fetching data
export const getProduct = createAsyncThunk("product/getProduct", async () => {
  const response = await axios.get("http://localhost:5000/product");
  return response.data;
});

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/product", {
      title,
      price,
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/product/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.get(`http://localhost:5000/product/${id}`);
    return id;
  }
);

// ======================

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",

  // ini kalo pake entityAdapter
  initialState: productEntity.getInitialState(),
  //   ======================

  //   buat initial state biasa
  //   initialState: {
  //       title: "Product 1",
  //       price: "123",
  //     },
  //   ======================

  //   buat reducer biasa
  //     reducers: {
  //       update: (state, action) => {
  //         state.title = action.payload.title;
  //         state.price = action.payload.price;
  //       },
  //     },
  //     ======================

  extraReducers: {
    [getProduct.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state, action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

// biar bisa dibikin jadi selector kalo pake entity adapter, nama state nya harus sama kayak nama reducer di store nya
export const productSelector = productEntity.getSelectors(
  (state) => state.product
);
// ====================

export const { update } = productSlice.actions;
export default productSlice.reducer;
