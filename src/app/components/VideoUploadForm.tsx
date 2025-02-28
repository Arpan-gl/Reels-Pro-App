"use client";

import { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import FileUpload from "./FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const route = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDetails, setVideoDetails] = useState<VideoFormData>({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: ""
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setVideoDetails({ ...videoDetails, videoUrl: response.filePath });
    setVideoDetails({ ...videoDetails, thumbnailUrl: response.thumbnailUrl || response.filePath });
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/videos", videoDetails)
        .then((res) => {
          setLoading(false);
          setUploadProgress(0);
          route.push("/");
        })
    } catch (error) {

    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="form-control">
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={videoDetails.title}
          onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="form-control">
        <label htmlFor="description" className="block mb-1">
          Discription
        </label>
        <input
          type="text"
          id="description"
          value={videoDetails.description}
          onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="form-control">
        <label className="label">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
      <div className="form-control">
        <label className="label">Upload Thumbnail Image</label>
        <FileUpload
          fileType="image"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}