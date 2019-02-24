const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
client.SERVER_ID='301063859702071316';
client.Attachment = Discord.Attachment;
client.events_primitive={};
client.test_mode=false;
client.lang = 1;
client.data={
dataBase_name:'test_bd.bd',
tableRoles_name:'table_roles'

};//client.data end

client.translation=true;
client.bd_name='servers_data_test.bd';
client.table_role_name='table_role';
const fs = require("fs");
client.commands={};
const config = {};
config.prefix="+++";
client.prefix=config.prefix;
client.system={};

client.global={};

client.consoleColor={
   blue:function(str){return '\x1b[44m'+str+'\x1b[0m';}
   ,red:function(str){return '\x1b[45m'+str+'\x1b[0m';}
   ,green:function(str){return '\x1b[42m'+str+'\x1b[0m';}
   ,default:function(str){return '\x1b[0m'+str+'\x1b[0m';}
};
client.console=(arr)=>{
//arr=[ [e0,e1],[e0,e1] ]
   let new_str='';
   arr.map(e=>{
         
         if(e[1]==undefined||!client.consoleColor[e[1]]){e[1]='default'};;
         new_str+=client.consoleColor[e[1]](e[0])+" ";
          });
   console.log(new_str);
};//console end


client.on("raw", (...args) => {try{
   //console.log('raw');
   let raw = require(`./raw.js`);
   raw.run(client,...args);
}catch(err){console.log(err);}; });//ready end



client.login(process.env.TOKEN);
//