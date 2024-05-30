"use client";
import styled from "styled-components";
import { Story } from "./ProfileStoriesGrid";
import { useState, useRef, useEffect } from "react";
import mutedIcon from "../../../../public/icons/unmute.png";
import unmutedIcon from "../../../../public/icons/mute.png";
import Image from "next/image";

const StoriesBackdrop = styled.div`
  position: fixed;
  background-color: black;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 20;
  gap: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 30;
`;

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  //max-width: 300px;

  @media (max-width: 480px) {
    height: 35%;
    width: 100%;
  }
`;

const NavigationThumbnail = styled.img`
  height: 35%;
  width: 70%;
  border-radius: 10px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  max-width: 150px;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  top: 50px;
  height: 3px;
  width: 90%;
  margin: auto;
  background-color: rgb(128, 128, 128);
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const CurrentVideoContainer = styled.div`
  height: 70%;
  width: 50%;
`;

const MuteButton = styled.button`
  position: absolute;
  top: 70px;
  right: 40px;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  z-index: 1;
  opacity: calc(0.7);

  @media (max-width: 480px) {
    right: 50px;
    top: 10px;
    font-size: 12px;
  }
`;

interface ProfileStoriesModalPropTypes {
  closeModal: () => void;
  stories: Story[];
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
}
export default function ProfileStoriesModal({
  closeModal,
  stories,
  currentStoryIndex,
  setCurrentStoryIndex,
}: ProfileStoriesModalPropTypes) {
  const [muted, setMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const hasNext: boolean = currentStoryIndex < stories.length - 1;
  const hasPrevious: boolean = currentStoryIndex > 0;

  const handleProgress = (e: any) => {
    if (isNaN(e.target.duration)) {
      return;
    }
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };

  const goToPreviousStory = () => {
    if (hasPrevious) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const goToNextStory = () => {
    if (hasNext) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    handlePlayVideo();
  }, [currentStoryIndex]);

  return (
    <StoriesBackdrop>
      <CloseButton onClick={closeModal}>X</CloseButton>

      {hasPrevious && (
        <NavigationThumbnail
          src={stories[currentStoryIndex - 1].thumbnail_url}
          onClick={goToPreviousStory}
        />
      )}

      {!hasPrevious && <div></div>}
      <CurrentVideoContainer>
        <ProgressBarContainer>
          <ProgressBar />
        </ProgressBarContainer>

        <div style={{ position: "relative" }}>
          <MuteButton onClick={toggleMute}>
            <Image
              src={muted ? unmutedIcon : mutedIcon}
              alt={muted ? "Unmute button" : "Mute button"}
              width="30"
              height="25"
            />
          </MuteButton>
        </div>
        <StyledVideo
          onTimeUpdate={handleProgress}
          src={stories[currentStoryIndex].video_url}
          autoPlay
          muted={muted}
          ref={videoRef}
        />
      </CurrentVideoContainer>

      {hasNext && (
        <NavigationThumbnail
          src={stories[currentStoryIndex + 1].thumbnail_url}
          onClick={goToNextStory}
        />
      )}
    </StoriesBackdrop>
  );
}
