const userDb = require('../models/users-model');
const userHackathonDb = require('../models/user_hackathons-model');
const router = require('express').Router();

router.get('/', async (req, res) => {
   try {
      const users = await userDb.find();
      res.status(200).json(users);
   } catch (err) {
      res.status(500).json(err);
   }
});

router.get('/:id', async (req, res) => {
   const user_id  = req.params.id;
   try {
      const user = await userDb.findById(user_id);
      const user_hackathons = await userHackathonDb.findHackathonByUserId(user_id);
      async function mapProjects(arr, cb) {
         for (let x=0; x<arr.length; x++) {
            arr[x].project = await cb(arr[x].hackathon_id, user_id)
            console.log(arr[x])
         }
         return arr
      }
      user.hackathons = await mapProjects(user_hackathons, userHackathonDb.findUserProjectsByHackathon)
      //user.hackathons = user_hackathons;
      res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});

router.put('/:auth0Sub', async (req, res) => {
   const { auth0Sub } = req.params;
   const changes = req.body;
   try {
      const user = await userDb.findById(auth0Sub)
      changes.auth0Sub = auth0Sub
      if (user) {
         const updated = await userDb.updateUser(auth0Sub, changes);
         delete updated.password
         res.status(200).json(updated);
      } else {
         const added = await userDb.addUser(auth0Sub, changes);
         res.status(201).json(added);
      }
   } catch (err) {
      res.status(500).json(err);
      console.log(err)
   }
});



router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const deleted = await userDb.deleteUser(id);
      res.status(200).json({
         message: `Deleted user with id ${id} successfully`
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;
