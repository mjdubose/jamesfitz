'use strict'

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var chaiAsPromised = require('chai-as-promised');
server = server.app
chai.use(chaiHttp);
chai.use(chaiAsPromised);
var should = chai.should();
var expect = chai.expect;


describe('Database calls', function(){
	it('should accept valid id on /profile?id= GET and return status 200',
	 			 function() { return expect(function(){ 
				chai.request(server)
				.get('/profile')
				.query({id:'slayeneq-1864'})
				.end(
					function(err, res) {
					// console.log(res)
					// return res.status
					// res.body.should.have.length(1000);
					// res.should.be.json;
				}
				)} ).should.eventually.equal(status)}
			);
	it('should accept invalid id on /profile?id= GET and return status 404',
	 			function(){ 
				chai.request(server)
				.get('/profile')
				.query({id:'slayeneq'})
				.end(function(err, res) {
					res.should.have.status(404)
				})
			});
	it('should return a charater and accepts two arguments, charId and battletag, and return status 200 GET',
		function(){
			chai.request(server)
			.get('/profile')
			.query({charId:'52519415', id: 'slayeneq-1864'})
			.end(function(err, res) {
				res.should.have.status(200)
			})
		});
	it('')
	it('should return chatacter/item and accpets two arguements, charId and slots  GET');
})