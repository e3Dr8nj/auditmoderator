//________________________________________INITIATION_PART__________________________________________
//_____________SETTINGS
exports.active=false;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
//exports.on=true;
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={
      access_roles:['!access roles','!доступ роли']
     ,roles_count:['there roles count is  ','ролей ']
     ,need_msgs:['need count messages is ','необходимое колличество сообщений ']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
};//e end
exports.system={
 
     
      channel_name:'⚛роли-и-каналы✺',
      step:10,
      divider_roleList_word:'roles3',
      channelID:'301319871981944834',
     messagesID:[],
     temple:{roles_arr_id:[]}
   
   
};
exports.digit={"0⃣":'0',"1⃣":'1' ,"2⃣":'2',"3⃣":'3',"4⃣":'4',"5⃣":'5',"6⃣":'6',"7⃣":'7',"8⃣":'8',"9⃣":'9',"🇹":'10',"🇱":'11',"🇪":'12',"🇳":'13' ,"🖤":'14',"🔚":'15',"🇬":'16',"🇭":'17',"🇮":'18',"🇯":'19'};

//_________________________________________INITIATION_PART_END___________________________________________

//_________________________________________EVENTS_PART_________________________________________________
//________________________e0
module.exports.events.messageReactionAdd={ on:true,  run:async(client,messageReaction,user)=>{try{
//if on this function triggers on deffined event
              module.exports.onclickEmoji(client,messageReaction,user,'add'); 
}catch(err){console.log(err);};}};//
//_______________________e1
module.exports.events.messageReactionRemove={ on:true,  run:async(client,messageReaction,user)=>{try{
//if on this function triggers on deffined event
              module.exports.onclickEmoji(client,messageReaction,user,'remove'); 
}catch(err){console.log(err);};}};//
//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//__________________c0
module.exports.commands.raHelp={ on:true, aliase:'raHelp', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command

              let str='['+client.prefix+'] [raHelp] Доступа роли инфо';
              str+='['+module.exports.system.channel_name+']-название канала\n';
              str+='['+module.exports.system.divider_roleList_word+']-название ролей разделителей в дискорд списке ролей\n';
              str+='['+client.prefix+'raPrint x'+']-запостить интерактивные списки ролей по x ролей в каждом\n команда также удаляет предыдущие списки \n';
              str+='['+client.prefix+'raReload x'+']-обновить списки ролей поместив по x ролей в каждый\n';
              message.channel.send(str,{code:'ini'});

}catch(err){console.log(err);};}};//
//________________c1
module.exports.commands.postAll={ on:true, aliase:'raPrint', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
                       if(module.exports.system.messagesID){
                           let t_msg={};  let id='';
                           for(let i=0;i<module.exports.system.messagesID.length;i++){
                            id=module.exports.system.messagesID[i];
                            t_msg=await message.channel.fetchMessage(id);
                            await t_msg.delete();
                             console.log(id+' delete');
                            };
                       };//if
                       let num = Number(args[1]);
                       await module.exports.getRoleArr(client,message,0,module.exports.system.divider_roleList_word);
                       let roles_len =  module.exports.system.temple.roles_arr_id.length;
                       let m_d1 =await message.reply(module.exports.d.roles_count[client.lang]+roles_len);
                       let num2 = Math.ceil(roles_len/num);
                       let m_d2=await message.reply(module.exports.d.need_msgs[client.lang]+num2);
                       
                       let msg='';  module.exports.system.step=num; let msg_arr_id=[];
                       for(let i=0;i<num2;i++){
                             msg=await message.channel.send('msg');
                             msg_arr_id.push(msg.id);
                       };//for end
                       module.exports.system.messagesID=msg_arr_id.slice();
                       await module.exports.autoreload(client,message,['',num]);
                       await delay(1000);
                       await m_d1.delete(); await m_d2.delete();
}catch(err){console.log(err);};}};//
//________________c2
module.exports.commands.rolesProfile={ on:true, aliase:'rpReload', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
                      
                       return module.exports.run(client,message,args);
}catch(err){console.log(err);};}};//
//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________

module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
             return module.exports.onGuildCreate(client);
}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________

//_________________________________________SUB_FUNCTIONS_________________
//_______________________________FOR BOOTS____
//________________________b_sf0__

exports.onGuildCreate=async(client)=>{try{
//_______________________
     let v_chnl = client.channels.find(ch=>ch.name==module.exports.system.channel_name);
     let msg_arr=await v_chnl.fetchMessages({limit:100}).then(collected=>{return collected;}).catch(err=>console.log(err));
             module.exports.system.messagesID=[];
             let color_list=false;
             msg_arr.map(m=>{
              if(m.embeds&&m.embeds[0]&&m.embeds[0].fields&&m.embeds[0].fields[0]){
                  client.emit('message',m);
                  color_list=(m.embeds[0].fields[0].name.indexOf(module.exports.d.access_roles[client.lang])!=-1)&&(m.author==client.user);
                  if(color_list){
                  module.exports.system.messagesID.push(m.id);
                  console.log(m.id+' color list');
                 };//if has embeds
               };//if end
             });//map end
//________________________
}catch(err){console.log(err);};};//onGuildCreate end
//________________________________

//_____________________________________FOR COMMANDS____________________
//______________________c0
exports.run=async(client,message,args)=>{try{
    
      return await module.exports.autoreload(client,message,args);

}catch(err){console.log(err);};};//exports.run end
//___________________c1
exports.reset=async(client,message,args)=>{try{

   let step = module.exports.system.step;
      let counter = Number(args[1]);
      let count = [0+(step*counter),0+(step*counter)+step];
    //  console.log(count);
      let roleList =  await module.exports.getRoleList(client,message,count);
      let rolesCount=roleList[1];
      roleList=roleList[0]; 
      if(roleList==' '){roleList='no data';};
      let msg = await message.channel.fetchMessage(args[2]);
       await msg.clearReactions();
      msg = await msg.edit({
      embed:{
         title:'',
         fields:[{name:module.exports.d.access_roles[client.lang],value:roleList}]
       }
      });
          let j=0;
          for(let key in module.exports.digit){
                      if(j==rolesCount) continue;
                      await msg.react(key); j++;
                };
          
}catch(err){console.log(err);};};//reset end
//___________________c2
exports.getRoleArr=async(client,message,count,keyWord)=>{try{
     
     let roles_arr=[];
     let bool=false;
     let roles_arr2= await message.guild.roles;
     let pos=[];
     roles_arr2.map(r=>{if(r.name==keyWord){ pos.push(r.position);}; return;});
         console.log('primitive '+pos);
     pos = pos.sort(function(a, b){return a-b}).reverse();
         console.log('sorted '+pos);
     roles_arr2.map( r=>{
               if(r.position<pos[0]&&r.position>pos[1]){bool=true;};
               if(bool) {roles_arr.push(r); }   
               bool=false;        
                             });
     module.exports.system.temple.roles_arr_id=await roles_arr.map(r=>r.id);
     roles_arr = roles_arr.slice(count[0],count[1]);
     
     return  roles_arr;
}catch(err){console.log(err);};};//getRoleArr end;
//_________________c3
exports.getRoleList=async(client,message,count)=>{try{
   let str='';
   str+='\n';
   let roles_arr  = await module.exports.getRoleArr(client,message,count,module.exports.system.divider_roleList_word);
   let d_arr = [];
   for(let key in module.exports.digit){ await d_arr.push(key);};
   if(roles_arr.length>20) roles_arr.length=20;
   for(let i=0;i<roles_arr.length;i++){str+=d_arr[i]+" <@&"+roles_arr[i].id+">  \n"};
 
   str+='';
   return [str,roles_arr.length];
}catch(err){console.log(err);};};//getRoleList end

//exports.create=async(client,message,args)=>{ await message.channel.send('test'); };

//______________________c4
exports.getRoleEmojiArr=async(client,msg)=>{try{

   let emb = msg.embeds[0].fields[0].value;
   let roles_arr = emb.split('\n');
   roles_arr=roles_arr.map(e=>e.replace('>','').trim().split(' <@&'));
    let obj = {};
   await  roles_arr.map(e=>obj[e[0]]=e[1]);
    //console.log(obj);  
   return obj;

 }catch(err){console.log(err);};};//getRoleEmojiArr end

//_____________________c5
exports.onclickEmoji=async(client,messageReaction,user,action)=>{try{

     
      if(!messageReaction) return;
       if ( module.exports.system.messagesID.indexOf(messageReaction.message.id)==-1) return;
     console.log('roles add/remove action');
   
     let roleEmojiArr = await  module.exports.getRoleEmojiArr(client,messageReaction.message);
     let member =messageReaction.message.guild.members.get(user.id);
     let roleID = await roleEmojiArr[messageReaction.emoji.name];
     let role = messageReaction.message.guild.roles.get(roleID);
     if(!role){return console.log('this role is apsend');};
     if(member.user.id==client.user.id) return;
     if(action=='remove'){ member.removeRole(role);  }else{member.addRole(role);};
    return;
     
     
}catch(err){console.log(err);};};//onclickEmoji end


exports.autoreload=async(client,message,args)=>{try{
if(args[1]&&!isNaN(args[1])){module.exports.system.step =Number(args[1])};
  try{
   if(module.exports.system.messagesID.length==0) return;
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
      let channel = message.guild.channels.find(ch=>ch.name==module.exports.system.channel_name);
      args=[' ',i,module.exports.system.messagesID[i]];
      await module.exports.reset(client,message,args);
    };//for end
    module.exports.system.step =10;
    return   module.exports.onGuildCreate(client);
  }catch(err){console.log(err);};    

}catch(err){console.log(err);};};//autoreload end

