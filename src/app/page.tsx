"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import VideoFeed from "./components/VideoFeed";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/api/videos")
          .then((res) => {
            setVideos(res.data.data);
            setError(null);
          })
      } catch (error: any) {
        console.error("Failed to fetch videos:", error);
        setError(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
        {!error ? (<VideoFeed videos={videos} />) : (
          <div className="text-error text-sm">Error: {error}</div>
        )}
      </main>
    </div>
  );
}
