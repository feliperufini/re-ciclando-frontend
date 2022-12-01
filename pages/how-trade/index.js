import { Timeline } from "flowbite-react";
import { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";

function HowTrade() {
  const [userCoin, setUserCoin] = useState([]);

  useEffect(() => {
    setUserCoin(localStorage.getItem('coin'));
  }, [])

  return (
    <div className="container p-4 mx-auto grid">
      <span className="px-2 py-1 w-auto font-semibold leading-tight flex justify-self-end justify-end border border-yellow-400 text-yellow-600 bg-yellow-100 rounded-full">
        <p className="pl-1">{userCoin}</p>
        <img aria-hidden="true" className="ml-1 object-cover justify-self-center" src="images/coin.png" alt="Coin" width={24} />
      </span>
      <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">
        Para trocar os seus materiais recicláveis é muito fácil!
      </h2>
      <Timeline horizontal={true} className="mx-4">
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>
              1° Acesse o menu "<a className="text-emerald-700 hover:text-emerald-500" href="/tradepoint">Pontos de Troca</a>" e encontre o ponto mais próximo a você para levar os materiais.
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>
              2° Vá até o ponto mais próximo com seus materiais para que possamos pesá-los e calcular suas moedas.
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>
              3° Nos informe o seu e-mail para identificarmos sua conta e depositarmos o saldo de moedas.
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>
              4° As moedas serão creditadas em sua conta e você poderá adiquirir um de nossos "<a className="text-emerald-700 hover:text-emerald-500" href="/catalog">Produtos</a>".
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default withAuth(HowTrade);