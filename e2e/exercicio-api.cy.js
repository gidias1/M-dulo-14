/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'


describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })

  });

  it('Deve listar usuários cadastrados', () => { 
    cy.request({
      method: 'GET',
      url: 'usuarios',
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        nome: 'Mariana Teste1' ,
        email: 'mariana.7743@gmail.com' ,
        password: 'Teste123' ,
        administrador: 'true',
      }
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false ,
      body: {
        nome: 'Giovanna invalido' ,
        email: 'giovanna.diasgmail.com' ,
        password: 'Teste123' ,
        administrador: 'true',
      }
    }).should((response) =>{
      expect(response.status).to.equal(400); 
      expect(response.body).to.have.property('email');
      expect(response.body.email).to.equal('email deve ser um email válido');
  });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT' ,
      url: 'usuarios/0ERa2OwvnW4cymAb' ,
      body:{
        nome: 'Mariana Dia' ,
        email: 'mariana.t563@gmail.com' ,
        password: 'Test548' ,
        administrador: 'false' ,
      }
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios/w0FW4A5zJgytz9eY',
    })
  });
});
