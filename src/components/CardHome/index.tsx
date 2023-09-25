"use client";

import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function CardHome() {
  const [video1, setVideo1] = useState("");
  const [video2, setVideo2] = useState("");
  const [video1Start, setVideo1Start] = useState(0);
  const [video2Start, setVideo2Start] = useState(0);
  const [playersVideo, setPlayersVideo] = useState<{
    playerVideoOne: YouTubeEvent | null;
    playerVideoTow: YouTubeEvent | null;
  }>({
    playerVideoOne: null,
    playerVideoTow: null,
  });
  const videoOneRef = useRef<HTMLInputElement>(null);
  const videoTowRef = useRef<HTMLInputElement>(null);
  const videoTimeStartOneRef = useRef<HTMLInputElement>(null);
  const videoTimeStartTowRef = useRef<HTMLInputElement>(null);

  const handleSplitUrl = (url: string) => {
    return url.split("v=")[1].split("&")[0];
  };

  const handleConvertTimeToSeconds = (time: string) => {
    return Number(time.split(":").reduce((acc, time) => String(60 * Number(acc) + Number(time))));
  };

  const handleLoadingVideo = () => {
    if (
      videoOneRef.current &&
      videoOneRef.current.value &&
      videoTowRef.current &&
      videoTowRef.current.value &&
      videoTimeStartOneRef.current &&
      videoTimeStartTowRef.current
    ) {
      setVideo1(handleSplitUrl(videoOneRef.current.value));
      setVideo2(handleSplitUrl(videoTowRef.current.value));
      setVideo1Start(handleConvertTimeToSeconds(videoTimeStartOneRef.current.value ? videoTimeStartOneRef.current.value : "1"));
      console.log(videoTimeStartOneRef.current.value ? videoTimeStartOneRef.current.value : "0");
      setVideo2Start(handleConvertTimeToSeconds(videoTimeStartTowRef.current.value ? videoTimeStartTowRef.current.value : "1"));
    } else {
      toast.error("Por favor, preencha os dois campos");
    }
  };

  const handlePauseVideo = () => {
    if (playersVideo.playerVideoOne && playersVideo.playerVideoTow) {
      playersVideo.playerVideoOne.target.pauseVideo();
      playersVideo.playerVideoTow.target.pauseVideo();
    }
  };

  const handlePlayVideo = () => {
    if (playersVideo.playerVideoOne && playersVideo.playerVideoTow) {
      playersVideo.playerVideoOne.target.playVideo();
      playersVideo.playerVideoTow.target.playVideo();
    }
  };

  return (
    <>
      <section>
        <div className="flex w-full border border-gray-900 divide-gray-900 divide-x divide-solid">
          <div className="w-1/2 aspect-video">
            {video1 && (
              <YouTube
                iframeClassName="aspect-video"
                videoId={video1}
                onReady={(event) => {
                  playersVideo.playerVideoOne = event;
                }}
                opts={{
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                    start: video1Start,
                  },
                }}
              />
            )}
          </div>
          <div className="w-1/2 aspect-video">
            {video2 && (
              <YouTube
                iframeClassName="aspect-video"
                videoId={video2}
                onReady={(event) => {
                  setPlayersVideo((old) => ({ ...old, playerVideoTow: event}));
                }}
                onPlay={(event) => {
                  setPlayersVideo((old) => ({ ...old, playerVideoTow: event}));
                }}
                onPause={(event) => {
                  setPlayersVideo((old) => ({ ...old, playerVideoTow: event}));
                }}
                opts={{
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                    start: video2Start,
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className="p-5 bg-gray-900 flex flex-col gap-5 items-center">
          <div className="w-full flex justify-center gap-5">
            <button
              className="bg-violet-500 text-white active:bg-violet-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handlePlayVideo}
            >
              Play
            </button>
            <button
              onClick={handlePauseVideo}
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Pausar
            </button>
          </div>
          <div className="flex w-full gap-5">
            <div className="w-1/2 flex gap-5">
              <input
                className="py-2 px-4 rounded-lg w-9/12"
                ref={videoOneRef}
                type="text"
                placeholder="Ex: https://www.youtube.com/watch?v=ZiP1l7jlIIA"
              />
              <input
                className="py-2 px-4 rounded-lg w-3/12"
                ref={videoTimeStartOneRef}
                type="time"
                step={2}
                placeholder="Ex: https://www.youtube.com/watch?v=ZiP1l7jlIIA"
              />
            </div>
            <div className="w-1/2 flex gap-5">
              <input
                className="py-2 px-4 rounded-lg w-9/12"
                ref={videoTowRef}
                type="text"
                placeholder="Ex: https://www.youtube.com/watch?v=ZiP1l7jlIIA"
              />
              <input
                className="py-2 px-4 rounded-lg w-3/12"
                ref={videoTimeStartTowRef}
                type="time"
                step={2}
                placeholder="Ex: https://www.youtube.com/watch?v=ZiP1l7jlIIA"
              />
            </div>
          </div>
          <div>
            <button
              className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleLoadingVideo}
            >
              Eviar
            </button>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
