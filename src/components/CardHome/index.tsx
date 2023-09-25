"use client"

import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import YouTube from 'react-youtube';

export default function CardHome() {
	const [video1, setVideo1] = useState('')
	const [video2, setVideo2] = useState('')
	const videoOneRef = useRef(null);
	const videoTowRef = useRef(null);


	const handleSplitUrl = (url: string) => {
		return url.split("v=")[1].split("&")[0];
	}

	const handleLoadingVideo = () => {
		if(videoOneRef.current.value && videoTowRef.current.value){
			setVideo1(handleSplitUrl(videoOneRef.current.value));
			setVideo2(handleSplitUrl(videoTowRef.current.value));
		}else{
			toast.error('Por favor, preencha os dois campos');
		}
	}

	return(
		<>
			<section>
				<div className="flex w-full border-gray-600 border">
					<div className="bg-gray-800 w-1/2">
						{video1 && (
							<YouTube
							videoId={video1}
							opts={{
								playerVars: {
									autoplay: 1
								}
							}}
						/>)}
					</div>
					<div className="bg-gray-900 w-1/2">
						{video2 && (
							<YouTube
							videoId={video2}
						/>)}
					</div>
				</div>
				<div className="p-5 bg-gray-500 flex flex-col items-center">
					<div className="flex w-full">
						<div className="w-1/2">
							<input ref={videoOneRef} type="text" placeholder="youtube url" />
						</div>
						<div className="w-1/2">
							<input ref={videoTowRef} type="text" placeholder="youtube url" />
						</div>
					</div>
					<button onClick={handleLoadingVideo} type="button">Enviar</button>
				</div>
			</section>
			<Toaster/>
		</>
	)
}