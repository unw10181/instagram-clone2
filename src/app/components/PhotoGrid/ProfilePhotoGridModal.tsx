import styled from "styled-components";
import Image from "next/image";
import { PostObject } from "./ProfilePhotosGrid";

const ModalBackDrop = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 12;
`;
const ModalContent = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 60% 40%;
  max-width: 935px;
  max-height: 600px;
  overflow: hidden;
  .image-container {
    background: black;
    position: relative;
    width: 100%;
    padding-top: 100%;
  }

  .comments-container {
    background-color: white;

    p {
      color: black;
    }

    padding: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 100%;
  }
`;

interface ProfilePhotoGridPropsType {
  closeModal: () => void;
  selectedPost: PostObject | null;
}

export default function ProfilePhotosGridModal({
  closeModal,
  selectedPost,
}: ProfilePhotoGridPropsType) {
  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="image-container">
          <Image
            src={selectedPost ? selectedPost.media_url : ""}
            alt="Modal Image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="comments-container">
          <p>
            {" "}
            Now you try: display photo caption here and clone the comment
            section
          </p>
        </div>
      </ModalContent>
    </ModalBackDrop>
  );
}
