import { NgModule } from '@angular/core';

import { MdfeRoutingModule } from './mdfe-routing.module';
import { CadastroMdfeComponent } from './cadastro-mdfe/cadastro-mdfe.component';
import { SharedModule } from '../../shared/shared.module';
import { FormWizardModule } from '../../shared/components/form-wizard/form-wizard.module';
import { OperacaoMdfeComponent } from './cadastro-mdfe/montagem-mdfe/operacao-mdfe/operacao-mdfe.component';
import { DocumentosMdfeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/documentos-mdfe/documentos-mdfe.component';
import { ModalDocumentoComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/documentos-mdfe/modal-documento/modal-documento.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalFormularioUnidadeTransporteComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/unidade-transporte/modal-formulario-unidade-transporte/modal-formulario-unidade-transporte.component';
import { ModalFormularioUnidadeCargaComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/unidade-carga/modal-formulario-unidade-carga/modal-formulario-unidade-carga.component';
import { TagInputModule } from 'ngx-chips';
import { ListMunicipioDescargaMdfeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/municipio-descarga/list-municipio-descarga-mdfe.component';
import { ModalMunicipioDescargaMdfeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/municipio-descarga/modal-municipio-descarga-mdfe/modal-municipio-descarga-mdfe.component';
import { AdicionalMdfeComponent } from './cadastro-mdfe/montagem-mdfe/adicional-mdfe/adicional-mdfe.component';
import { AutorizadosXmlComponent } from './cadastro-mdfe/montagem-mdfe/adicional-mdfe/autorizados-xml/autorizados-xml.component';
import { ModalAutorizadosXmlComponent } from './cadastro-mdfe/montagem-mdfe/adicional-mdfe/autorizados-xml/modal-autorizados-xml/modal-autorizados-xml.component';
import { CiotComponent } from './cadastro-mdfe/montagem-mdfe/operacao-mdfe/ciot/ciot.component';
import { ModalCiotComponent } from './cadastro-mdfe/montagem-mdfe/operacao-mdfe/ciot/modal-ciot/modal-ciot.component';
import { ValePedagioComponent } from './cadastro-mdfe/montagem-mdfe/operacao-mdfe/vale-pedagio/vale-pedagio.component';
import { ModalValePedagioComponent } from './cadastro-mdfe/montagem-mdfe/operacao-mdfe/vale-pedagio/modal-vale-pedagio/modal-vale-pedagio.component';
import { InformacoesContratanteComponent } from './cadastro-mdfe/montagem-mdfe/adicional-mdfe/informacoes-contratante/informacoes-contratante.component';
import { ModalInformacoesContratanteComponent } from './cadastro-mdfe/montagem-mdfe/adicional-mdfe/informacoes-contratante/modal-informacoes-contratante/modal-informacoes-contratante.component';
import { ListSeguradoraMdfeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/list-seguradora-mdfe/list-seguradora-mdfe.component';
import { ModalSeguradoraComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/list-seguradora-mdfe/modal-seguradora/modal-seguradora.component';
import { InserirMotoristaComponent } from './eventos/inserir-motorista/inserir-motorista.component';
import { CancelarManifestoComponent } from './eventos/cancelar-manifesto/cancelar-manifesto.component';
import { EncerrarManifestoComponent } from './eventos/encerrar-manifesto/encerrar-manifesto.component';
import { PericulosidadeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/periculosidade/periculosidade.component';
import { ModalPericulosidadeComponent } from './cadastro-mdfe/montagem-mdfe/documentos-mdfe/listas-documentos/periculosidade/modal-periculosidade/modal-periculosidade.component';
import { ModalRejeicaoComponent } from './utils/modal-rejeicao/modal-rejeicao.component';
import { ModalConsultaNaoEncerradosComponent } from './utils/modal-consulta-nao-encerrados/modal-consulta-nao-encerrados.component';

@NgModule({
  imports: [
    SharedModule,

    FormWizardModule,
    CurrencyMaskModule,
    TagInputModule,

    MdfeRoutingModule
  ],
  declarations: [
    CadastroMdfeComponent,
    OperacaoMdfeComponent,
    DocumentosMdfeComponent,
    ModalDocumentoComponent,
    ModalFormularioUnidadeTransporteComponent,
    ModalFormularioUnidadeCargaComponent,
    ListMunicipioDescargaMdfeComponent,
    ModalMunicipioDescargaMdfeComponent,
    AdicionalMdfeComponent,
    AutorizadosXmlComponent,
    ModalAutorizadosXmlComponent,
    CiotComponent,
    ModalCiotComponent,
    ValePedagioComponent,
    ModalValePedagioComponent,
    InformacoesContratanteComponent,
    ModalInformacoesContratanteComponent,
    ListSeguradoraMdfeComponent,
    ModalSeguradoraComponent,
    InserirMotoristaComponent,
    CancelarManifestoComponent,
    EncerrarManifestoComponent,
    PericulosidadeComponent,
    ModalPericulosidadeComponent,
    ModalRejeicaoComponent,
    ModalConsultaNaoEncerradosComponent
  ],
  entryComponents: [
    ModalDocumentoComponent,
    ModalFormularioUnidadeTransporteComponent,
    ModalFormularioUnidadeCargaComponent,
    ModalMunicipioDescargaMdfeComponent,
    ModalAutorizadosXmlComponent,
    ModalCiotComponent,
    ModalValePedagioComponent,
    ModalInformacoesContratanteComponent,
    ModalSeguradoraComponent,
    ModalPericulosidadeComponent,

    CancelarManifestoComponent,
    EncerrarManifestoComponent,
    InserirMotoristaComponent,

    ModalRejeicaoComponent,
    ModalConsultaNaoEncerradosComponent
  ],
  exports: [
    CancelarManifestoComponent,
    EncerrarManifestoComponent,
    InserirMotoristaComponent,

    ModalRejeicaoComponent,
    ModalConsultaNaoEncerradosComponent
  ]
})
export class MdfeModule {
}
