// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

let myFont;
let trees = [];
var max_dist = 40;
var min_dist = 5;
let word = 'AHH'
let wordSize = 300;
let wordStartXpos = 50;
let startRootNum = 7;
let leafDensity = 500;

function preload() {
    myFont = loadFont('assets/BlobFont-Regular.otf')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(myFont);
    textSize(wordSize);

    // place each Char Tree
    // Tree(density, startPosX, startPosY, charWidth, char, wordSize)
    for (let i = 0; i < word.length; i++) {
        let charWidth = textWidth(word[i]);
        tempTree = new Tree(leafDensity, wordStartXpos, height / 1.5, charWidth, word[i], wordSize);
        trees.push(tempTree);
        wordStartXpos += charWidth;

    }

}

function draw() {
    background(0);
    frameRate(20);
    for (let i = 0; i < trees.length; i++) {
        trees[i].show(); // put any value in here for debug view
        trees[i].grow();
    }
}