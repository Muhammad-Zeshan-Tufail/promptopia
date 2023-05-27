import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleDelete, handleEdit }) => {
  return (
    <div>
      <h1 className="text-[48px] bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text font-bold mt-5 text-center capitalize">
        {name} Profile
      </h1>
      <p className="md:w-1/2 w-full mx-auto text-center">{desc}</p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => {
          return (
            <PromptCard
              key={index}
              item={item}
              handleEdit={() => handleEdit && handleEdit(item)}
              handleDelete={() => handleDelete && handleDelete(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
