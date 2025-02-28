import VideoUploadForm from '../components/VideoUploadForm';

const UploadFilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  )
}

export default UploadFilePage;