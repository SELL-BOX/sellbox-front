import SockJS from 'sockjs-client'
import { CompatClient, Stomp } from '@stomp/stompjs'
import React, { useRef } from 'react'
import { HTTP_API_SERVER } from '../configs/appConfig'
import { ChatView } from '../components/ChatView'

export default function Viewer() {
  const pcConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  }
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const clientRef = useRef<CompatClient | null>(null)

  const viewerStop = () => {
    if (clientRef.current) {
      const client = clientRef.current
      client.publish({
        destination: '/stream',
        body: JSON.stringify({
          id: 'stop',
        }),
      })
      client.disconnect()
    }
  }
  const viewerStart = () => {
    const peerConnection = new RTCPeerConnection(pcConfig)

    const socket = new SockJS(`${HTTP_API_SERVER}/ws`)
    const client = Stomp.over(socket)
    clientRef.current = client

    client.connect({}, async () => {
      client.subscribe('/user/video/room', (response) => {
        const res = JSON.parse(response.body)
        console.log(res)
        switch (res.id) {
          case 'viewerResponse': {
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
      // candidate 전송
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          client.publish({
            destination: '/stream',
            body: JSON.stringify({
              id: 'onIceCandidate',
              candidate: e.candidate,
            }),
          })
        }
      }

      // 비디오 설정
      peerConnection.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0]
        }
      }

      // offer 생성 및 전송
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      peerConnection.setLocalDescription(new RTCSessionDescription(offer))
      client.publish({
        destination: '/stream',
        body: JSON.stringify({
          id: 'viewer',
          sdpOffer: offer.sdp,
        }),
      })
    })
  }
  return (
    <>
      <h1 className="font-bold">Home</h1>
      <div className="flex">
        <div>
          <video ref={remoteVideoRef} autoPlay={true}></video>
          <button
            className="block border-2 border-black"
            onClick={() => viewerStart()}
          >
            Viewer Start
          </button>
          <button
            className="block border-2 border-black"
            onClick={() => viewerStop()}
          >
            Stop
          </button>
        </div>
        <ChatView />
      </div>
    </>
  )
}
