const express = require('express');

let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;

  const app = express();
  const router = express.Router();

  router.post('/sendToAll', (req, res) => {
      var notification = {
          'title': 'title',
          'text': 'text'
      };

      var fcm_token = [];

      var notification_body = {
          'notification': notification,
          'registration_ids': fcm_token
      };

      fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
              'Authorization': 'key=AAAAx9GZ8HM:APA91bGgyuWqGE1skaurZTkbdBHNPYTz0sEmyZ2ktwxuQyk9evWbyXLnDovfnUmiEUEmiCj33SC8MlHi-l7ggY1HtJ1D_6HP1EGRpyOl-NrDlOJ4GxpTrlbDlnTLGuejt-duKYw32pge',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(notification_body)
      })
      .then(() => {
          res.status(200).send('SUCCESS');
      })
      .catch((err) => {
          res.status(400).send('SOMETHING WENT WRONG');
          console.log(err);
      });
  });

  // Using the router
  app.use('/api/notification', router);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log('Server started'));
})();