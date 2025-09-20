// src/hooks/usePost.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://journal-backend-m4in.onrender.com", // change this to your backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function usePost() {
  const mutation = useMutation({
    mutationFn: async ({ endpoint, formData }) => {
      const res = await api.post(endpoint, formData);
      return res.data;
    },
  });

  return {
    ...mutation, // contains mutate, mutateAsync, data, error, etc.
    isLoading: mutation.isPending, // expose as `isLoading` for clarity
  };
}
