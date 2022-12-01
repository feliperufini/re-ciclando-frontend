import { Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
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
    <div className="flex flex-col p-4 gap-4">
      <div className="mb-2 block">
        <Label htmlFor="username3" color="green" value="Your name" />
      </div>
      <TextInput id="username" placeholder="Bonnie Green" required={true} color="green" />
      <div className="mb-2 block">
        <Label htmlFor="username4" color="red" value="Your name" />
      </div>
      <TextInput id="username4" placeholder="Bonnie Green" required={true} color="red" />
      {tradepointList.length > 0 && (
        tradepointList.map(tradepoint => (
          <p>{tradepoint.title}</p>
        ))
      )}
    </div>
  );
}

export default withAuth(Home);