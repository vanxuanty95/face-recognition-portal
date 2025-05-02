import axiosInstance from "@/axios/axiosInstance";

interface LoginPayload {
  studentId: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    console.log("login payload:", payload);
    const response = await axiosInstance.post("/api/auth/login", payload);
    return response.data; // Return the response data (e.g., token, user info)
  } catch (error: any) {
    // Handle and throw the error for the caller to manage
    throw new Error(error.response?.data?.message || "Login failed");
  }
};