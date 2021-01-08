import connectToDB  from '../db/db.client';
import {PORT} from './config/config';
import app from './app';

// connectToDB(() => {
app.listen(Number(PORT), () =>{
  // console.log(`App is running on http://localhost:${PORT}`)
},
);
// });
