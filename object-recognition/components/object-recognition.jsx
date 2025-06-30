'use client'

import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { load as cocossdload } from '@tensorflow-models/coco-ssd'
import * as tf from "@tensorflow/tfjs"
import { renderPredictions } from './utils/render-predictions'
let detectInterval;
const ObjectRecognition = () => {
    const [isLoading, setIsLoading] = useState(true)
    const webCamRef = useRef(null)
    const canvasRef = useRef(null)

    const runCoco = async () => {
        setIsLoading(true)
        const net = await cocossdload()
        setIsLoading(false)

        detectInterval = setInterval(() => {
            runObjectDetection(net)
        }, 10)
    }

    async function runObjectDetection(net) {
        if (canvasRef.current && webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
            canvasRef.current.width = webCamRef.current.video.videoWidth;
            canvasRef.current.height = webCamRef.current.video.videoHeight;

            const detectedObjects = await net.detect(webCamRef.current.video, undefined, 0.6);

            // console.log(detectedObjects)
            const context = canvasRef.current.getContext("2d")
            renderPredictions(detectedObjects,context)
        }
    }
    const showMyVideo = () => {
        if (webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
            const myVideoHeight = webCamRef.current.video.videoHeight
            const myVideoWidth = webCamRef.current.video.videoWidth

            webCamRef.current.video.width = myVideoWidth
            webCamRef.current.video.height = myVideoHeight
        }
    }

    useEffect(() => {
        runCoco()
        showMyVideo()
    }, [])
    return (
        <div className='mt-8'>
            {isLoading ? (
                <div> Loading AI Model</div>
            ) :
                <diV className='relative flex justify-center items-center p-1.5 rounded-md'>
                    <Webcam ref={webCamRef} className='lg:h-[720px] rounded-md w-full' muted />
                    <canvas ref={canvasRef} className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]'></canvas>
                </diV>


            }
        </div>
    )
}

export default ObjectRecognition
