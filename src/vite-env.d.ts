/// <reference types="vite/client" />

interface Window {
  ym?: (counterId: number, method: string, target: string, params?: Record<string, unknown>) => void;
}
