'use strict'

const gKeywordSearchCountMap = [{ keyWord: 'funny', size: 30 }, { keyWord: 'baby', size: 40 }, { keyWord: 'man', size: 19 }, { keyWord: 'movies', size: 45 }, { keyWord: 'animals', size: 26 }]
let gWordFilter = ''

let gElCanvas
let gCtx
let gCurrMeme

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalleryMemes()
    renderWordFilterBar()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-opened')
}

function renderGalleryMemes() {
    let strHTML = `<img id="random" onclick="onCreateRandomMeme()" src="img/random.jpg" alt="I'm Flexible">`
    gImgs.forEach(function (meme) {
        if (meme.keywords.join('').includes(gWordFilter)) {

            strHTML += `<img id="${meme.id}" onclick="onImgSelect(this.id)" src="img/${meme.id}.jpg" alt="">`
        }
    })
    document.querySelector('.gallery-grid-container').innerHTML = strHTML
}

function renderWordFilterBar() {
    let strHTMLs = ''
    gKeywordSearchCountMap.map((word) => {
        strHTMLs += `<a class="btn word-filter" style="font-size:${word.size}px" name="${word.keyWord}" onclick="onFilterWordPressed(this.name)">${word.keyWord}</a>`
    })
    document.querySelector('.word-filter-container').innerHTML = strHTMLs
}

function onFilterWordPressed(pressedWord) {
    const elFilteredWord = document.querySelector('.search-filter')
    elFilteredWord.value = pressedWord
    elFilteredWord.focus()
    gKeywordSearchCountMap.forEach((word) => {
        if (word.keyWord === pressedWord && word.size < 50)word.size += 5
        if (word.keyWord !== pressedWord && word.size > 25) word.size -= 2
    })
    renderWordFilterBar()
    onUpdateFilter(pressedWord)

}

function renderSavedMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    let strHTML = ''
    if (gSavedMemes && gSavedMemes !== []) {
        gSavedMemes.forEach(meme => {
            strHTML += `<img id="${meme.id}" onclick="onSavedImgSelect(this.id)" src="img/${meme.currMeme.id}.jpg" alt="">`

        })
    }
    document.querySelector('.gallery-grid-container').innerHTML = strHTML
}

function onImgSelect(id) {
    const meme = getMeme(id)
    setImg(id)
    document.querySelector('.meme-txt-input').value = 'Enter Text Here'
    onChangeWindow('newMeme')
    gCurrMeme = meme
    renderMeme(meme.id)
}

function onSavedImgSelect(id) {
    const meme = getMeme(id)
    setImg(meme['currMeme'].id)
    onChangeWindow('newMeme')
    gMeme.lines = meme.gMeme.lines
    renderMeme(meme['currMeme'].id)
    gCurrMeme = meme
}

function onChangeWindow(elBtn) {
    if (elBtn === "meme") {
        document.querySelector('.editor-container').classList.add('none')
        document.querySelector('.gallery-container').classList.remove('none')
        document.body.classList.remove('menu-opened')
        resetMemeText()
        renderSavedMemes()
    }

    if (elBtn === "newMeme") {
        document.querySelector('.editor-container').classList.remove('none')
        document.querySelector('.gallery-container').classList.add('none')
        document.body.classList.remove('menu-opened')
        gIsMemeRatioSet = false
    }

    if (elBtn === 'gallery') {
        document.querySelector('.editor-container').classList.add('none')
        document.querySelector('.gallery-container').classList.remove('none')
        document.body.classList.remove('menu-opened')
        resetMemeText()
        renderGalleryMemes()
    }
}

function onCreateRandomMeme() {
    const img = getRandomImg()
    const { meme } = img
    getRandomText()
    onChangeWindow('newMeme')
    renderMeme(meme.id)
    gCurrMeme = meme
}

function onUpdateFilter(val) {
    gWordFilter = val

    renderGalleryMemes()
}
