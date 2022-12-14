import React, {useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";


export default function App() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    onTermSubmit("buildings")
  }, [])
  

  const onTermSubmit = async (term) => {
    try{
      const response = await youtube.get("/search", {
        params: {
          q: term,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0])
    } catch (error) {
      console.log(error);
    }
  
  };

  // const onVideoSelect = (video) => {
  //   setSelectedVideo(video);
  // };

  return (
  
      <div className="ui container">
        <SearchBar onFormSubmit={onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                // onVideoSelect={(video) => setSelectedVideo(video)}
                onVideoSelect={setSelectedVideo}
                videos={videos}
              />
            </div>
          </div>
        </div>
      </div>
    );


  }

