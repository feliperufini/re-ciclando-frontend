import MyPhoto from "../Photo";

export default function ResultSearch({ name, description, coast, photo, onClick, id }) {
  return (
    <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={() => onClick(id)}>
      <MyPhoto src={photo} />
      <div className="mx-2">
        <strong className="inline-block">{name}</strong>
        <span className="flex">{description}</span>
      </div>
      <div className="m-auto mr-2">
        <span className="inline-flex ml-2">
          {coast}
          <img aria-hidden="true" className="ml-1 object-cover justify-self-center" src="images/coin.png" alt="Plant" width={24} />
        </span>
      </div>
    </div>
  );
}