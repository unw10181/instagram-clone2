"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileStoriesModal from "./ProfileStoriesModal";
import { usePathname } from "next/navigation";

const StoriesGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 2fr 1fr;

  p {
    text-align: center;
  }
  gap: 5px 40px;
  padding: 10px;

  @media (max-width: 480px) {
    overflow-x: scroll;
  }
`;

interface StoryThumbnailProps {
  imageurl: string;
}

const StoryThumbnail = styled.div<StoryThumbnailProps>`
  width: 77px;
  height: 77px;
  border-radius: 50%;
  background: url(${(props) => props.imageurl}) no-repeat center center;
  background-size: 150%;

  margin: auto;
  border: 2px solid rgba(153, 150, 172, 0.593);
  padding: 5px;
`;
const PostDeleteButton = styled.button`
  position: relative;
  z-index: 5;
  top: -20%;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: 1px solid gray;
  right: -100%;

  &:hover {
    background-color: red;
    height: 28px;
    width: 28px;
  }
`;

export interface Story {
  story_id: number;
  user_id: number;
  video_url: string;
  thumbnail_url: string;
  title: string;
}

interface ProfileStoriesGridsPropsTypes {
  triggerRender: boolean;
}

export default function ProfileStoriesGrid({
  triggerRender,
}: ProfileStoriesGridsPropsTypes) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "https://jan24-jilhslxp5q-uc.a.run.app/api/stories"
        );

        if (!response.ok) {
          throw new Error("Error in retrieving stories");
        }

        const data = await response.json();
        //console.log(data.result.rows);
        setStories(data.result.rows);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchStories();
  }, [triggerRender]);

  const deleteStory = async (storyId: number) => {
    try {
      const response = await fetch(
        `https://jan24-jilhslxp5q-uc.a.run.app/api/stories/${storyId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting story!");
      }

      setStories((currentStory) =>
        currentStory.filter((story) => story?.story_id !== storyId)
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const openModal = (story: Story) => {
    setIsModalOpen(true);

    const index = stories.findIndex((s) => s.story_id === story.story_id);

    if (index !== -1) {
      setCurrentStoryIndex(index);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const pathName = usePathname();

  return (
    <>
      <StoriesGrid>
        {stories.map((story) => (
          <>
            <StoryThumbnail
              imageurl={story.thumbnail_url}
              key={story.story_id}
              onClick={() => openModal(story)}
            >
              {pathName === "/admin" && (
                <PostDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStory(story.story_id);
                  }}
                >
                  X
                </PostDeleteButton>
              )}
            </StoryThumbnail>
            <p>{story.title}</p>
          </>
        ))}
      </StoriesGrid>
      {isModalOpen && (
        <ProfileStoriesModal
          closeModal={closeModal}
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          setCurrentStoryIndex={setCurrentStoryIndex}
        />
      )}
    </>
  );
}
