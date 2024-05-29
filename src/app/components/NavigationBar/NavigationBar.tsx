"use client";

import { Icon } from "../../profile/page";
import Image from "next/image";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Navigation = styled.aside`
  display: grid;
  grid-template-rows: repeat(6, min-content);
  width: fit-content;
  position: fixed;
  height: 100%;
  place-content: center;
  grid-gap: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0px 10px;
  background-color: black;

  button {
    background-color: transparent;
    border: none;
    width: 48px;
    height: 48px;
    transition: all 0.2s ease;
    &:hover {
      background-color: #222222;
      border-radius: 9px;
      transform: scale(1.1);
    }
  }

  //tablet
  @media (max-width: 768px) {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: repeat(7, min-content);
    grid-template-rows: 1fr;
    height: fit-content;
    bottom: 0px;
    width: 100%;
    padding: 10px 0px;
    z-index: 10;
  }

  //mobile phone
  @media (max-width: 480px) {
    height: 73px;
    bottom: 0px;
  }
`;

interface NavigationBarProps {
  items: Icon[];
}

//recieve array of icons
export default function NavigationBar({ items }: NavigationBarProps) {
  // items.map((icon) => {
  //     console.log(icon.altText);
  // })
  const pathName = usePathname();
  return (
    <>
      {/* {loop} */}
      {/* {button} */}
      {/* {image} */}
      <Navigation>
        {items.map((icon, index) => {
          const isAddButton = icon.altText === "add";

          if (pathName != "/admin" && isAddButton) {
            return null;
          }
          return (
            <button
              key={index}
              onClick={icon.onClick ? icon.onClick : () => {}}
            >
              <Image
                src={icon.path}
                width={icon.width}
                height={icon.height}
                alt={icon.altText}
              />
            </button>
          );
        })}
      </Navigation>
    </>
  );
}
