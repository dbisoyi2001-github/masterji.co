const Card = ({
  image,
  name,
  description,
  origin,
  temperament,
  lifespan,
  wiki,
}) => {
  const temperamentArray = temperament.split(", ");

  return (
    <div className="card flex flex-col w-[500px] h-[42rem] rounded-3xl overflow-hidden mt-6">
      <div className="img h-1/2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="info h-1/2 bg-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="font-[600] text-2xl">{name}</h2>
          <p className="font-[400] text-sm leading-tight mt-2">{description}</p>
          <p className="mt-4 text-sm">
            <span className="italic font-semibold">Origin</span>
            <span className="ml-20">{origin}</span>
          </p>
          <p className="italic font-semibold text-sm">Temperament</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {temperamentArray.map((temp, index) => (
              <span
                key={index}
                className="bg-gray-100 rounded-xl px-2 py-1 text-xs cursor-pointer hover:bg-[#d482db] hover:text-white"
              >
                {temp}
              </span>
            ))}
          </div>
          <p className="mt-1 text-sm">
            <span className="italic font-semibold">Lifespan</span>
            <span className="ml-16">{lifespan} years</span>
          </p>
        </div>
        <a
          href={wiki}
          className="text-blue-500 cursor-pointer block text-sm mb-4"
        >
          learn more
        </a>
      </div>
    </div>
  );
};

export default Card;
