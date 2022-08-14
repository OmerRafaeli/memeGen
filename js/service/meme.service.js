'use strict'

const STORAGE_KEY = 'savedMemes'
let gSavedMemes = []


let gImgs = [
    { id: '1', url: 'img/1.jpg', keywords: ['politics', 'angry', 'man', 'funny', 'wig', 'important', 'president'] },
    { id: '2', url: 'img/2.jpg', keywords: ['music', 'movies', 'sound', 'dancing', 'happy', 'blond', 'mountains', 'meadow'] },
    { id: '3', url: 'img/3.jpg', keywords: ['dogs', 'animals', 'cute', 'baby', 'puppy', 'small', 'kiss'] },
    { id: '4', url: 'img/4.jpg', keywords: ['dog', 'bed', 'animals', 'puppy', 'sleep', 'baby'] },
    { id: '5', url: 'img/5.jpg', keywords: ['baby', 'success', 'beach', 'sand', 'ginger'] },
    { id: '6', url: 'img/6.jpg', keywords: ['cats', 'laptop', 'animals', 'sleep', 'fur', 'puppy'] },
    { id: '7', url: 'img/7.jpg', keywords: ['history', 'man', 'funny', 'wig', 'hair', 'weird'] },
    { id: '8', url: 'img/8.jpg', keywords: ['charlie', 'man', 'movies', 'chocolate', 'wonka', 'smile', 'happy'] },
    { id: '9', url: 'img/9.jpg', keywords: ['kid', 'funny', 'baby', 'smile', 'awkward', 'oops', 'fart'] },
    { id: '10', url: 'img/10.jpg', keywords: ['doctor', 'scary', 'man', 'movies', 'laser', 'mini', 'austin', 'powers', 'evil'] },
    { id: '11', url: 'img/11.jpg', keywords: ['obama', 'politics', 'man', 'president', 'smile', 'funny', 'face'] },
    { id: '12', url: 'img/12.jpg', keywords: ['good', 'you', 'awesome', 'man', 'glass', 'funny'] },
    { id: '13', url: 'img/13.jpg', keywords: ['gay', 'sport', 'love', 'man', 'happy', 'african'] },
    { id: '14', url: 'img/14.jpg', keywords: ['kid', 'dance', 'music', 'africa', 'happy', 'laugh', 'waka'] },
    { id: '15', url: 'img/15.jpg', keywords: ['politics', 'funny', 'man', 'wig', 'important', 'winner', 'president', 'yes', 'rock', 'roll'] },
    { id: '16', url: 'img/16.jpg', keywords: ['baby', 'scary', 'sleep', 'small', 'awake'] },
    { id: '17', url: 'img/17.jpg', keywords: ['dog', 'sleep', 'yoga', 'sports', 'animals', 'tired', 'lazy', 'no', 'beg', 'break', 'dance', 'white'] },
    { id: '18', url: 'img/18.jpg', keywords: ['toy', 'story', 'movies', 'cowboy', 'light', 'year', 'woody', 'infinity'] },
    { id: '19', url: 'img/19.jpg', keywords: ['man', 'yell', 'politics', 'angry', 'disappointed', 'what', 'why', 'blame'] },
    { id: '20', url: 'img/20.jpg', keywords: ['matrix', 'movies', 'man', 'alice', 'morpheus', 'glass', 'pill'] },
    { id: '21', url: 'img/21.jpg', keywords: ['lord', 'ring', 'movies', 'man', 'simply', 'one', 'hobbit'] },
    { id: '22', url: 'img/22.jpg', keywords: ['oprah', 'car', 'politics', 'man', 'happy', 'money', 'got', 'cash', 'prize', 'microphone'] },
    { id: '23', url: 'img/23.jpg', keywords: ['star', 'track', 'movies', 'prosper', 'long', 'bald', 'patrick', 'stewart'] },
    { id: '24', url: 'img/24.jpg', keywords: ['president', 'two', 'politics', 'man', 'tie', 'hair', 'russia', 'war'] },
]

let gRandomMemeTxt = [
    'Write complete sentences you must',
    'I got this',
    'What if I told you',
    'I\m trying to',
    'I don\'t think that memes',
    'Let it rain',
    'Shut up and take my money',
    'I am a meme',
    'I don\'t care if it\'s 5AM',
    'And you have to poop in a box',
    'Current mood',
    'Laziness',
    'Retired mermaids',
    'That\'s my jam',
    'Can February march?',
    'Hold my beer'
]

let gMeme = {
    selectionId: 0,
    memeLineIdx: 0,
    lines: [
        {
            txt: 'Enter Text Here',
            size: 35,
            align: 'center',
            color: '#f6f6f6',
            stroke: '#111111',
            font: 'impact',
            width: 0,
            height: 0,
            posX: 0,
            posY: 0,
            isDragging: false
        },
    ]
}

function getMeme(id) {
    let meme = gImgs.find(meme => id === meme.id)
    if (!meme) {
        meme = gSavedMemes.find(meme => id === meme.id)
    }
    return meme
}

function setImg(id) {
    gMeme.selectionId = id
}

function setCanvasSize(canvas, img) {
    let height, width

    canvas.height = img.height
    canvas.width = img.width

    width = img.width
    height = img.height

    gIsMemeRatioSet = true
}

function changeFontSize(num) {
    getSelectedLine().size += num
}

function changeTextPos(num) {
    getSelectedLine().posY += num
}

function setFontColor(clr) {
    getSelectedLine().color = clr
}

function setStrokeColor(clr) {
    getSelectedLine().stroke = clr
}

function getRandomImg() {
    const id = getRandomNumber(1, gImgs.length)
    const meme = getMeme(id + '')
    setImg(id)

    return { meme, id }
}

function getRandomText() {
    const isMultiLine = getRandomNumber(1, 100) // if number is higher than 50, two lines will be created
    if (isMultiLine > 50) {
        const newText = {
            txt: gRandomMemeTxt[getRandomNumber(1, 15)],
            size: getRandomNumber(35, 45),
            align: 'center',
            color: getRandomColor(),
            stroke: getRandomColor(),
            width: 0,
            height: 0,
            posX: 0,
            posY: 0,
            isDragging: false
        }

        gMeme.lines.push(newText)
        gMeme.memeLineIdx = gMeme.lines.length - 1
    }

    gMeme.lines[0] = {
        txt: gRandomMemeTxt[getRandomNumber(1, 14)],
        size: getRandomNumber(35, 45),
        align: 'center',
        color: getRandomColor(),
        stroke: getRandomColor(),
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        isDragging: false
    }

}

function setTextHeight(idx, height) {
    if (idx === 0) {
        return height / 10
    } else if (idx === 1 && gMeme.lines[0].posY > height / 4) {
        return height / 10
    } else if (idx === 1) {
        return height - 35
    } else if (idx > 1 && gMeme.lines[0].posY === height / 2) {
        return height - 35
    } else if (idx > 1) {
        return height / 2
    }
}

function getSelectedLine() {
    return gMeme.lines[gMeme.memeLineIdx]
}

function drawText(txt, x, y, gMeme) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = gMeme.align
    gCtx.lineWidth = 1
    gCtx.font = gMeme.size + `px ${gMeme.font}`
    gCtx.fillStyle = gMeme.color + ''
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = gMeme.stroke
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
}

function setLineTxtForEdit(txt) {
    if (!gMeme.lines.length || gMeme.lines === [])
        getSelectedLine().txt = txt
}

function removeCurrTextLine() {
    let lineIdx = gMeme.memeLineIdx
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(lineIdx, 1)
}

function resizeCanvas() {
    let elContainer = document.querySelector('#my-canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

function createNewTextLine() {
    const newText = {
        txt: 'Enter Text Here',
        size: 35,
        align: 'center',
        color: '#f6f6f6',
        stroke: '#111111',
        font: 'impact',
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        isDragging: false
    }

    gMeme.lines.push(newText)
    gMeme.memeLineIdx = gMeme.lines.length - 1
}

function resetMemeText() {
    gMeme.lines = [{
        txt: 'Enter Text Here',
        size: 35,
        align: 'center',
        color: '#f6f6f6',
        stroke: '#111111',
        font: 'impact',
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        isDragging: false
    }]

}

function changeTextDirection(dir) {
    getSelectedLine().align = dir
}

function updateTextInfo(width, height, posX, posY) {
    getSelectedLine().width = width
    getSelectedLine().height = height
    getSelectedLine().posX = posX
    getSelectedLine().posY = posY
}

function setLineDrag(bool) {
    getSelectedLine.isDragging = bool
    console.log('bool:', bool)
    
}

function isTextLineClicked(clickedPos, ev) { 

    // gMeme.lines.forEach(function (line, idx) {if(line.posY === getSelectedLine().posY){
    //     gMeme.memeLineIdx = idx
    // }
    // })

        const { posX, posY, width, height } = getSelectedLine()    
        gCtx.beginPath()
        drawRec(posX - (width / 2), posY - (getSelectedLine().size / 2), width, height)
        if (gCtx.isPointInPath(clickedPos.x, clickedPos.y)) {
            return true
        }
}