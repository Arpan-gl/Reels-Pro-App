"use client";
import { IVideo } from '@/models/Video.models';
import React from 'react'
import VideoComponent from './VideoComponent';

interface IVideoFeedProps {
    videos: IVideo[]
}

const VideoFeed = ({ videos }: IVideoFeedProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.length === 0 && (
                <div className="col-span-full text-center py-12">
                    <p className="text-base-content/70">No videos found</p>
                </div>
            )}

            {videos.map((video) => (
                <VideoComponent key={video._id?.toString()} video={video} />
            ))}

        </div>
    )
}

export default VideoFeed;