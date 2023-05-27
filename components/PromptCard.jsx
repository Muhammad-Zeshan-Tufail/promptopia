import Image from "next/image";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCard = ({ item, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = (text) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleNavigation = (item) => {
    if (item.creator._id === session?.user.id) {
      return router.push("/profile");
    }
    return router.push(
      `/profile/${item.creator._id}?name=${item.creator.username}`
    );
  };

  return (
    <div className="sm:p-4 p-2 bg-gray-50 border-gray-200 border my-2 rounded-sm shadow h-full">
      <div className="flex justify-between md:gap-4 gap-2 w-full">
        <div
          className="flex flex-1 gap-2 items-center cursor-pointer"
          onClick={() => handleNavigation(item)}
        >
          <Image
            src={item?.creator?.image}
            alt="user image"
            width={45}
            height={45}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold text-gray-700 break-words capitalize">
              {item.creator.username}
            </h3>
            <p className="text-sm font-semibold text-gray-600">
              {item.creator.email}
            </p>
          </div>
        </div>
        <div
          className="p-2 h-8 w-8 bg-gray-300 rounded-full hover:bg-gray-400 cursor-pointer flex justify-center items-center"
          onClick={() => handleCopy(item.prompt)}
        >
          {copied === item.prompt ? <BsCheck2Square /> : <MdContentCopy />}
        </div>
      </div>
      <p className="my-4 text-gray-600 text-sm font-medium max-w-xs">
        {item.prompt}
      </p>
      <p
        className="text-sm bg-gradient-to-r from-blue-500  to-blue-300 text-transparent bg-clip-text font-semibold cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(item.tag)}
      >
        #{item.tag}
      </p>
      {session?.user.id === item.creator._id && pathName === "/profile" && (
        <div className="flex justify-center items-center gap-2">
          <p
            className="cursor-pointer bg-yellow-200 p-1.5 rounded"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="cursor-pointer bg-orange-300 p-1.5 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
