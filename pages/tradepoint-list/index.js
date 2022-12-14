import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import TradepointService from "../../services/TradepointService";

const tradepointService = new TradepointService();

function Home() {
  const [tradepointList, setTradepointList] = useState([]);

  useEffect(() => {
    const getTradepoints = async () => {
      const { data } = await tradepointService.getTradepointsList();
      setTradepointList(data);
    };
    getTradepoints();
  }, []);

  return (
    <div className="p-4 grid">
      <h2 className="mb-4 text-2xl font-semibold text-emerald-800 text-center float-left">Pontos de Troca Disponíveis</h2>
      <div className="grid grid-cols-4">
        {tradepointList.length > 0 && (
          tradepointList.map(tradepoint => (
            <div className="max-w-sm p-1" key={tradepoint._id}>
              <Card>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {tradepoint.title}
                </h5>
                <p>
                  {tradepoint.address}
                </p>
                <a href="https://goo.gl/maps/Y9Vzz9NTuvg82AuVA" target="_blank" className="text-blue-500 text-right">Ir para</a>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default withAuth(Home);