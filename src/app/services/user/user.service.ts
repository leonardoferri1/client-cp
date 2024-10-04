import { Injectable, signal, type WritableSignal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: WritableSignal<{ nome: string }> = signal({
    nome: '',
  })

  constructor() {
    const storage = localStorage.getItem('@siafic:user')
    if (storage) {
      this.user.set(JSON.parse(storage))
    }
  }

  saveUser(payload: { data: User }) {
    const data = payload?.data
    this.user.update(() => ({ nome: data.nome }))

    localStorage.setItem('@siafic:user', JSON.stringify(data))
  }
}

export interface User {
  usuario_id: number
  pessoa_id: number
  login: string
  dominio_ad: string
  dominio_id_situacaousuario: number
  modulo_id_padrao: number
  modulo_id_ultimo: null
  autentica_local: boolean
  nome: string
  dominio_id_tipopessoa: string
  cpf_cnpj: string
  rg: string
  email: string
  documento: string
  data_nascimento: null
  celular: string
  telefone: null
  matricula: null
  end_logradouro: null
  end_numero: null
  end_complemento: null
  end_bairro: null
  end_cidade_id: null
  end_cep: null
  observacao: string
  extrangeiro: string
  ativo: string
  status: string
  ferramenta: null
  pessoa: Pessoa
  modulopadrao: Modulopadrao
}

interface Modulopadrao {
  data: Data
}

interface Data {
  modulo_id: number
  nome: string
  nome_detalhado: string
  codigo: string
  recurso: string
  imagem: string
  ativo: string
  solicitacao_acesso: string
}

interface Pessoa {
  pessoa_id: number
  nome: string
  dominio_id_tipopessoa: string
  cpf_cnpj: string
  email: string
  documento: string
  data_nascimento: null
  celular: string
  telefone: null
  matricula: null
  end_logradouro: null
  end_numero: null
  end_complemento: null
  end_bairro: null
  end_cidade_id: null
  end_cep: null
  observacao: string
  extrangeiro: string
  ativo: string
  pref_nome: string
  cnpj: string
  cargo: string
  rg: string
  tel_comercial: string
  cidade_trab: string
  sec: string
  setor: string
  email_resp: string
  email_conf: string
  status: string
  tipo_solicitante: null
  ferramenta: null
  aprovado_usuario_id: null
  aprovado_data: null
  doc_solicitacao: string
}
