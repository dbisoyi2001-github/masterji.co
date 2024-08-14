const SkeletonCard = () => {
  return (
    <div className="flex-shrink-0 w-[500px] h-[42rem] flex flex-col rounded-3xl overflow-hidden mt-6">
      <div className="bg-gray-300 h-1/2 w-full"></div>
      <div className="bg-gray-100 h-1/2 w-full"></div>
    </div>
  );
};

export default SkeletonCard;
