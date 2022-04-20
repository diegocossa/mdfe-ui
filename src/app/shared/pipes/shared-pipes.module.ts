import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { CNPJPipe } from './cnpj-pipe';
import { CPFPipe } from './cpf-pipe';
import { TelefonePipe } from './telefone-pipe';

const pipes = [
  ExcerptPipe,
  GetValueByKeyPipe,
  RelativeTimePipe,
  CNPJPipe,
  CPFPipe,
  TelefonePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes,
  providers: pipes
})
export class SharedPipesModule {
}
