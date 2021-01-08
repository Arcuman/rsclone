import connectToDB  from '../db/db.client';
import config from './config/dbConfig';
import app from './app';

connectToDB(() => {
  app.listen(config.port, () =>{
    // console.log(`App is running on http://localhost:${PORT}`)
  },
  );
});
