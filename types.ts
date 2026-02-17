import React from 'react';

export interface PhotoItem {
  id: number;
  url: string;
  title: string;
  category: string;
  description?: string; // Novo campo para descrição do evento
}

export interface Album {
  id: number;
  title: string;
  coverUrl: string;
  date: string;
  description: string;
  photos: PhotoItem[];
}

export interface ServiceItem {
  title: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
}

export enum AIAnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AICaptionResponse {
  caption: string;
  technicalAnalysis: string;
  tags: string[];
}

export type ViewState = 'home' | 'admin';