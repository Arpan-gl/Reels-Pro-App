"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import Provider from "./Provider";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface fileUploadProps {
    onSuccess : (res:IKUploadResponse) => void,
    onProgress? : (progress : number) => void,
    fileType? : "image" | "video"
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}:fileUploadProps) {
    const [uploading,setUploading] = useState(false);
    const [error,setError] = useState<string | null >(null);

  const onError = (err: {message:string}) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };
  
  const handleStartUpload = () => {
      setUploading(true);
        setError(null);
    };
  
  const handleProgress = (evt:ProgressEvent) => {
    if(evt.lengthComputable && onProgress){
        onProgress(Math.round(evt.loaded / evt.total * 100));
    }
  };

  const validateFil = (file:File) => {
    if(fileType === "video"){
        if(!file.type.startsWith("video/")){
            setError("Please upload a video file");
            return false;
        }
        if(file.size > 20*1024*1024){
            setError("Video size should be less than 20MB");
            return false;
        }
    }
    else{
        const validTypes = ["image/jpeg","image.png","image.webp"];
        if(!validTypes.includes(file.type)){
            setError("Please upload a valid image file (JPEG, PNG, or WebP)");
            return false;
        }
        if(file.size > 5*1024*1024){
            setError("Video size should be less than 5MB");
            return false;
        }
    }
    return true;
  }
  
  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>
      <Provider>
        <div className="space-y-2">
            <IKUpload
            className="file-input file-input-bordered w-full"
            accept={fileType === "video" ? "video/*" : "image/*" }
            fileName={fileType === "video"? "video":"image"}
            useUniqueFileName={true}
            validateFile={validateFil}
            onError={onError}
            onSuccess={handleSuccess}
            onUploadProgress={handleProgress}
            onUploadStart={handleStartUpload}
            folder={fileType === "video" ? "/videos" : "/images"} 
            />
            {
                uploading && (
                    <div className="flex justify-center items-center h-10 gap-2 text-primary">
                        <Loader2 className="animate-spin w-4 h-4" />
                        Uploading...
                    </div>
                )
            }
            {
                error && (
                    <div className="text-error text-sm">{error}</div>
                )
            }
        </div>
      </Provider>
    </div>
  );
}