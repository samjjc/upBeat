process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

let server = require('../server.js');
let Playlist = require('../app/models/playlist.js')

let should = chai.should();
chai.use(chaiHttp);

// =============================================================

describe('Playlists', () => {
  
  Playlist.collection.drop();

  beforeEach((done)=>{
    let newPlaylist = new Playlist({
      name: 'Chai',
    });
    newPlaylist.save((err)=> {
      done();
    });
  });
  afterEach((done)=>{
    Playlist.collection.drop();
    done();
  });

  it('should list ALL playlists on /api/playlist GET', done=>{
    chai.request(server)
      .get('/api/playlist')
      .end((err, res)=>{
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Chai');
        done();
      });
  });

  it('should list a SINGLE playlist on /playlist/<id> GET', done=>{
      var newList = new Playlist({
        name: 'Mocha',
      });
      newList.save((err, data) => {
        chai.request(server)
          .get('/api/playlist/'+data.id)
          .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.name.should.equal('Mocha');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });



  it('should add a SINGLE playlist on /api/playlist POST', done=>{
    chai.request(server)
      .post('/api/playlist')
      .send({'name': 'Chai',})
      .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('SUCCESS');
          res.body.SUCCESS.should.be.a('object');
          res.body.SUCCESS.should.have.property('name');
          res.body.SUCCESS.should.have.property('_id');
          res.body.SUCCESS.name.should.equal('Chai');
          done();
      });
  });

  it('should update a SINGLE playlist on /playlist/<id> PUT', done=>{
      chai.request(server)
        .get('/playlist')
    );
  it('should delete a SINGLE playlist on /playlist/<id> DELETE');
});
