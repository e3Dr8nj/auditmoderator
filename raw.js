//raw v1.1
exports.delay=(duration)=>{ return new Promise((resolve)=>{return setTimeout(resolve,duration)}); };

exports.commands={};

exports.run = async(client,event)=>{try{

  if(event.t){
    // console.log(event.t);
  };
  if(client.events_primitive[event.t]){
     client.events_primitive[event.t].map(f=>f.run(client,event));
   };// 

  if(event.t=='READY'){ 
      await module.exports.delay(1000);
      await module.exports.onGuildCreate(client);return;
  };

  if(event.t =='MESSAGE_CREATE'){
      return module.exports.onMessage(client,event.d);
   };

  return;
}catch(err){console.log(err);};};//exports.run end

//____________________________________ON_GUILD_CREATE__________EVENT

 module.exports.onGuildCreate=async(client)=>{try{

    await exports.delay(1000);
    console.log('onGuildCreate');
    await module.exports.setBoot(client,'module');
    await module.exports.setCommand(client,'module');
    await  module.exports.setEvent(client,'module'); 
    await  module.exports.setEvent_primitive(client,'module'); 
}catch(err){console.log(err)};};//
//____________________________________________________________

//______________________________________________ON_MESSAGE___EVENT

exports.onMessage=async(client,event_d)=>{try{

   if(event_d.author.id==client.user.id){return;};
   if(event_d.type=='dm'){console.log('dm');return;};//???
   let message = await client.channels.get(event_d.channel_id).fetchMessage(event_d.id).then(collected=>{return collected;});
   let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
   let cmd_name = args[0];

  if(module.exports.commands[cmd_name]){
      console.log(cmd_name+" command triggered ");
      if(message.author==client.user) return;
      module.exports.commands[cmd_name].exe(client,message,args);
      return;
  };

}catch(err){console.log(err);};};//onMessage end
//_________________________________________________________________________


//_____________________________BOOT___
//_________________SET_BOOT
module.exports.setBoot=async(client,path)=>{try{
   await exports.delay(1000);
   let fs = require('fs');
   fs.readdir("./"+path+"s/", (err, files) => {try{
  //    if (err) return console.error(err);

    files.forEach(file => {try{
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];

            if(!!target_module.active){ 
               if(!!target_module.boots){
                  for(let key in target_module.boots){ 
                      if(target_module.boots[key].on){
                            console.log('BOOT EXE .../'+path+'s/'+moduleName+'/'+key);
                            target_module.boots[key].run(client);
                     };//if boot is on end
                  };//for end
              };//if boots is active
            };//if target_module is active

      }catch(err){console.log(err);};});//forEachfile end
    
}catch(err){  console.log(err);};
});//boot end
//--------------------
  return;
}catch(err){console.log(err)};};//setModuleBoot end
//________________________________________________
//________________________________COMMAND_________
//_________________SET_COMMANDS
module.exports.setCommand=async(client,path)=>{try{
   await exports.delay(1000);
   let fs = require('fs');

  fs.readdir("./"+path+"s/", (err, files) => {try{
   //if (err) return console.error(err);
    files.forEach(file => {try{ 
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
            if(!!target_module.active){    
            
                  if(!!target_module.commands){
                      for(let key in target_module.commands){
                             let commandName = key; 
                             if(!!target_module.commands[key].on){
                                 if(!!target_module.commands[key].aliase){commandName=target_module.commands[key].aliase.slice();};
                                 module.exports.commands[commandName]={};
                                 module.exports.commands[commandName].exe=target_module.commands[key].run ;   
                                 console.log('COMMAND SET.../'+path+'s/'+moduleName+'/'+commandName);
                              };//if on is true;
                      };//for end
                  };//if end

             };//module is active
           }catch(err){console.log(err);};});//forEach end

}catch(err){console.log(err);};
});//event trigger
//--------------------
}catch(err){console.log(err)};};//setCommand end
//_____________________________________EVENT
//_____________________SET_EVENTS
module.exports.setEvent=async(client,path)=>{try{
   await exports.delay(1000);
   let fs = require('fs');

   fs.readdir("./"+path+"s/", (err, files) => {try{
      if (err) return console.error(err);
      files.forEach(file => {try{
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
            if(!!target_module.active){ 
              if(!!target_module.events){
                  for(let key in target_module.events){  
                      if(target_module.events[key].on){
                            client.on(key, (...args) => target_module.events[key].run(client, ...args));
                            console.log('EVENT SET .../'+path+'s/'+moduleName+'/'+key);
                        };//if on end
                  };//for key
              };//if events is active
            };//if module is active
        }catch(err){console.log(err);};});//if end
   }catch(err){console.log(err);};});//event trigger
  
}catch(err){console.log(err)};};//setModuleEvents end


//_____________________________________EVENT_PRIMITIVE
//_____________________SET_EVENTS
module.exports.setEvent_primitive=async(client,path)=>{try{
   await exports.delay(1000);
   let fs = require('fs');

   fs.readdir("./"+path+"s/", (err, files) => {try{
      if (err) return console.error(err);
      files.forEach(file => {try{
            let target_module = require(`./${path}s/${file}`);
            let moduleName = file.split(".")[0];
            if(!!target_module.active){ 
              if(!!target_module.events_primitive){
                  for(let key in target_module.events_primitive){  
                      if(target_module.events_primitive[key].on){
                            if(!client.events_primitive[key]) client.events_primitive[key]=[];
                            client.events_primitive[key].push(target_module.events_primitive[key]);
                             // (key, (...args) => target_module.events_primitive[key].run(client, ...args));
                            console.log('EVENT  PRIMITIVE SET .../'+path+'s/'+moduleName+'/'+key);
                        };//if on end
                  };//for key
              };//if events is active
            };//if module is active
        }catch(err){console.log(err);};});//if end
   }catch(err){console.log(err);};});//event trigger
  
}catch(err){console.log(err)};};//setModuleEvents end