import withAuth from "../../hoc/withAuth";

function HowTrade() {
  return (
    <div className="container p-4 mx-auto w-2/4 text-xl">
      <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">
        Sobre o Sistema!
      </h2>
      <p className="mb-2">
        ㅤO sistema foi desenvolvido por mim, <span className="font-semibold">Felipe Andrade</span> com o objetivo de se tornar um trabalho de conclusão de curso (TCC) para ser apresentado ao colegiado do IFRO Campus Ji-Paraná.
      </p>
      <p className="mb-2">
        ㅤA ideia era produzir um sistema no qual as pessoas cadastradas pudessem levar o seu material reciclável a um dos pontos de troca para ganhar coins e trocar essas moedas pelos itens ou produtos disponíveis, como vocês podem ver.
      </p>
      <p className="mb-2">
        ㅤMuito tempo foi investido na produção desta solução, feita com muito carinho, com a utilização de diversas linguagens e frameworks para que seus usuários pudessem desfrutar da melhor experiência possível.
      </p>
      <p>
        ㅤO objetivo inicial é ampliar a consciência, o conhecimento e difundir informações para os cidadãos de Ji-Paraná/RO (cidade onde moro) sobre:
      </p>
      <ul className="mb-2">
        <li>» Incentivar a reciclagem;</li>
        <li>» Dicas para reutilização de materiais;</li>
        <li>» Funcionamento do processo de reciclagem;</li>
        <li>» Separação dos resíduos nos domicílios.</li>
      </ul>
      <p className="mb-2">
        ㅤEspero que eu consiga alcançar com este projeto uma grande quantidade de pessoas e mudar a forma de vida de cada uma para que possamos cuidar de nosso planeta.
      </p>
    </div>
  );
}

export default withAuth(HowTrade);