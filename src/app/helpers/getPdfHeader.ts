import { getBase64ImageFromURL } from './getBase64FromImage';

export async function getPdfHeader(
  title: string,
  coordenadoria = 'SUPERINTENDÊNCIA DO TESOURO'
) {
  const header = [
    {
      columns: [
        {
          image: await getBase64ImageFromURL(
            '../../../../../assets/img/logo-ms.jpg'
          ),
          width: 75,
          height: 75,
          alignment: 'left',
          margin: [0, 10, 0, 14],
        },
        [
          {
            text: 'SECRETARIA DE ESTADO DE FAZENDA',
            style: 'Header',
            color: '#017DB9',
            fontSize: 9,
            margin: [0, 15, 0, 0],
          },
          {
            text: 'ESTADO MATO GROSSO DO SUL',
            style: 'Header',
            fontSize: 9,
            color: '#017DB9',
            margin: [0, 4, 0, 0],
          },
          {
            text: coordenadoria,
            style: 'Header',
            fontSize: 9,
            color: '#017DB9',
            margin: [0, 4, 0, 0],
          },
          {
            text: 'COORDENADORIA DE ENCARGOS ESPECIAIS E CONTROLE DE CONTRATOS E CONVÊNIOS',
            style: 'Header',
            fontSize: 9,
            color: '#017DB9',
            margin: [0, 4, 0, 0],
          },
          {
            text: 'UNIDADE DE GESTÃO DE DÍVIDAS DE OPERAÇÃO DE CRÉDITO',
            style: 'Header',
            fontSize: 9,
            color: '#017DB9',
            margin: [0, 4, 0, 0],
          },
        ],
      ],

      columnGap: 10,
    },
    {
      text: 'Relatório Consórcio',
      style: 'Header',
      bold: true,
      fontSize: 19,
      alignment: 'center',
      margin: [0, 14, 0, 38],
    },
    {
      text: title,
      style: 'Header',
      alignment: 'start',
      fontSize: 14,
      color: '#343a40',
      bold: true,
      margin: [0, 15],
      background: '#f8f9fa',
    },
  ];

  return header;
}
