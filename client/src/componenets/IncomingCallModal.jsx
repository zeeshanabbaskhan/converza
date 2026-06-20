import React from 'react';
import { userauthstore } from '../Store/UserAuthStore';
import { useNavigate } from 'react-router-dom';
import '../styles/incomingCallModal.css';
import Loader from './Loader';

const IncomingCallModal = () => {
  const navigate = useNavigate();
  const incomingCall = userauthstore((state) => state.incomingCall);
  const answerCall = userauthstore((state) => state.answerCall);
  const rejectCall = userauthstore((state) => state.rejectCall);
  const callStatus = userauthstore((state) => state.callStatus);

  if (!incomingCall) {
    return null;
  }

  const callerId = incomingCall.callerId || incomingCall.from;
  const canAnswer = Boolean(incomingCall.signal);

  const handleAnswer = () => {
    if (!canAnswer) {
      return;
    }

    answerCall(incomingCall.signal, callerId, navigate);
  };

  const handleReject = () => {
    if (!callerId) {
      return;
    }

    rejectCall(callerId);
  };

  return (
    <div className="incoming-call-modal">
      <div className="incoming-call-content">
        <div className="ringing-dots">
          <div className="ringing-dot"></div>
          <div className="ringing-dot"></div>
          <div className="ringing-dot"></div>
        </div>
        <img
          src={incomingCall.profileImg || '/avatar.jpg'}
          alt="profile"
          className="caller-avatar"
        />
        <h2 className="call-title">{incomingCall.name || 'Someone'} is calling...</h2>
        <p className="call-subtitle">
          {canAnswer ? 'Incoming video call' : 'Connecting call...'}
        </p>
        <div className="call-buttons">
          <button
            onClick={handleAnswer}
            className="answer-button"
            disabled={!canAnswer || callStatus === 'connected'}
          >
            {!canAnswer
              ? 'Connecting...'
              : callStatus === 'connected'
                ? <Loader className="small" />
                : 'Answer'}
          </button>
          <button
            onClick={handleReject}
            className="reject-button"
            disabled={callStatus === 'connected'}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
