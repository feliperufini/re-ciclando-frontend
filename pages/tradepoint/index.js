import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import TradepointService from "../../services/TradepointService";

const tradepointService = new TradepointService();

function Home() {
  const [tradepointList, setTradepointList] = useState([]);

  useEffect(async () => {
    const tradepoints = await getTradepointList();
    setTradepointList(tradepoints);
  }, []);

  return (
    <div className="p-4 grid grid-cols-4">
      {tradepointList.length > 0 && (
        tradepointList.map(tradepoint => (
          <div className="max-w-sm p-1" key={tradepoint._id}>
            <Card>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {tradepoint.title}
              </h5>
              <p>
                {tradepoint.description}
              </p>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

export default withAuth(Home);