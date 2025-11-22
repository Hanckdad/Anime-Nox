import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/utils/constants';
import type { User, WatchHistory } from '@/types';

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

// User management
export const authService = {
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
};

// User profile management
export const userService = {
  async createUserProfile(userId: string, email: string, name: string, avatar?: string) {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email,
        name,
        avatar,
        watch_history: [],
        subscriptions: [],
        created_at: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          videoQuality: '720p',
          autoPlay: true,
          skipIntro: false,
          language: 'id'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    return data;
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  },

  async updateWatchHistory(userId: string, watchHistory: WatchHistory[]) {
    const { error } = await supabase
      .from('users')
      .update({ watch_history: watchHistory })
      .eq('id', userId);

    if (error) {
      console.error('Error updating watch history:', error);
      return false;
    }
    
    return true;
  },

  async updateSubscriptions(userId: string, subscriptions: string[]) {
    const { error } = await supabase
      .from('users')
      .update({
