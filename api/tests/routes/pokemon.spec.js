/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Tipo, conn } = require('../../src/db.js');

const agent = session(app);
describe("Pokemon routes", () => {
  before(() =>
  conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err)
    })
  )

  describe('/pokemons', function() {
    it('GET responde con un status 200', function(){
      return agent
        .get('/pokemons')
        .expect(function(res){
          expect(res.status).equal(200)})
    }).timeout(8000);
  })
  describe('/pokemons?name=', function() {
    it('GET responde con status 200 si encuentra un pokemon', function() {
      return agent 
        .get('/pokemons?name=pikachu') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        }).timeout(8000);
  })
  describe('/pokemons/:id', function() {
    it('GET responde con status 200 si encuentra un pokemon por id',  function() {
      return agent 
        .get('/pokemons/1') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        }).timeout(8000);
  })
});