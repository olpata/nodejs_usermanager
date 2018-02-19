module.exports = [
    {
        name:"Fall in pit",
        img:"./assets/events/question.png",
        desc:"You loose concentrration and fall in big pit. Kneel is hurt.",
        weight:3,
        effect:"test dex, on fail lose 1 hp."
    },
    {
        name:"Strange noise",
        img:"./assets/events/question.png",
        desc:"You hear scary noises - like some one teared apart.",
        weight:2,
        effect:"test will, on fail lose 1 sanity."

    },
    {
        name:"Ork patrol",
        img:"./assets/events/battle.png",
        desc:"Orks found you.Prepare to fight or ran.",
        weight:2,
        effect:"test combat, on fail lose 1 hp and 1 sanity."

    },
    {
        name:"Finding",
        img:"./assets/events/question.png",
        desc:"You find shiny thing in mud.",
        weight:1,
        effect:"get item from pool of rarirty(1)."

    }
];