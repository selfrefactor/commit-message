/**
 * Following example HTML5 markup at
 * https://gist.github.com/MilanAryal/ee861d7a065cc05868d9
 */
const { emptyDirSync, copyFileSync } = require('fs-extra')
const { kebabCase, seoTitle, words } = require('string-fn')
const { minify } = require('html-minifier')
const { get } = require('axios')
const { pluck, prop, maybe, take, takeLast } = require('rambdax')
const { readFileSync, writeFileSync } = require('fs')

const LIMIT = 50
const ID_HOLDER = `${ __dirname }/_helpers/idHolder.js`
const SITE_TITLE =
  'I Learn Smarter | English-German-Bulgarian Learning Apps'
const SITE_DESCRIPTION =
  'Free web applications for educational purposes'
const URL = 'https://ilearnsmarter.com'
const CSS = `${ __dirname }/seo.css`
const CSS_OUTPUT = `${ __dirname }/seo/seo.css`
const dbLocation = `${ __dirname }/db.json`
const rows = JSON.parse(readFileSync(dbLocation).toString()).rows
const dbRaw = pluck('doc', rows)
const db = dbRaw.filter(prop('imageSrc'))

emptyDirSync(`${ __dirname }/seo`)

void async function seo(){
  const idHolder = []

  for(const _ of take(LIMIT, db)){
    const address = kebabCase(_.altTag)
    const content = await parseSingleInstance(_)
    const destination = `${ __dirname }/seo/${ address }.html`

    writeFileSync(destination, content)
    idHolder.push(`${ address }.html`)
  }
  
  const idHolderContent = `exports.idHolder = ${ JSON.stringify(
    idHolder
  ) }`

  writeFileSync(ID_HOLDER, idHolderContent)
  copyFileSync(CSS, CSS_OUTPUT)
}()

async function parseSingleInstance(_){
  const mainResult = await main(_)
  const html = `${ head(_) }${ bodyStart() }${ navigation() }${ mainResult }`

  return minify(html, {
    trimCustomFragments   : true,
    removeAttributeQuotes : true,
  })
}

function getTitle(dbInstance){
  const title = take(4, words(dbInstance.enPart)).join(' ')

  return `${ seoTitle(title) } | Translated Quote`
}

function getDescription(dbInstance){
  const descriptionAnt = prop => 
    takeLast(4, words(dbInstance[`${prop}Part`])).join(' ')

  const en = descriptionAnt('en')
  const de = descriptionAnt('de')
  const bg = maybe(
    dbInstance.bgPart && dbInstance.bgPart.length > 10,
    () => ` BG: ${descriptionAnt('bg')}`,
    ''
  )
  
  return `Quote card EN: ${ en } DE: ${de} ${bg}`
}

function head(dbInstance){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${ getTitle(dbInstance) }</title>
    <meta name="description" content="${getDescription(dbInstance)}">
    <link rel="stylesheet" href="seo.css">
  </head>`
}

function bodyStart(){
  return `<body itemscope itemtype="http://schema.org/WebPage">

  <header class="site-header" role="banner" itemscope itemtype="http://schema.org/WPHeader">
    <div class="wrap">
      <hgroup class="title-area">
        <h1 class="site-title" itemprop="name">
          ${ SITE_TITLE }
        </h1>
        <h2 class="site-description" itemprop="description">
          ${ SITE_DESCRIPTION }
        </h2>
      </hgroup>
    </div>
  </header>`
}

function navigation(){
  return `
  <nav 
    class="site-navbar" 
    role="navigation" 
    itemscope 
    itemtype="http://schema.org/SiteNavigationElement"
  >
  <div class="wrap">
    <ul class="site-navbar-nav">
      <li>
        <a 
          itemprop="url" 
          href="${ URL }"
        >
          <span itemprop="name">Home</span>
        </a>
      </li>
    </ul>
  </div>
</nav>`
}

function createRelated(dbInstance, label){
  const focusWord = dbInstance[ `${ label }Word` ]
  const related = dbInstance[ `${ label }Related` ].join(',')

  return `
  <p class="text ${ label }related">
    Related words for "${ focusWord }": ${ related }
  </p>
  `
}

async function getImageOrigin(dbInstance){
  try{
    const {status} = await get(dbInstance.imageSrcOrigin)
    if(status !== 200) return ''

    return `<div>
      <a
        rel="nofollow"
        href="${dbInstance.imageSrcOrigin}"
      >Source of image</a>  
    </div>`
  }catch(e){
    console.log('Image origin is gone', dbInstance.altTag) 
    return ''
  }
}

async function main(dbInstance){
  const bgPart = dbInstance.bgPart ?
    `<p class="text bgpart">Bulgarian translation: ${
      dbInstance.bgPart
    }</p>` :
    ''

  const bgWord = dbInstance.bgWord ?
    `<p class="text bgword">Bulgarian word on focus: ${
      dbInstance.bgWord
    }</p>` :
    ''

  const enRelated =
    dbInstance.enRelated && dbInstance.enRelated.length > 0 ?
      createRelated(dbInstance, 'en') :
      ''

  const deRelated =
    dbInstance.deRelated && dbInstance.deRelated.length > 0 ?
      createRelated(dbInstance, 'de') :
      ''

  const bgRelated =
    dbInstance.bgRelated && dbInstance.bgRelated.length > 0 ?
      createRelated(dbInstance, 'bg') :
      ''
  const liveVersion = `${ URL }/?id=${ kebabCase(dbInstance.altTag) }`

  const imageSrcOrigin = await getImageOrigin(dbInstance)

  return `
    <main class="site-content" role="main" itemscope itemprop="mainContentOfPage">

    <article class="post" itemscope itemtype="http://schema.org/Article">
      <div class="post-content" itemprop="articleBody">
        <quote class="text enpart">
          Qoute: ${ dbInstance.enPart }
        </p>
        <div>
          <a rel="nofollow" href="${ liveVersion }">Play this qoute</a>  
        </div>
        <p class="text depart">
          German translation: ${ dbInstance.dePart }
        </p>
        ${ bgPart }
        <p class="text enword">
          English word on focus: ${ dbInstance.enWord }
        </p>
        ${ enRelated }
        <p class="text deword">
          German word on focus: ${ dbInstance.deWord }
        </p>
        ${ deRelated }
        ${ bgWord }
        ${ bgRelated }
        <hr />
        <div class="image">
          <img 
            alt="${ dbInstance.altTag }"
            src="${ dbInstance.imageSrc }"
          />  
        </div>
        ${imageSrcOrigin}
      </div>
    </main>  
  </body>  
</html>  
`
}
