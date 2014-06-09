var DATABASE_URL = "postgres://lqhwwuagklpoin:AQ_wXUpcw3s6eJXQDdW__CWOj8@ec2-54-197-237-120.compute-1.amazonaws.com:5432/d51f19hl0iptdt";
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL 
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE User (name email username provider facebook)');
query.on('end', function() { client.end(); });