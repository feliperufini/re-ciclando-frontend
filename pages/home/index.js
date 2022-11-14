import withAuth from "../../hoc/withAuth";

function Home() {
  return (
    <div className="container p-4 mx-auto grid ">
      <span className="px-2 py-1 w-auto font-semibold leading-tight flex justify-self-end justify-end border border-yellow-400 text-yellow-600 bg-yellow-100 rounded-full">
        <p className="pl-1">99999999</p>
        <img aria-hidden="true" className="ml-1 object-cover justify-self-center" src="images/coin.png" alt="Plant" width={24} />
      </span>
      <h2 className="text-2xl font-semibold text-center text-emerald-800">
        Começe a reciclar hoje!
      </h2>
      <img aria-hidden="true" className="object-cover justify-self-center" src="images/plant.png" alt="Plant" width={200} />
      <div className="grid justify-self-center">
        <button className="my-2 px-5 py-3 w-80 font-medium leading-5 text-white transition-colors duration-150 bg-emerald-600 border border-transparent rounded-full active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-emerald">
          TROQUE SUAS MOEDAS
        </button>
        <button className="my-2 px-5 py-3 w-80 font-medium leading-5 text-white transition-colors duration-150 bg-emerald-600 border border-transparent rounded-full active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-emerald">
          PONTOS DE COLETA PRÓXIMOS
        </button>
        <button className="my-2 px-5 py-3 w-80 font-medium leading-5 text-white transition-colors duration-150 bg-emerald-600 border border-transparent rounded-full active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-emerald">
          O QUE PODE SER RECICLADO?
        </button>
      </div>
    </div>
  );
}

export default withAuth(Home);