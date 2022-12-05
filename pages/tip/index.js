import { Carousel } from "flowbite-react";
import withAuth from "../../hoc/withAuth";

function HowTrade() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-4/5 m-auto mt-8">
      <Carousel slide={false} indicators={false}>
        <div className="h-full pt-4 items-center justify-center bg-emerald-200">
          <div className="w-1/2 m-auto">
            <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Aproveite o lixo orgânico</h2>
            <p>Alguns restos de alimentos, como cascas de frutas, legumes e ovos que não são consumidos podem adquirir novas funções, como a utilização para novas receitas ou transformá-lo em adubo para os canteiros de plantas.</p>
            <p>Entretanto, é ideal que a sua produção seja reduzida. Para isso, é necessário programar bem as compras no supermercado, guardar os alimentos de maneira correta e evitar o consumo em exagero para que não fiquem sobras durante a refeição.</p>
          </div>
        </div>
        <div className="h-full pt-4 items-center justify-center bg-emerald-200">
          <div className="w-1/2 m-auto">
            <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Separe o lixo de acordo com os materiais</h2>
            <p>Diferente do lixo orgânico, esses materiais não possuem origem animal ou vegetal. Ao iniciar o descarte, separe-os de acordo com os seus materiais:</p>
            <p><span className="text-blue-600 font-semibold">AZUL</span> – Papel e papelão;</p>
            <p><span className="text-red-600 font-semibold">VERMELHO</span> – Plástico;</p>
            <p><span className="text-green-500 font-semibold">VERDE</span> – Vidro;</p>
            <p><span className="text-yellow-300 font-semibold">AMARELO</span> – Metal;</p>
            <p><span className="text-yellow-800 font-semibold">MARROM</span> – Lixo orgânico;</p>
            <p><span className="text-gray-600 font-semibold">CINZA</span> – Lixo não reciclável, contaminado ou cuja separação não é possível;</p>
          </div>
        </div>
        <div className="h-full pt-4 items-center justify-center bg-emerald-200">
          <div className="w-1/2 m-auto">
            <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Descarte de eletrônicos somente em pontos específicos</h2>
            <p>Por se tratar de um material muito utilizado por todos e ter a sua decomposição tóxica, os equipamentos eletrônicos devem ser descartados em pontos de coleta específicos. Escolas, lojas de equipamentos e outros locais que possuam um ponto de coleta específico. Para saber mais, acesse o site da prefeitura de sua cidade.</p>
          </div>
        </div>
        <div className="h-full pt-4 items-center justify-center bg-emerald-200">
          <div className="w-1/2 m-auto">
            <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Higienize as embalagens antes de reciclá-las</h2>
            <p>Pode ser que leve muito tempo para a embalagem chegar até o centro de reciclagem. Portanto, todos os materiais antes de serem descartados, devem ser higienizados para evitar possíveis contaminações ou proliferação de fungos e bactérias.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default withAuth(HowTrade);