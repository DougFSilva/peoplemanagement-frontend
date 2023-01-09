import { Pipe, PipeTransform } from '@angular/core';
import { Endereco } from 'src/app/models/Endereco';

@Pipe({
  name: 'filtrarEnderecoPrincipal'
})
export class FiltrarEnderecoPrincipalPipe implements PipeTransform {
  endereco:Endereco = {
    id: 0,
    logradouro: '',
    cep: '',
    numero: '',
    cidade: '',
    principal: false
  }
  transform(value: Endereco[], ...args: any[]): string {
    if(value != null && value!= undefined && value.length != 0){
      let endereco = value.find(endereco => endereco.principal);
      if(endereco == undefined) {
        endereco = value[0]
      }
      return endereco.logradouro + " nº: " + endereco.numero + ", " + endereco.cidade + " - CEP " + endereco.cep
    }else {
      return "Nenhum endereço cadastrado"
    }
  }

}
