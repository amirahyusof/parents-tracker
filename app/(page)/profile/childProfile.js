"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/app/firebase/config';
import Link from 'next/link';

export default function ChildProfile({ userData }) {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childImage, setChildImage] = useState(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const { addChild } = useAuth();
  const router = useRouter();

  // Debug logging
  useEffect(() => {
    console.log('User Data received:', userData);
  }, [userData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0] || null;
    setChildImage(file);
  };

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!childName.trim() || !childAge) {
      setError('Please fill out all required fields');
      return;
    }

    try {
      // Determine user ID - multiple fallback methods
      const userId = 
        userData?.uid || 
        userData?.currentUser?.uid || 
        null;

      if (!userId) {
        throw new Error('Unable to determine user ID');
      }

      let imageUrl = null;
      
      // Upload image if selected
      if (childImage) {
        const storageRef = ref(storage, `images/${userId}/${childImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, childImage);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Detailed upload error:', error);
              console.log('Error code:', error.code);
              console.log('Error message:', error.message);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  console.log("Download URL:", downloadURL)
                  resolve(downloadURL);
                }).catch(reject);
            }
          );
        });
      }

      // Add child profile
      await addChild(userId, {
        childName, 
        childAge: Number(childAge), 
        imageUrl
      });

      console.log(childName, childAge)

      router.push('/mainpage');
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed to create child profile: ' + err.message);
    }
  };

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <section>
      <div className="hero-content flex-col lg:flex-row-reserve mt-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Add Child Profile</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleAddChildProfile} className="card-body">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Name</span>
              </label>
              <input 
                type="text"
                placeholder="child name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input 
                type="number"
                placeholder="Age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
                min="0"
                max="18"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Image</span>
              </label>
              <input 
                type="file"
                onChange={handleImageUpload}
                className="file-input bg-white file-input-bordered w-full max-w-xs"
                accept="image/*"
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <progress 
                  className="progress progress-primary w-full mt-2" 
                  value={uploadProgress} 
                  max="100"
                ></progress>
              )}
            </div>

            <div className="form-control mt-6 space-y-2">
              <button 
                type="submit" 
                className="btn btn-md border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
              >
                Add Child
              </button>

              <Link href="/mainpage" className="w-full">
                <button type="button" className='btn btn-md btn-neutral w-full'>
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}