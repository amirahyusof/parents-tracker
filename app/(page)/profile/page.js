"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/app/firebase/config';

export default function ChildProfile({userData}){
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childImage, setChildImage] = useState(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { addChild } = useAuth();
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setChildImage(file);
  };

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (childImage) {
        const storageRef = ref(storage, `images/${userData.uid}/${childImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, childImage);

        // Return a promise that resolves with the download URL
        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Error during image upload:', error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => resolve(downloadURL))
                .catch(reject);
            }
          );
        });
      }

      // Add child with optional image URL
      await addChild(userData.uid, {
        childName, 
        childAge, 
        imageUrl
      });

      router.push('/mainpage');
    } catch (err) {
      setError('Failed to create child profile');
      console.error(err);
    }
  };

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
                type="name"
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
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Image</span>
              </label>
              <input 
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full max-w-xs"
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

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
              >
                Add Child
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
