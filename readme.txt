**INFO used materials:
https://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
https://code.tutsplus.com/ru/tutorials/using-passport-with-sequelize-and-mysql--cms-27537


**INFO current state:

-db - sqlite, web-view - hbs,bootstrap
-works singup and singin
-loging attemps of login/login create


**TODO - check and update - some packages not using - efj,promise,sqlite?
**TODO - check migration and use install
**TODO - use flag remember me to auth by cookie
**TODO - add usefull functonal - menu on left with dashboard/explore world/ in explore world - button "move" and generating event+current state.
**TODO - make gameview screen - area for stats,items(left col),current goals with buttons(top row),last event(botom part of scree with image,text,changes);



**TODO
db plan:
logins - user_id (pass/email / firstname / lastname)
userinfo - 
ws user state - ( uid / ws_state (josn)  )

ws_state:
-stats(str/dex/int/wis)
-resources (health/sanity)
-items(itid,state(json - charges,etc))
-happend(list of happend events eevent_id,stage_id)


events (eid,name desc,stage_list(json))
  - (1)normal events(by level?)
  - (4)char events
  - (3)zone events
  - (2)quest-chain events

items (itid,name ,desc,effect(json))




game setting:
hero(human or mb someone else) crashed on planet(populated by orks and mb something else ).
he wants leave planet.
at horizont he see mountains with big ork trash-city. Spaceport with starting ships included.
he wanted go to city,steal ship,go to home.


zones - desert,forest,mountains,city,starport,space.
special zones - crash site(desert), ork camp(forest,mountains), mausaleum(forest), etc

battles: fail-check system with bonuses from items(+ to stats, rerolls). all events have succes effect and fail effect. event can have multiple checks.




**INFO use SQLiteStudio for manage db
**INFO - on git clone need create file ".env" (create file .env.example and in cmd "copy .env.example .env").
    Add line in .env "NODE_ENV = 'development'"
**INFO to init nodejs enviroment:
**INFO to import in eclipse:
npm install express-generator -g
express -h
express --view=pug myapp
cd myapp
npm install
set DEBUG=myapp:* & npm start