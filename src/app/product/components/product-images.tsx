"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="relative flex flex-col lg:min-h-full lg:w-3/5">
      <div className="h[380px] flex w-full items-center justify-center bg-accent lg:h-full lg:rounded-lg">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:absolute lg:left-5 lg:grid-cols-1 lg:px-0">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent lg:h-[77px] lg:w-[77px] lg:rounded-2xl lg:bg-[#0B0B0B] ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
