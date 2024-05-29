"use client";
//importing libraries
import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";

//importing components
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfilePhotosGrid from "../components/PhotoGrid/ProfilePhotosGrid";
import ProfileStoriesGrid from "../components/ProfileStories/ProfileStoriesGrid";
import UploadModal from "../components/Mics Components/UploadModal";
//import icons
import CompassIcon from "../../../public/icons/compass.svg";
import FilmIcon from "../../../public/icons/film.svg";
import HeartIcon from "../../../public/icons/heart.svg";
import HouseIcon from "../../../public/icons/house.svg";
import MagnifyingGlassIcon from "../../../public/icons/magnifyingglass.svg";
import MessageIcon from "../../../public/icons/message.svg";
import AddButtonIcon from "../../../public/icons/plus.app.svg";

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const ProfileContainer = styled.div`
  /* background-color: red; */
  padding-left: 73px;
  max-width: 935px;
  margin: 30px auto;

  @media (max-width: 480px) {
    padding: 0 0;
    margin: auto auto;
  }
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

//create array of icons to pass to navbar
export interface Icon {
  path: string;
  altText: string;
  width: number;
  height: number;
  onClick?: () => void;
}
export default function Profile() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [triggerRender, setTriggerRender] = useState<boolean>(false);

  const handleTriggerRender = () => {
    setTriggerRender(!triggerRender);
  };
  const toggleModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  const iconHeight = 25;
  const iconWidth = 25;

  const navbarConfigItems: Icon[] = [
    {
      path: CompassIcon,
      altText: "Discover",
      width: iconWidth,
      height: iconHeight,
    },
    { path: FilmIcon, altText: "Reels", width: iconWidth, height: iconHeight },
    { path: HeartIcon, altText: "Like", width: iconWidth, height: iconHeight },
    { path: HouseIcon, altText: "Home", width: iconWidth, height: iconHeight },
    {
      path: MagnifyingGlassIcon,
      altText: "Search",
      width: iconWidth,
      height: iconHeight,
    },
    {
      path: MessageIcon,
      altText: "Message",
      width: iconWidth,
      height: iconHeight,
    },
    {
      path: AddButtonIcon,
      altText: "add",
      width: iconWidth,
      height: iconHeight,
      onClick: toggleModal,
    },
  ];

  return (
    <>
      <GlobalStyles />
      {/* Nav bar*/}
      <NavigationBar items={navbarConfigItems} />
      {/* profile container */}
      <ProfileContainer>
        {/* upload modal */}
        <UploadModal
          toggleUploadModal={toggleModal}
          isModalOpen={isUploadModalOpen}
          onUploadSuccess={handleTriggerRender}
        />
        {/* Header */}
        <ProfileHeader />
        {/* stories */}
        <ProfileStoriesGrid triggerRender={triggerRender} />
        {/* photogrid */}
        <ProfilePhotosGrid triggerRender={triggerRender} />
      </ProfileContainer>
    </>
  );
}
