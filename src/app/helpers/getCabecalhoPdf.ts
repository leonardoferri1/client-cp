import { getBase64ImageFromURL } from "./getBase64FromImage";

export async function getCabecalhoPdf(
	title: string,
	coordenadoria = "Coordenadoria de Controle de Contrato e Convenios",
) {
	const header = [
		{
			alignment: "left",
			columnGap: 12,
			columns: [
				{
					image: await getBase64ImageFromURL(
						"../../../../../assets/img/logo-ms-novo.png",
					),
					width: 128,
					height: 64,
					alignment: "left",

					columnGap: 0,
				},
				[
					{
						text: "ESTADO DE MATO GROSSO DO SUL",
						style: "Header",
						width: "*",
						alignment: "left",
						margin: [0, 0, 0, 0],
					},
					{
						text: "SECRETARIA DE ESTADO DE FAZENDA",
						style: "Header",
						alignment: "left",
						margin: [0, 0, 0, 0],
					},
					{
						text: "SUPERINTENDÊNCIA DO TESOURO",
						style: "Header",
						alignment: "left",
						margin: [0, 0, 0, 0],
					},
					{
						text: "COORDENADORIA DE ENCARGOS ESPECIAIS E CONTROLE DE CONTRATOS E CONVÊNIOS",
						style: "Header",
						alignment: "left",
						margin: [0, 0, 0, 0],
					},
					{
						text: "UNIDADE DE GESTÃO DE DÍVIDAS DE OPERAÇÃO DE CRÉDITO",
						style: "Header",
						alignment: "left",
						margin: [0, 0, 0, 0],
					},
				],
			],
		},
		{
			text: title,
			style: "Header",
			bold: true,
			fontSize: 16,
			alignment: "center",
			margin: [0, 14, 0, 30],
		},
	];

	return header;
}
