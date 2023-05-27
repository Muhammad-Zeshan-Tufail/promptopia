import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => {
        return (
          <PromptCard key={index} item={item} handleTagClick={handleTagClick} />
        );
      })}
    </div>
  );
};

export default PromptCardList;
