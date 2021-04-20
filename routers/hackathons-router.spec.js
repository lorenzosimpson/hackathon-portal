const request = require('supertest');
const server = require('../Api/server');
const db = require('../database/db');

describe('/hackathons endpoints', () => {
   beforeAll(async () => {
      await db('hackathons').truncate();
      await db('user_hackathons').truncate();
   });

   let token =
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qZEROREUxUmtWR01rUXdRa0l4UWtWR05EWkVNalU0TlRKR1FUVTVNemc1TmpORVF6QkZPQSJ9.eyJpc3MiOiJodHRwczovL2hhY2thdGhvbnBvcnRhbC5hdXRoMC5jb20vIiwic3ViIjoiSzJQSmg3M3E0MXlGcnlBNkVKZHI3Q3lxM25WcXYxdm9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaGFja2F0aG9uLXBvcnRhbC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTU3OTcxNTAwNiwiZXhwIjoxNTc5ODAxNDA2LCJhenAiOiJLMlBKaDczcTQxeUZyeUE2RUpkcjdDeXEzblZxdjF2byIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.RyPO94uArwQ6qi8gZUEil5qSb8w1FS13RO_H_sCE3pDHUl1LtCHQgG8FszhIhWUUMaYUxCsqrRyUrG2aC0ox6Mf0OKafCdSlG01qVDdohWAD2liDGb0RJORLzD0GM7jUFafmnlS151j1d_90Xs0bjReQ0VwmYcgmKd7C4PDA6qDBEs5EV2PIJvw23GqJ74GvJWnUPIHjBuKi2SgvRFQ811QhcTF3ypXZgtsl7w9sz-UEFjNeL3KcfQ4cziZN7ERolxTX0rAya6qVXkVfeJlVmpjm-VehHbVlis_O_Gwx-XgVR5sS5lAGFlmRkzOxVtFUqSZlGUIzCl9Cyy8D0Bp0lw';
   it('Should return 200 success for list of hackathons', async () => {
      await request(server)
         .get('/api/hackathons/')
         .set('Authorization', token)
         .expect(200);
   });
   it('Should return 201 success for creating hackathon', async () => {
      await request(server)
         .post('/api/hackathons/u/2')
         .set('Authorization', token)
         .send({
            name: 'Testing Hackathon',
            description: "It's a great hackin' time",
            url: 'https://www.testing-hackathon.com',
            location: 'Remote, CO',
            start_date:
               'Sun Mar 1 2020 14:37:00 GMT-0500 (Eastern Standard Time)',
            end_date:
               'Sat Mar 7 2020 14:37:00 GMT-0500 (Eastern Standard Time)',
            max_team_participants: 15,
            is_open: 1
         })
         .expect(201);
   });
   it('Should return 201 success for joining a hackathon', async () => {
      await request(server)
         .post('/api/hackathons/2/join/1')
         .set('Authorization', token)
         .send({
            user_hackathon_role: 'organizer'
         })
         .expect(201);
   });
   it('Should return 200 success for specific hackathon', async () => {
      await request(server)
         .get('/api/hackathons/1')
         .set('Authorization', token)
         .expect(200);
   });
   it('Should return a 200 success for updating hackathon', async () => {
      await request(server)
         .put('/api/hackathons/2/u/1')
         .set('Authorization', token)
         .send({
            name: 'Updated Hackathon',
            description: "It's a great hackin' time",
            url: 'https://www.updated-hackathon.com',
            start_date:
               'Sun Mar 1 2020 14:37:00 GMT-0500 (Eastern Standard Time)',
            end_date:
               'Sat Mar 7 2020 14:37:00 GMT-0500 (Eastern Standard Time)',
            max_team_participants: 20,
            is_open: 1
         });
   });
   it('Should return a 200 success for deleting a hackathon', async () => {
      await request(server)
         .delete('/api/hackathons/1/u/2')
         .set('Authorization', token)
         .expect(200);
   });
});
