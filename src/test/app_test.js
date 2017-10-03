const assert = require('assert');
const request = require('supertest');
const app = require('../app');

app.enable('trust proxy');

describe('The express app', () => {

  it('returns a static HTML page for GET requests to /', function(done) {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example usage:'));
        done();
      });
  });

  it('returns a static HTML page for GET requests to /index.html', function(done) {
    request(app)
      .get('/index.html')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example usage:'));
        done();
      });
  });

  it('returns a static CSS file for GET requests to /style.css', function(done) {
    request(app)
      .get('/style.css')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('body {'));
        done();
      });
  });

  it('returns an IP address for GET requests to /whoami from ip4 localhost', function(done) {
    request(app)
      .get('/whoami')
      .set('X-Forwarded-For', '127.0.0.1')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        done();
      });
  });

  it('returns an IP address for GET requests to /whoami from ip6 localhost', function(done) {
    request(app)
      .get('/whoami')
      .set('X-Forwarded-For', '::ffff:127.0.0.1')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        done();
      });
  });

  it('returns an IP address for GET requests to /whoami from ip6 address', function(done) {
    request(app)
      .get('/whoami')
      .set('X-Forwarded-For', 'fe80::2000:aff:fea7:f7c')
      .end((err, response) => {
        console.log(response.body);
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === 'fe80::2000:aff:fea7:f7c');
        done();
      });
  });

  it('handles a GET request to /whoami with an IE User-Agent', function(done) {
    const agent = 'Mozilla/5.0 (aWindows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko';
    request(app)
      .get('/whoami')
      .set('User-Agent', agent)
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.software === agent);
        done();
      });
  });

  it('handles a GET request to /whoami with a Firefox User-Agent', function(done) {
    const agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1';
    request(app)
      .get('/whoami')
      .set('User-Agent', agent)
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.software === agent);
        done();
      });
  });

  it('handles a GET request to /whoami with a Safari User-Agent', function(done) {
    const agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A';
    request(app)
      .get('/whoami')
      .set('User-Agent', agent)
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.software === agent);
        done();
      });
  });

  it('handles a GET request to /whoami with a Google Chrome User-Agent', function(done) {
    const agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
    request(app)
      .get('/whoami')
      .set('User-Agent', agent)
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.software === agent);
        done();
      });
  });

  it('handles a GET request to /whoami without a User-Agent', function(done) {
    request(app)
      .get('/whoami')
      .unset('User-Agent')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.software === undefined);
        done();
      });
  });

  it('handles a GET request to /whoami with an English locale Accept-Language', function(done) {
    request(app)
      .get('/whoami')
      .set('Accept-Language', 'en-US')
      .end((err, response) => {
        console.log(response.body);
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.language === 'en-US');
        done();
      });
  });

  it('handles a GET request to /whoami with an French locale Accept-Language', function(done) {
    request(app)
      .get('/whoami')
      .set('Accept-Language', 'fr-CA')
      .end((err, response) => {
        console.log(response.body);
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.language === 'fr-CA');
        done();
      });
  });

  it('handles a GET request to /whoami with a complex locale Accept-Language', function(done) {
    request(app)
      .get('/whoami')
      .set('Accept-Language', 'en-US,en;q=0.5')
      .end((err, response) => {
        console.log(response.body);
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.language === 'en-US,en;q=0.5');
        done();
      });
  });

  it('handles a GET request to /whoami without an Accept-Language', function(done) {
    request(app)
      .get('/whoami')
      .unset('Accept-Language')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.body.ipaddress === '127.0.0.1');
        assert(response.body.language === undefined);
        done();
      });
  });

});
