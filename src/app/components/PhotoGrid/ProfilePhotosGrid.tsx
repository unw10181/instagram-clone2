"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePhotosGridModal from "./ProfilePhotoGridModal";
import Image from "next/image";

import { usePathname } from "next/navigation";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;

  @media (max-width: 480px) {
    padding-bottom: 100px;
  }
`;
const PhotoItem = styled.div`
  position: relative;
  padding-bottom: 100%;
`;

const PostDeleteButton = styled.button`
  position: absolute;
  z-index: 5;
  top: 5px;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: 1px solid gray;

  &:hover {
    background-color: red;
  }
`;

export interface PostObject {
  post_id: number;
  user_id: number;
  media_url: string;
  caption: string;
}
interface profilePhotoGridsPropsTypes {
  triggerRender: boolean;
}

export default function ProfilePhotosGrid({
  triggerRender,
}: profilePhotoGridsPropsTypes) {
  const [posts, setPosts] = useState<PostObject[]>();
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostObject | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: Response = await fetch(
          "https://jan24-jilhslxp5q-uc.a.run.app/api/posts"
        );
        if (!response.ok) {
          throw new Error("JSON not recieved");
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [triggerRender]);

  const deletePost = async (postId: number) => {
    try {
      const reponse: Response = await fetch(
        `https://jan24-jilhslxp5q-uc.a.run.app/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!reponse.ok) {
        throw new Error("Error deleting posts");
      }

      setPosts((currentPost) =>
        currentPost?.filter((post) => post.post_id !== postId)
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const openModal = (post: PostObject) => {
    setIsModalOpen(true);
    setSelectedPost(post);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const pathName = usePathname();

  return (
    <>
      <GridContainer>
        {/* {photo item div} */}
        {posts?.map((postObject: PostObject) => (
          <PhotoItem
            key={postObject.post_id}
            onClick={() => openModal(postObject)}
          >
            {pathName === "/admin" && (
              <PostDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(postObject.post_id);
                }}
              >
                X
              </PostDeleteButton>
            )}

            <Image
              src={postObject.media_url}
              alt="Post Photo"
              fill
              objectFit="cover"
            />
          </PhotoItem>
        ))}
        {/* image */}
      </GridContainer>
      {isModalOpen && (
        <ProfilePhotosGridModal
          closeModal={closeModal}
          selectedPost={selectedPost}
        />
      )}
    </>
  );
}
