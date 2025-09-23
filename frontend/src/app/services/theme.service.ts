import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>(this.getLightTheme());
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private getLightTheme(): Theme {
    return {
      name: 'light',
      primary: '#1e3a8a',
      secondary: '#10b981',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      isDark: false
    };
  }

  private getDarkTheme(): Theme {
    return {
      name: 'dark',
      primary: '#3b82f6',
      secondary: '#34d399',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      isDark: true
    };
  }

  toggleTheme(): void {
    const currentTheme = this.currentThemeSubject.value;
    const newTheme = currentTheme.isDark ? this.getLightTheme() : this.getDarkTheme();
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--surface-color', theme.surface);
    root.style.setProperty('--text-color', theme.text);
    
    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem('theme', JSON.stringify(theme));
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        this.setTheme(theme);
      } catch (error) {
        console.error('Error loading saved theme:', error);
        this.setTheme(this.getLightTheme());
      }
    } else {
      this.setTheme(this.getLightTheme());
    }
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }
}














