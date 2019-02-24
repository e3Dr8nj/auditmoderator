//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events={};// {} - activate/false - deactive
exports.events_primitive={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
     ,ch_log_name:'лог-мод'
     ,sm_role_name:'Супермодератор'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
let last_id=''; let del_msg=[];
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.messageDelete={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
    
              console.log('message delete'); 
              let log_channel=message.guild.channels.find(ch=>ch.name==module.exports.e.ch_log_name);
              let str_msg = "message.author: "+message.member+" message.channel: "+message.channel.name+'\n'+" message.content: "+message.content ;
              let actually_audit =  await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> {
                    return audit;}).catch(err=>console.log(err));
             // console.log(actually_audit);
              let the_entry=false;
              actually_audit.entries.map(e=>{
                  let same_target=e.target.id===message.author.id; 
                  let same_channel = e.extra.channel.id===message.channel.id;
                 
                  let the_audit = client.audit_delete.entries.get(e.id);
                     if (!the_audit) {
                         // console.log('new audit'); 
                     };
                     if (the_audit){
                            let same_count=the_audit.extra.count===e.extra.count;
                            if(same_count) {
                              //console.log('existed and count the same'); 
                              return;
                             };
                      };//if audit already existed
                      if(!same_channel) {
                            //console.log('different channel');
                            return;
                       };
                      if(!same_target) {
                           // console.log('different target');
                            return;
                      };
                      //message.channel.send('executor '+e.executor.username+" count"+e.extra.count+' id '+e.id);
                      if(e.executor.id===message.guild.owner.id) return;
                      log(e);
                  return ;
              });//filter
              //console.log(changed);
              //changed.map(e=>console.log(e.id));
              client.audit_delete=actually_audit;
              return;


//_________________
            async function log(entry){
              let d=new Date(); d.setTime(entry.createdTimestamp);
              let executor=message.guild.members.get(entry.executor.id);
              let target=message.guild.members.get(entry.target.id);
              let channel = message.guild.channels.get(entry.extra.channel.id);
              let str = executor;
              str+=" удалил сообщения ";
              str+=target+" "+target.user.username+"#"+target.user.discriminator;
              str+='\n<#'+channel.id+'> \n';
              let msg_cnt = (message.content.length<1850)?message.content:message.content.slice(0,1850);
              str+=msg_cnt;
              module.exports.log(client,message,{description:str});
            };
//______________________

}catch(err){console.log(err);};}};//
//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands.audit={ on:true, aliase:'audit', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
          
         
         async function f(){
             let entry='';
             entry = await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=>{
                //console.log(audit);
                   let arr2 = audit.entries;
                   let arr=[];
                   arr2.map(e=>arr.push(e));
                   arr.map(entry=>{
                           console.log(entry.id+" _____________________________");
                          let d=new Date(); d.setTime(entry.createdTimestamp);
                          console.log('time: '+d);
                          console.log('executor: '+entry.executor.username);
                         console.log('channel: '+entry.extra.channel.name);
                         console.log('target:'+entry.target.username);
                          console.log('count:'+entry.extra.count);
                    });
                return;
                return audit.entries.first();}).catch(err=>console.log(err));
           console.log(entry.id);
             let d=new Date(); d.setTime(entry.createdTimestamp);
           console.log('time: '+d);
           console.log('executor: '+entry.executor.username);
           console.log('channel: '+entry.extra.channel.name);
           console.log('target:'+entry.target.username);
            
          console.log(entry);
       };
         f();
}catch(err){console.log(err);};}};//

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.getLastAudit={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           let audit = await client.guilds.get(client.SERVER_ID).fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> audit).catch(err=>console.log(err));
           client.audit_delete=audit;
           console.log('last audit deleting get');
}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
exports.log=async(client,message,action)=>{
try{ 
   let colors={blue:0x3366ff,gray:0x668099,red:0xff0000,red2:0xcc0066,green:0x339980,violet:0x6600cc,dark_blue:0x000066};
   action.color=(action.color&&colors[action.color])?action.color:'gray';
   action.name=(action.name)?action.name:'Удаление сообщения';
   let log_mod=await message.guild.channels.find(r=>r.name==module.exports.e.ch_log_name);
   
   if(!log_mod){console.log('log channel not found'); return;};
  // log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
  //let str = (all)?message.member+'\n':message.member;
   let emb={fields:[{name:action.name,value:action.description}],timestamp: new Date(),color:colors[action.color]};
   log_mod.send({embed:emb});
}catch(err){console.log(err);};
};//createRole end

//__________________________SUB_FUNCTION
module.exports.fetchAuditLog=async(client,message)=>{try{
//if on this function triggers on ready event (with some delay)
 //{type:'MESSAGE_DELETE'}  
           console.log('message author '+message.member.user.username);     
           let res='';   
           let entry = await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> audit.entries.first()).catch(err=>console.log(err));
              console.log(entry.id);
             //if(last_id===entry.id){ console.log('same audit'); return false};
            // last_id=entry.id;
             return entry;
               let executor = message.guild.members.get(entry.executor.id);
               let user = "";
               let d=new Date(); d.setTime(entry.createdTimestamp);

               let sm = !!executor.roles.find(r=>r.name==module.exports.e.sm_role_name);
               if (entry.extra.channel.id === message.channel.id
               && (sm)
               && (entry.target.id === message.author.id)){
               console.log('ok');
                 res=entry;
     } else { 
             console.log('field');
               
             let d=new Date(); d.setTime(entry.createdTimestamp);
           console.log('time: '+d);
           console.log('executor: '+entry.executor.username);
           console.log('channel: '+entry.extra.channel.name);
           console.log('target:'+entry.target.username);
                 res=false;
           del_msg.push(message);
                 return res;
  };
        console.log('ok');
       
              
             
           console.log('time: '+d);
           console.log('executor: '+entry.executor.username);
           console.log('channel: '+entry.extra.channel.name);
           console.log('target:'+entry.target.username);
        return entry;

}catch(err){console.log(err)};};//
//_____________________________Sf1
module.exports.fetchAuditLog=async(client,message)=>{try{
//if on this function triggers on ready event (with some delay)
 //{type:'MESSAGE_DELETE'}  
            
         
           let entry = await message.guild.fetchAuditLogs({type:'MESSAGE_DELETE'}).then(audit=> audit).catch(err=>console.log(err));
           return entry;

}catch(err){console.log(err)};};//


//________________________________sf2
exports.new=async(client,message)=>{
try{ 
     let msg =  message.channel.send('!del');
     return;
}catch(err){console.log(err);};
};//createRole end

//______________________________EVENTS PRIMITIVE
//__E0
module.exports.events_primitive.MESSAGE_DELETE={ on:true,  run:async(client,event)=>{try{
                console.log('MESSAGE DELETE PRIMITIVE');
                
  let message = await client.channels.get(event.d.channel_id).fetchMessage(event.d.id).then(collected=>{return collected;}).catch(err=>{
      if(err.message==='Unknown Message') {
             console.log('unk');
             module.exports.boots.getLastAudit.run(client);
       };
   });
   return;
               //  console.log(event.d.message.content);

}catch(err){console.log(err);};}};//

