const URLWebService = 'http://localhost:8080/';
export const environment = {
  production: false,

  /* O token só poderá ser enviado para a rota listada na WhiteList.. */
  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],

  /* Rotas que não vão enviar o token listadas na BlackList.. */
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ],

  /* Rotas do nosso WebService.. */
  WebService: {
    URLAuth: {
      Login: URLWebService + 'oauth/token',
      Logout: URLWebService + 'tokens/revoke'
    },
    URLCertificados: URLWebService + 'certificado',
    URLEmpresas: URLWebService + 'empresas',
    URLVeiculos: URLWebService + 'veiculos',
    URLSeguradoras: URLWebService + 'seguradoras',
    URLMotoristas: URLWebService + 'motoristas',
    URLCiots: URLWebService + 'ciots',
    URLGrupos: URLWebService + 'grupos',
    URLMDFes: URLWebService + 'mdfes',
    URLDocumentos: URLWebService + 'documentos',
    URLEventos: URLWebService + 'eventos',
    URLTotalizadores: URLWebService + 'totalizadores',
    URLPermissoes: URLWebService + 'permissoes',
    URLAuxiliarNFe: URLWebService + 'xmls/inf',
    URLConsultaNFe: URLWebService + 'eventos/nfe',
    URLUsuario:  URLWebService + 'usuario',
    URLEstados:  URLWebService + 'ibge/estados',
    URLMunicipios:  URLWebService + 'ibge/municipios'
  },

  WebServicePainelAdministrativo: {
    URLMigracao: URLWebService + 'clientes/novo'
  }
};
