import React from "react";
import io from "socket.io-client";

const Room = (props) => {
    
    const userVideo = React.useRef();
    const partnerVideo = React.useRef();
    const peerRef = React.useRef();
    const socketRef = React.useRef();
    const otherUser = React.useRef();
    const userStream = React.useRef();

    React.useEffect(() => {

        function callUser(userID) {
            peerRef.current = createPeer(userID);
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }

        function createPeer(userID) {
            const peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.stunprotocol.org"
                    },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    },
                ]
            });
            peer.onicecandidate = handleICECandidateEvent;
            peer.ontrack = handleTrackEvent;
            peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
            return peer;
        }

        function handleRecieveCall(incoming) {
            peerRef.current = createPeer();
            const desc = new RTCSessionDescription(incoming.sdp);
            peerRef.current.setRemoteDescription(desc).then(() => {
                userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
            }).then(() => {
                return peerRef.current.createAnswer();
            }).then(answer => {
                return peerRef.current.setLocalDescription(answer);
            }).then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: socketRef.current.id,
                    sdp: peerRef.current.localDescription
                }
                socketRef.current.emit("answer", payload);
            })
        }

        function handleNegotiationNeededEvent(userID) {
            peerRef.current.createOffer().then(offer => {
                return peerRef.current.setLocalDescription(offer);
            }).then(() => {
                const payload = {
                    target: userID,
                    caller: socketRef.current.id,
                    sdp: peerRef.current.localDescription
                };
                socketRef.current.emit("offer", payload);
            }).catch(e => console.log(e));
        }
    
        function handleAnswer(message) {
            const desc = new RTCSessionDescription(message.sdp);
            peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
        }
    
        function handleICECandidateEvent(e) {
            if (e.candidate) {
                const payload = {
                    target: otherUser.current,
                    candidate: e.candidate,
                }
                socketRef.current.emit("ice-candidate", payload);
            }
        }
    
        function handleNewICECandidateMsg(incoming) {
            const candidate = new RTCIceCandidate(incoming);
    
            peerRef.current.addIceCandidate(candidate)
                .catch(e => console.log(e));
        }
    
        function handleTrackEvent(e) {
            partnerVideo.current.srcObject = e.streams[0];
        };

        function socketConfiguration(){
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
                userVideo.current.srcObject = stream;
                userStream.current = stream;
    
                socketRef.current = io.connect("/");
                socketRef.current.emit("join room", props.match.params.roomID);
    
                socketRef.current.on('other user', userID => {
                    callUser(userID);
                    otherUser.current = userID;
                });
    
                socketRef.current.on("user joined", userID => {
                    otherUser.current = userID;
                });
    
                socketRef.current.on("offer", handleRecieveCall);
                socketRef.current.on("answer", handleAnswer);
                socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
            });
        }
        socketConfiguration();
    }, [props]);

    return (
        <div>
            <video autoPlay ref={userVideo} />
            <video autoPlay ref={partnerVideo} />
        </div>
    );
};

export default Room;