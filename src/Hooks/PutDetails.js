// src/hooks/usePut.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "https://journal-backend-m4in.onrender.com",
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hook
export default function usePut() {
  const mutation = useMutation({
    mutationFn: async ({ endpoint, formData }) => {
      const res = await api.put(endpoint, formData);
      return res.data;
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
}
