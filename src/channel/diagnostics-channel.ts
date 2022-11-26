import diagnostics_channel from 'diagnostics_channel';
import axios from 'axios';

diagnostics_channel.channel('http.client.request.start').subscribe(message => {
  console.log(message);
});

axios.get('https://httpbin.org/get', { headers: { Accept: 'application/json' } });
