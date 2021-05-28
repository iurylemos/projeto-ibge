import React, { useState } from 'react';
import { BsSearch, BsFillInboxesFill, BsFillDropletFill, BsGeoAlt, BsBookmarkCheck } from "react-icons/bs";
import './dashboard.css';

interface Props {

}

const Dashboard: React.FC<Props> = () => {
    const [step, setStep] = useState<number>(0);

    return (
        <section className="design-process-section" id="process-tab">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        {/* <!-- design process steps-->  */}
                        {/* <!-- Nav tabs --> */}
                        <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                            <li role="presentation" className={step === 0 ? "active" : ""} onClick={() => setStep(0)}>
                                <a href="#discover" aria-controls="discover" role="tab" data-toggle="tab">
                                    <BsSearch />
                                    <p>Como é feita a vacina?</p>
                                </a>
                            </li>
                            <li role="presentation" className={step === 1 ? "active" : ""} onClick={() => setStep(1)}>
                                <a href="#strategy" aria-controls="strategy" role="tab" data-toggle="tab">
                                    <BsFillInboxesFill />
                                    <p>Como são embaladas?</p>
                                </a>
                            </li>
                            <li role="presentation" className={step === 2 ? "active" : ""} onClick={() => setStep(2)}>
                                <a href="#optimization" aria-controls="optimization" role="tab" data-toggle="tab">
                                    <BsFillDropletFill />
                                    <p>Como são armazenadas?</p>
                                </a>
                            </li>
                            <li role="presentation" className={step === 3 ? "active" : ""} onClick={() => setStep(3)}>
                                <a href="#content" aria-controls="content" role="tab" data-toggle="tab">
                                    <BsGeoAlt />
                                    <p>Como são transportadas?</p>
                                </a>
                            </li>
                            <li role="presentation" className={step === 4 ? "active" : ""} onClick={() => setStep(4)}>
                                <a href="#reporting" aria-controls="reporting" role="tab" data-toggle="tab">
                                    <BsBookmarkCheck />
                                    <p>Controle de Qualidade</p>
                                </a>
                            </li>
                        </ul>
                        {/* <!-- end design process steps-->  */}
                        {/* <!-- Tab panes --> */}

                        <div className="tab-content">
                            {
                                step === 0 ? (
                                    <div role="tabpanel" className={step === 0 ? "tab-pane active" : "tab-pane"} id="discover">
                                        <div className="design-process-content">
                                            <h3 className="semi-bold">Como é feita</h3>
                                            <p>
                                                Normalmente, as empresas trabalham independentemente para completar os seus planos de desenvolvimento clínico de uma vacina. Uma vez autorizada a vacina, o fabrico começa a aumentar. O antigénio (parte do germe a que o nosso sistema imunitário reage) é enfraquecido ou inativado. Para formar a vacina completamente, são combinados todos os ingredientes.

                                                O processo completo, desde os ensaios pré-clínicos até ao fabrico, podem, por vezes, levar até uma década a completar. Na busca de uma vacina para a COVID-19, os investigadores e os desenvolvedores trabalham em várias fases diferentes em paralelo, para acelerar os resultados. Foi a escala dos compromissos financeiros e políticos para com o desenvolvimento de uma vacina que permitiu que se tivesse realizado este desenvolvimento acelerado. Além disso, as nações e as organizações internacionais de saúde estão a trabalhar em conjunto através do COVAX para investirem na capacidade antecipada de desenvolvimento para simplificar o processo, assim como para garantir uma distribuição equitativa das vacinas.
                                        </p>
                                        </div>
                                    </div>
                                ) : step === 1 ? (
                                    <div role="tabpanel" className={step === 1 ? "tab-pane active" : "tab-pane"} id="strategy">
                                        <div className="design-process-content">
                                            <h3 className="semi-bold">Como são embaladas?</h3>
                                            <p>
                                                Uma vez a vacina fabricada em grandes quantidades, é introduzida em frascos de vidro e depois cuidadosamente embalada para armazenamento seguro em frio e transporte.

                                                A embalagem das vacinas deve ser capaz de suportar temperaturas extremas, assim como os riscos envolvidos no seu transporte para todo o mundo. Por conseguinte, os frascos da vacina são geralmente feitos de vidro, por este ser duradouro e capaz de manter a sua integridade em temperaturas extremas.
                                        </p>
                                        </div>
                                    </div>
                                ) : step === 2 ? (
                                    <div role="tabpanel" className={step === 2 ? "tab-pane active" : "tab-pane"} id="optimization">
                                        <div className="design-process-content">
                                            <h3 className="semi-bold">Como são armazenadas</h3>
                                            <p>
                                                Quando uma vacina está demasiado quente ou demasiado fria, torna-se menos eficaz ou mesmo inativa. Se forem armazenadas em temperaturas incorretas, as vacinas podem deteriorar-se ou tornar-se inseguras para uso. A maioria das vacinas exige armazenamento refrigerado entre 2 e 8 °C. Algumas vacinas exigem temperaturas muito baixas, por exemplo, -20°C. Algumas das vacinas mais recentes precisam de ser armazenadas em ambientes ultrafrios, a -70°C.  Relativamente às vacinas congeladas, algumas delas podem ser armazenadas com segurança durante um período limitado de tempo entre 2 e 8°C.

                                                Os frigoríficos normais não podem  manter uma temperatura igual consistentemente e, por isso, são necessários frigoríficos médicos para esses preciosos produtos.
                                        </p>
                                        </div>
                                    </div>
                                ) : step === 3 ? (
                                    <div role="tabpanel" className={step === 3 ? "tab-pane active" : "tab-pane"} id="content">
                                        <div className="design-process-content">
                                            <h3 className="semi-bold">Como são transportadas</h3>
                                            <p>
                                                Para manter esta cadeia de frio, as vacinas são transportadas usando equipamento especial que não compromete a integridade do produto. Quando o transporte chega ao país de destino, há camiões refrigerados que transportam as vacinas desde o aeroporto até às câmaras de frio dos armazéns. A partir daí, são usadas caixas refrigeradoras para transportar as vacinas das câmaras de frio para os centros regionais, onde são armazenados em frigoríficos. Se a vacinação se realizar fora da unidade regional, o passo final requer, muitas vezes, caixas frigoríficas portáteis para transportar o produto para os locais onde se vão realizar as campanhas de vacinação.  As novas tecnologias conceberam alguns dispositivos portáteis que podem conservar as vacinas à temperatura de frio necessária durante vários dias, sem necessidade de eletricidade.
                                        </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div role="tabpanel" className={step === 4 ? "tab-pane active" : "tab-pane"} id="reporting">
                                        <div className="design-process-content">
                                            <h3>Controle de qualidade</h3>
                                            <p>
                                                Quando as vacinas começam a ser administradas, as autoridades nacionais e a OMS monitorizam constantemente– e determinam a gravidade de – eventuais efeitos adversos e a reação das pessoas que receberam a vacina. A segurança da vacina é de primordial importância, com avaliações regulares e estudos clínicos pós-aprovação para comprovar a sua segurança e eficácia.

                                                São feitos estudos frequentes para determinar quanto tempo dura a proteção de uma terminada vacina
                                        </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;