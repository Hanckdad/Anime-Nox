import { useState, useEffect } from 'react';
import { User } from '@/types';
import { authService, userService } from '@/services/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check current session on mount
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = window.supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await handleUserSession(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const session = await authService.getSession();
      if (session?.user) {
        await handleUserSession(session.user);
      }
    } catch (err) {
      console.error('Session check error:', err);
      setError('Failed to check authentication session');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSession = async (authUser: any) => {
    try {
      // Try to get existing user profile
      let userProfile = await userService.getUserProfile(authUser.id);
      
      // Create profile if doesn't exist
      if (!userProfile) {
        userProfile = await userService.createUserProfile(
          authUser.id,
          authUser.email!,
          authUser.user_metadata.full_name || authUser.email!.split('@')[0],
          authUser.user_metadata.avatar_url
        );
      }

      if (userProfile) {
        setUser(userProfile);
        setError(null);
      }
    } catch (err) {
      console.error('User session error:', err);
      setError('Failed to load user profile');
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.signInWithGoogle();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
      setError(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      setUser(prev => prev ? { ...prev, ...updates } : null);
      // Here you would call Supabase to update the user profile
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile');
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    updateUserProfile,
    clearError: () => setError(null)
  };
};
