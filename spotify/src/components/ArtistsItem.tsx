import { Link } from "react-router-dom";

interface ArtistsItemProps {
  id: number;
  name: string;
  description: string;
  bio: string;
  photo: string;
}

const ArtistItem: React.FC<ArtistsItemProps> = ({
  id,
  name,
  description,
  bio,
  photo,
}) => {
  return (
    <>
      <Link to={`/artists/${id}`}>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="mb-2 font-bold text-2xl">{name}</h1>
            <img
              src={photo}
              alt={` artiste ${name}`}
              className="h-[200px] shadow-md shadow-black"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>{description}</p>
            <p className="italic text-gray-400">{bio}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArtistItem;
