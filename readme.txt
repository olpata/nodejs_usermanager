**INFO used materials:
https://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
https://code.tutsplus.com/ru/tutorials/using-passport-with-sequelize-and-mysql--cms-27537


**INFO current state:

-db - sqlite, web-view - hbs,bootstrap
-works singup and singin
-loging attemps of login/login create

**TODO - move to angular or react from hbs - prooblem with small transformation input data for view-page
**TODO - check and update - some packages not using - efj,promise,sqlite?
**TODO - check migration and use install
**TODO - use flag remember me to auth by cookie
**TODO - add usefull functonal - menu on left with dashboard/explore world/ in explore world - button "move" and generating event+current state.
**TODO - make gameview screen - area for stats,items(left col),current goals with buttons(top row),last event(botom part of scree with image,text,changes);
**TODO - slice login-functionality from project


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


-------------



resources managment


-goal need points of progress. Diff goal have diff progress rules(progress each turn, test checks etc).
  -mb monsters to kill??
-will be 3 heroes with stats to complite tasks on turn.
-remove items.
-all rewards cumulate in stash and can be used between quests.

diff level 
-4 heroes and 1 encounter per turn.
-3 heroes and 1 encounter per turn.
-4 heroes and 2 encounter per turn.


test system:
test-xxx -yyy
d6+xxx >= 6+yyy
d6+ (xxx-yyy) >= 6
xxx   chance
0     1/6
1     2/6
2	3/6
3 	4/6
4 	5/6
5	100%
6	100%

events pool:

0.quest goal(change from quets to quest)
find suspect(5 progress, test-dex +0)
find safelocker(5 progress, test-int +0)
stop spell(5 progress, test-will +0)


1.basic actions (endless goals)
rest(+1hp +1mind to all)
help team(add to all stats+1 boost on next turn)
scavange(test-dex for positiove encounter)
planing(test-int for avoid encounter)


2.char action
pray(+3 mind)


3.cult-easy
cult initiate(progress 1,-1hp per turn,test-comb)
cult priest(progress 1,-1hp -1mind per turn,test-comb-2)
possesed(progress 1,-2mind per turn,test-comb-4)
strange signs on walls(progress 1,test-int-2,on success +2 rewards)
hidden door(progress 1,test-int-4,on success +1 rewards)
spawn of hell(progress 1,-1hp -2mind per turn,test-comb-2)



4.thug-easy
spike trap(test-dex for all,on fail -1 hp)
poison gas(test-dex-1 for all,on fail -1 hp)
guardman(progress 1,-2hp per turn,test-comb )
ninja(progress 1,-2hp per turn,test-dex-2 )
sniper(progress 2,-1hp per turn,test-dex-2 )
handguner(progress 1,-1hp per turn,test-comb-2 )
safelock(progress 1,test-dex-2,on success - +2 rewards )




5.animals-town
rat(progress 1,-1hp per turn. auto end in 1,test-comb )
hound(progress 1,-1hp per turn. auto end in 3 turn,test-comb-2 )

5.animals-forest
bear(progress 1,-1hp per turn. auto end in 10,test-comb-5 )
wolf(progress 1,-1hp per turn. auto end in 4,test-comb-2 )
spider(progress 1,-1hp per turn. auto end in 3,test-comb-1 )






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