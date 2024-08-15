import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../components/Logo";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";

const CatsListing = () => {
  const carouselRef = useRef(null);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const url = `${baseUrl}?page=${1}&limit=${6}`;
      setLoading(true);
      try {
        const url = import.meta.env.VITE_CATS_URL;
        const response = await axios.get(url);
        setCats(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  const handleWheel = (e) => {
    e.preventDefault();
    if (carouselRef.current) {
      const scrollSpeed = 3;
      carouselRef.current.scrollLeft += e.deltaY * scrollSpeed;
    }
  };

  return (
    <div className="relative h-[100vh] w-full bg-no-repeat bg-cover bg-cats font-pop">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full px-8 ">
        <header className="flex justify-between items-baseline pt-6">
          <h1 className="font-semibold text-[3rem] text-white">
            Cats around us
          </h1>
          <div className="logo">
            <Logo width={60} height={60} />
          </div>
        </header>
        <section
          ref={carouselRef}
          className="carousel flex items-center overflow-x-auto gap-4 scroll-smooth cursor-pointer"
          onWheel={handleWheel}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : cats.data.map((cat) => (
                <div className="card flex-shrink-0" key={cat.id}>
                  <Card
                    image={cat.image}
                    name={cat.name}
                    description={cat.description}
                    origin={cat.origin}
                    temperament={cat.temperament}
                    lifespan={cat.life_span}
                    wiki={cat.wikipedia_url}
                  />
                </div>
              ))}
        </section>
      </div>
    </div>
  );
};

export default CatsListing;
