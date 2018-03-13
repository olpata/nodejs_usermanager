module.exports = [
    {
        id: 10001,
        name:"Reach forest",
        img:"./assets/goals/explore_1.jpg",
        desc:"Forser is your main taget. In forest you can try find way to city.",
        difficulty:10,
        progress:2,
        effect:"go to next chapter on complite."
    },
    {
        id: 10002,
        name:"Lost direction.",
        img:"./assets/events/question.png",
        desc:"You lost direction to north.You need sit down and calm down and find right direction.",
        difficulty:1,
        progress:0,
        effect:"restore 1 hp and 1 sanity on complite."

    },
    {
        id: 10003,
        name:"Look for water.",
        img:"./assets/goals/fight_1.jpg",
        desc:"You are thirty. You can not think about anything except water.",
        difficulty:3,
        progress:0,
        effect:"lose 1 sanity each turn."

    },
    {
        id: 10004,
        name:"Stuck in mud",
        img:"./assets/goals/rest_1.jpg",
        desc:"Your feet stuck in mud.",
        difficulty:2,
        progress:0,
        effect:"test-dex for progress. can not progress any other goals except mandatory(like this) ones."

    }
];