import axios from 'axios';
import { ResumeData } from './store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api' 
    : (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:4000` : 'http://localhost:4000'));

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nestjs_jwt');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface SyncResponse {
  access_token: string;
  user: UserProfile;
}

export interface ResumeServerResponse {
  id: string;
  userId: string;
  templateId: string;
  title: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // Auth sync
  async syncUser(googleId: string, email: string, name: string, picture?: string): Promise<SyncResponse> {
    const { data } = await apiClient.post<SyncResponse>('/auth/sync', {
      googleId,
      email,
      name,
      picture,
    });
    // Save token locally
    if (typeof window !== 'undefined') {
      localStorage.setItem('nestjs_jwt', data.access_token);
      localStorage.setItem('nestjs_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout clear
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nestjs_jwt');
      localStorage.removeItem('nestjs_user');
    }
  },

  // Resumes API
  async getResumes(): Promise<ResumeServerResponse[]> {
    const { data } = await apiClient.get<ResumeServerResponse[]>('/resumes');
    return data;
  },

  async getResume(id: string): Promise<ResumeServerResponse> {
    const { data } = await apiClient.get<ResumeServerResponse>(`/resumes/${id}`);
    return data;
  },

  async createResume(templateId: string, title: string, resumeData: ResumeData): Promise<ResumeServerResponse> {
    const { data } = await apiClient.post<ResumeServerResponse>('/resumes', {
      templateId,
      title,
      data: resumeData,
    });
    return data;
  },

  async updateResume(id: string, update: { templateId?: string; title?: string; data?: ResumeData }): Promise<ResumeServerResponse> {
    const { data } = await apiClient.patch<ResumeServerResponse>(`/resumes/${id}`, update);
    return data;
  },

  async deleteResume(id: string): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`/resumes/${id}`);
    return data;
  },

  async uploadAndParseResume(file: File): Promise<ResumeData> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<ResumeData>('/resumes/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // Points & Monetization
  async getPoints(): Promise<{ points: number }> {
    const { data } = await apiClient.get<{ points: number }>('/users/me/points');
    return data;
  },
  async redeemPoint(): Promise<{ points: number }> {
    const { data } = await apiClient.post<{ points: number }>('/users/me/redeem');
    return data;
  },
  async createRazorpayOrder(): Promise<{ orderId: string, amount: number, currency: string }> {
    const { data } = await apiClient.post<{ orderId: string, amount: number, currency: string }>('/payments/create-order');
    return data;
  },
  async verifyRazorpayPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ): Promise<{ success: boolean, points: number }> {
    const { data } = await apiClient.post<{ success: boolean, points: number }>('/payments/verify', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });
    return data;
  }
};
