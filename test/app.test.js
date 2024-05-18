// test/app.test.js
import request from 'supertest';
import app from '../app.js'; // Assuming your Express app instance is exported from app.js

describe('POST /schedule-email', function() {
    it('should schedule an email successfully', function(done) {
        request(app)
            .post('/schedule-email')
            .send({
                to: 'sonkerswapnildev@gmail.com',
                subject: 'Scheduled Email Test',
                body: 'Hello, this is a scheduled email!'
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
