// src/hooks/useGet.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "https://journal-backend-m4in.onrender.com", // change to your backend
});

// Add interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hook
export default function useGet(endpoint, options = {}) {
  const query = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await api.get(endpoint);
      return res.data;
    },
    ...options,
  });

  return {
    ...query,      // includes data, error, isLoading, etc.
    refetch: query.refetch, // explicit refetch function
  };
}
