//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events=false;// {} - activate/false - deactive
exports.commands=false;// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.messageDelete={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
                 console.log(message.content);
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands.someCommand={ on:true, aliase:'test', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              message.reply('test');

}catch(err){console.log(err);};}};//

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
//_______________________B1_ fetch last 100 messages every channel on boot
module.exports.boots.fetchMessages={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           if(client.test_mode) {console.log('disable on test mode'); return;};
           console.log('fetching messages');
           let ch_ids=[];
           let server = client.guilds.get(client.SERVER_ID);
           server.channels.map(ch=>{
              console.log('from channel '+ch.name);
              ch_ids.push(ch.id);
            });//
             // return;
             console.log(ch_ids);
            for(let i=0;i<ch_ids.length;i++){
                   let channel =  await server.channels.get(ch_ids[i]); //console.log(channel.type);
                   if (channel.type=='category'||channel.type==='voice') {continue;};  
                  
              
                   let can_manage_chans = channel.permissionsFor(channel.guild.me).has('READ_MESSAGE_HISTORY', false);

                    let can_view_chans = channel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL', false);

                    if (!can_manage_chans) {console.log(channel.name+' missing permissions');continue;};
                   if (!can_view_chans) {console.log(channel.name+' missing view permissions');continue;};
              
                   let msg_arr =  await channel.fetchMessages({limit:100}).then(messages=>{
                               return messages;
                   }).catch(err=>console.log(err));
            };//
            await delay(1000);
              return;
}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________