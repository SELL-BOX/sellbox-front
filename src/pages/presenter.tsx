import SockJS from 'sockjs-client'
import { CompatClient, Stomp } from '@stomp/stompjs'
import React, { useRef } from 'react'
import { HTTP_API_SERVER } from '../configs/appConfig'
import { ChatView } from '../components/ChatView'
import Link from 'next/link'
import useRoomId from '../hooks/useRoomId'

export default function Presenter() {
  const [roomId] = useRoomId()

  const pcConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  }
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const clientRef = useRef<CompatClient | null>(null)

  const presenterStop = () => {
    if (clientRef.current) {
      const client = clientRef.current
      client.publish({
        destination: `/stream/room/${roomId}`,
        body: JSON.stringify({
          id: 'stop',
        }),
      })
      client.disconnect()
    }
  }
  const presenterStart = () => {
    const peerConnection = new RTCPeerConnection(pcConfig)

    const socket = new SockJS(`${HTTP_API_SERVER}/ws`)
    const client = Stomp.over(socket)
    clientRef.current = client

    client.connect({}, async () => {
      client.subscribe(`/user/video/room/${roomId}`, (response) => {
        const res = JSON.parse(response.body)
        console.log(res)
        switch (res.id) {
          case 'presenterResponse': {
            if (res.response === 'rejected') {
              alert(res.message)
            } else if (res.response === 'accepted') {
              const sdp = res.sdpAnswer
              peerConnection.setRemoteDescription({
                type: 'answer',
                sdp: sdp,
              })
            }
            break
          }
          case 'iceCandidate': {
            peerConnection
              .addIceCandidate(res.candidate)
              .catch((err) => console.log(err))
            break
          }
          case 'stopCommunication': {
            peerConnection.close()
            client.disconnect()
          }
        }
      })

      // stream 설정
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      // candidate 전송
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          client.publish({
            destination: `/stream/room/${roomId}`,
            body: JSON.stringify({
              id: 'onIceCandidate',
              candidate: e.candidate,
            }),
          })
        }
      }

      // offer 생성 및 전송
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      peerConnection.setLocalDescription(new RTCSessionDescription(offer))
      client.publish({
        destination: `/stream/room/${roomId}`,
        body: JSON.stringify({
          id: 'presenter',
          sdpOffer: offer.sdp,
        }),
      })
    })
  }
  return (
    <>
      <Link href="/" className="font-bold">
        Home
      </Link>
      <div className="flex">
        <div>
          <video ref={localVideoRef} autoPlay={true}></video>
          <button
            className="block border-2 border-black"
            onClick={() => presenterStart()}
          >
            Presenter Start
          </button>
          <button
            className="block border-2 border-black"
            onClick={() => presenterStop()}
          >
            Stop
          </button>
        </div>
        {roomId && <ChatView roomId={roomId} />}
      </div>
    </>
  )
}
