import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../api/blogApi";
import { careerApi } from "../api/careerApi";
import { catalogueApi } from "../api/catalogueApi";
import { contentApi } from "../api/contentApi";
import { dealerApi } from "../api/dealerApi.";
import { roleApi } from "../api/rolesApi";
import { authApi } from "../api/authApi";
import { categoryApi } from "../api/categoryApi";
import { userApi } from "../api/userApi";
import { contactApi } from "../api/contactApi";
import { parentCategoryApi } from "../api/parentCategoryApi";
import { leadApi } from "../api/leadApi";
import { productApi } from "../api/productsApi";

export const store = configureStore({
  reducer: {
    [parentCategoryApi.reducerPath]: parentCategoryApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [careerApi.reducerPath]: careerApi.reducer,
    [catalogueApi.reducerPath]: catalogueApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [dealerApi.reducerPath]: dealerApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      parentCategoryApi.middleware,
      contactApi.middleware,
      blogApi.middleware,
      catalogueApi.middleware,
      careerApi.middleware,
      contentApi.middleware,
      dealerApi.middleware,
      roleApi.middleware,
      authApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      leadApi.middleware,
      productApi.middleware
    ),
});

export default store;
