"use client"

import React from 'react';
import { useAuth } from "@/app/firebase/hook";
import ChildProfile from './childProfile';

export default function ProfilePage() {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect or show an error
  if (!currentUser) {
    return <div>Please log in to create a child profile</div>;
  }

  // Pass the entire user object or combine current user and user data
  const combinedUserData = {
    ...currentUser,
    ...userData,
    uid: currentUser.uid
  };

  return <ChildProfile userData={combinedUserData} />;
}