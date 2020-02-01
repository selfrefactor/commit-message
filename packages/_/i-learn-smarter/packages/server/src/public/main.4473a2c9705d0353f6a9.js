(window.webpackJsonp=window.webpackJsonp||[]).push([["main"],{"+0l1":
/*!*****************************************!*\
  !*** ./src/learning_meme/epics/init.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../actions */"1Wps"),a=n(/*! ../../bees/createDatabase */"sz3p");t.initEpic=((e,t)=>{const n=e.ofType(r.INIT_READY),s=e.ofType(r.LEARNING_MEME_INIT);return o.Observable.combineLatest(n,s).map(()=>i.initReady(a.createDatabaseBee(t)))})},"+aNb":
/*!*******************************!*\
  !*** ./src/_styled/image.tsx ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ./grid */"ZPtv");t.getImageContainer=function(e,t){return r.default.div`
    text-align: center;
    grid-area: ${t};
    height: ${e*o.height}vh;
    width: 100%;
  `},t.ImageBase=r.default.img`
  width: auto;
  height: 100%;
`},"/I9d":
/*!******************************************!*\
  !*** ./src/select_article/epics/stop.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../../root/actions */"X9xb");t.stopEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_STOP).switchMap(()=>new r.Observable(e=>{const{textToSpeechFlag:n}=function(e){const{textToSpeechFlag:t}=e.getState().store;return{textToSpeechFlag:t}}(t);n&&e.next(i.sharedSpeak("fromPart")),e.complete()})))},"/ZOX":
/*!****************************************!*\
  !*** ./src/select_article/reducers.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o={currentIndex:-1,currentInstance:{fromPart:"",imageSrc:"",toPart:"",wordList:[]},db:[],listen:!1,ready:!1};t.selectArticleStore=function(e=o,t){switch(t.type){case r.SELECT_ARTICLE_INIT_READY:return Object.assign({},e,{currentIndex:-1},t.payload);case r.SELECT_ARTICLE_NEXT_READY:return Object.assign({},e,{ready:!0,listen:!0},t.payload);case r.SELECT_ARTICLE_STOP:return Object.assign({},e,{listen:!1});case r.SELECT_ARTICLE_CLICK_READY:return Object.assign({},e,{currentInstance:Object.assign({},e.currentInstance,{wordList:t.payload})});case r.SELECT_ARTICLE_UNMOUNT:return Object.assign({},e,o);default:return e}}},"07J5":
/*!********************************************!*\
  !*** ./src/ants/mini/normalizeLanguage.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.normalizeLanguageAnt=function(e){return`${e.toLowerCase()}-${e}`}},"0CO9":
/*!***************************************!*\
  !*** ./src/bees/setConvertedImage.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! localforage */"oAJy"),o=n(/*! ../_helpers/convertToBase64 */"8GXq"),i=n(/*! ../_helpers/getConvertedNamespace */"e2sN"),a=n(/*! ./getConvertedImage */"ekhr");t.setConvertedImageBee=async function(e){const t=i.getConvertedNamespace(e.imageSrc);if(!1===await a.getConvertedImageBee(e)){const n=await o.convertToBase64(e.imageSrc);await r.setItem(t,n)}}},"0Sgv":
/*!**************************************!*\
  !*** ./src/guess_word/component.tsx ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"0Yy6"),a=n(/*! ./guessWord */"fJpv");t.GuessWordWrapped=o.connect(({store:e,guessWordStore:t})=>({store:e,guessWordStore:t}))(class extends r.PureComponent{componentDidMount(){this.props.dispatch(i.init())}render(){const{ready:e}=this.props.guessWordStore;return r.createElement("div",null,e&&r.createElement(a.GuessWord,Object.assign({},this.props)))}})},"0Yy6":
/*!***********************************!*\
  !*** ./src/guess_word/actions.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.GUESS_WORD_CHECK),t.init=r.createAction(o.GUESS_WORD_INIT),t.initReady=r.createAction(o.GUESS_WORD_INIT_READY),t.input=r.createAction(o.GUESS_WORD_INPUT),t.inputChange=r.createAction(o.GUESS_WORD_INPUT_CHANGE),t.next=r.createAction(o.GUESS_WORD_NEXT),t.nextReady=r.createAction(o.GUESS_WORD_NEXT_READY),t.nextTick=r.createAction(o.GUESS_WORD_NEXT),t.stop=r.createAction(o.GUESS_WORD_STOP),t.unmount=r.createAction(o.GUESS_WORD_UNMOUNT)},"1Wps":
/*!**************************************!*\
  !*** ./src/learning_meme/actions.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.init=r.createAction(o.LEARNING_MEME_INIT),t.initReady=r.createAction(o.LEARNING_MEME_INIT_READY),t.check=r.createAction(o.LEARNING_MEME_CHECK),t.stop=r.createAction(o.LEARNING_MEME_STOP),t.next=r.createAction(o.LEARNING_MEME_NEXT),t.nextReady=r.createAction(o.LEARNING_MEME_NEXT_READY),t.listen=r.createAction(o.LEARNING_MEME_LISTEN),t.setInput=r.createAction(o.LEARNING_MEME_SET_INPUT)},"1keb":
/*!*********************************************!*\
  !*** ./src/select_article/styled/image.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/image */"+aNb"),a=n(/*! ./grid */"GX+t");t.ImageContainer=r.default(o.CenteredItem)`
  grid-area: sa_image;
  height: ${7*a.frHeight}vh;
  width: 100%;
`,t.Image=i.ImageBase},"1uLi":
/*!*******************************************!*\
  !*** ./src/root/navigation/component.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ./styled/cells */"hULM"),o=n(/*! ./styled/grid */"5r7U"),i=r.CCell("nav_first"),a=r.CCell("nav_second"),s=r.CCell("nav_third"),c=r.CCell("nav_fourth"),l=r.CCell("nav_fifth"),u=r.CCell("nav_sixth"),d=r.CCell("nav_seventh"),p=n(/*! rambdax */"Ex95"),E=n(/*! react */"q1tI"),f=n(/*! react-redux */"/MKj"),h=n(/*! react-router-dom */"55Ip"),g=n(/*! ../../constants */"he5r"),m="https://github.com/selfrefactor/front#modes";class _ extends E.Component{render(){const e=""===p.last(window.location.href.split("/")),t=this.props.store.name===g.LEARNING_MEME&&!e;return E.createElement("div",null,this.props.navigationStore.active&&E.createElement(o.Container,null,E.createElement(o.Grid,null,E.createElement(i,null,E.createElement("span",{className:"special-modes",onClick:()=>window.location.href=m},"Special Modes")),!e&&E.createElement(a,null,E.createElement("span",null,E.createElement(h.Link,{to:"/learning-meme"},"Learning Meme"))),E.createElement(s,null,E.createElement("span",null,E.createElement(h.Link,{to:"/write-sentence"},"Write Sentence"))),E.createElement(c,null,E.createElement("span",null,E.createElement(h.Link,{to:"/choose-word"},"Choose Word"))),E.createElement(l,null,E.createElement("span",null,E.createElement(h.Link,{to:"/guess-word"},"Guess Word"))),E.createElement(u,null,E.createElement("span",null,E.createElement(h.Link,{to:"/select-article"},"Select Article"))),E.createElement(d,null,!t&&E.createElement("span",null,E.createElement(h.Link,{to:"/"},"Home"))))))}}t.Navigation=_;t.NavigationWrapped=f.connect(({navigationStore:e,store:t})=>({navigationStore:e,store:t}))(_)},"2B74":
/*!******************************************!*\
  !*** ./src/root/carrier/styled/grid.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! rambdax */"Ex95"),a=n(/*! styled-components */"vOnD"),s=n(/*! ../../../ants/css_in_js/media */"fjO1"),c=i.glue("logo \n  c_info\n  . . \n  c_changelanguage \n  c_random \n  c_texttospeech \n  c_submit \n  c_next \n  . . .\n  points\n"),l=i.replace(". points","points points",c),{points:u}=r.getterAnt({points:0}),d=`grid-template-areas: "${l}";`,p=u>999?s.mediaImportantAnt(d):s.mediaAnt(d);t.Container=a.default.div`
  grid-template-areas: "${c}";
  position: absolute;
  top: 92vh;
  width: 100%;
  height: 8vh;
  left: 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  svg, canvas {
    cursor: pointer;
  }
  ${p}
`;const E=a.default.div`
  width: 8vw;
  height: 10vh;
`;t.LogoCell=a.default(E)`
  grid-area: logo;
`,t.createIconCell=function(e,t){const n=40,r=i.defaultTo(!0,t)?"hvr-pulse":"";return{inner:a.default.canvas.attrs({height:n,id:`icon_${e}`,width:n})``,outer:a.default.div.attrs({className:r})`
    grid-area: c_${e};
    height: 8vh;
    text-align: center;  
    width: 7.8vw;
  `}},t.Points=a.default(E)`
  padding-top: 7%;
  cursor: none;
  font-family: 'Kranky', cursive;
  font-size: 5vh;
  line-height: 5vh;
  color: ${o.navy};
  grid-area: points;
`},"2Skl":
/*!************************************!*\
  !*** ./src/guess_word/reducers.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o={answer:"",currentIndex:-1,db:[],inputState:"",listen:!1,question:"",ready:!1,related:[],translated:"",wordAnswer:"",wordQuestion:""};t.guessWordStore=function(e=o,t){switch(t.type){case r.GUESS_WORD_INIT_READY:return Object.assign({},e,{db:t.payload});case r.GUESS_WORD_NEXT_READY:return Object.assign({},e,{listen:!0,ready:!0},t.payload);case r.GUESS_WORD_STOP:return Object.assign({},e,{inputState:"",listen:!1});case r.GUESS_WORD_INPUT_CHANGE:return Object.assign({},e,{inputState:t.payload});case r.GUESS_WORD_UNMOUNT:return Object.assign({},e,o);default:return e}}},"2YZa":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(/*! ./root/carrier/style.css */"B3gl"),n(/*! ./root/rxImports */"vrkp");const r=n(/*! client-helpers */"RQK/"),o=n(/*! ./bees/rootInit */"tGx/"),i=n(/*! ./constants */"he5r");r.initLocalState("SK",i.initialDefaultState),r.masterSetter(Object.assign({},i.initialDefaultState,i.defaultState,r.masterGetter()));const a=n(/*! connected-react-router */"PBcv"),s=n(/*! react */"q1tI"),c=n(/*! react-dom */"i8i4"),l=n(/*! @sentry/browser */"abTI"),u=n(/*! react-redux */"/MKj"),d=n(/*! react-router-dom */"55Ip"),p=n(/*! rxjs/Observable */"4c1C"),E=n(/*! history */"YHGo"),f=n(/*! redux */"fvjX"),h=n(/*! redux-observable */"NOGq"),g=n(/*! ./ants/mini/createElement */"8yuS"),m=n(/*! ./ants/mini/getCompose */"Xipg"),_=n(/*! notify/component */"dS5j"),S=n(/*! ./choose_word/component */"FGAa"),v=n(/*! ./guess_word/component */"0Sgv"),T=n(/*! ./learning_meme/component */"y8dd"),C=n(/*! ./lesson/component */"ZhGE"),O=n(/*! ./root/carrier/component */"CIU0"),N=n(/*! ./root/navigation/component */"1uLi"),I=n(/*! ./select_article/component */"fqjP"),b=n(/*! ./write_sentence/component */"mfjz"),x=n(/*! ./bees/getJson */"pZ8w"),A=n(/*! ./bees/post */"XfmU"),y=n(/*! ./root/actions */"X9xb"),w=n(/*! ./root/combinedReducers */"l7n/"),R=n(/*! ./root/epics/ */"7Xab"),P={getJson:e=>p.Observable.fromPromise(x.getJsonBee(e)),postRequest:(e,t)=>p.Observable.fromPromise(A.postBee(e,t))},L=h.createEpicMiddleware(R.rootEpic,{dependencies:P}),D="react-container";g.createElementAnt(D);const M=m.getComposeAnt(),j=E.createBrowserHistory(),W=f.createStore(a.connectRouter(j)(w.combinedReducers),M(f.applyMiddleware(a.routerMiddleware(j),L)));const G=u.connect(({store:e,navigationStore:t})=>({navigationStore:t,store:e}))(class extends s.Component{constructor(e){super(e),o.rootInitBee()}componentDidMount(){l.init({dsn:"https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126"}),this.props.dispatch(y.init())}componentDidCatch(e){l.captureException(e)}render(){return s.createElement("div",null,s.createElement(_.Notify,null),s.createElement(O.CarrierWrapped,null),s.createElement(a.ConnectedRouter,{history:j},s.createElement("div",null,s.createElement(N.NavigationWrapped,null),s.createElement(d.Route,{component:T.LearningMemeWrapped,exact:!0,path:"/"}),s.createElement(d.Route,{component:C.LessonWrapped,path:"/lesson-*"}),s.createElement(d.Route,{component:I.SelectArticleWrapped,exact:!0,path:"/select-article"}),s.createElement(d.Route,{component:v.GuessWordWrapped,exact:!0,path:"/guess-word"}),s.createElement(d.Route,{component:T.LearningMemeWrapped,exact:!0,path:"/learning-meme"}),s.createElement(d.Route,{component:b.WriteSentenceWrapped,exact:!0,path:"/write-sentence"}),s.createElement(d.Route,{component:S.ChooseWordWrapped,exact:!0,path:"/choose-word"}))))}});c.render(s.createElement(u.Provider,{store:W},s.createElement(G,null)),document.getElementById(D))},"2py+":
/*!****************************************!*\
  !*** ./src/choose_word/epics/check.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"MdxE");t.checkEpic=((e,t)=>e.ofType(o.CHOOSE_WORD_CHECK).switchMap(e=>new r.Observable(n=>{const r=(e=>"UP"===e.payload?0:"DOWN"===e.payload?2:1)(e),{correctAnswer:o,index:a,question:s}=t.getState().chooseWordStore;o[a]===s[a][r]&&n.next(i.incPoints()),n.next(i.step()),n.complete()})))},"3vFA":
/*!***************************************!*\
  !*** ./src/guess_word/epics/index.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"QH2t"),i=n(/*! ./init */"ikCi"),a=n(/*! ./initReady */"o2aO"),s=n(/*! ./input */"oztT"),c=n(/*! ./next */"m+B3");t.guessWordEpic=r.combineEpics(o.checkEpic,s.inputEpic,a.initReadyEpic,c.nextEpic,i.initEpic)},"49dL":
/*!*****************************************!*\
  !*** ./src/write_sentence/ants/auto.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../actions */"o/T1"),i=n(/*! ./lastWord */"KZC7");t.autoAnt=async function(e,t,n){await r.delay(2*t);let a=0;for(;;)a++,await r.delay(t),a>5&&i.lastWordAnt()&&(await r.delay(n),a=0),e(o.listen("SPACE"))}},"4MmZ":
/*!********************************************!*\
  !*** ./src/write_sentence/epics/listen.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"o/T1"),s="_";t.listenEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_LISTEN).switchMap(e=>new o.Observable(n=>{const{index:o,inputState:i,listen:c,question:l}=t.getState().writeSentenceStore,u=r.allTrue(c,()=>l[o].hidden.length===i.length);if(r.allTrue(c,"SPACE"===e.payload||u))n.next(a.check());else if(c){const t=function({question:e,index:t,input:n}){const o=e[t],i=n.length-1;if(o.visible[i]!==s)return e;const a=o.visible.split(""),c=r.update(i,r.last(n),a).join("");return r.update(t,Object.assign({},o,{visible:c}),e)}({index:o,input:e.payload,question:l});n.next(a.setInput({input:e.payload,question:t}))}else n.next(a.next());n.complete()})))},"5/+n":
/*!********************************************!*\
  !*** ./src/choose_word/epics/initReady.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.CHOOSE_WORD_INIT_READY).map(()=>({type:r.CHOOSE_WORD_NEXT})))},"5E6V":
/*!********************************!*\
  !*** ./src/root/epics/init.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! rxjs/Observable */"4c1C"),a=n(/*! string-fn */"DOxJ"),s=n(/*! ./../../constants */"he5r"),c=n(/*! ./../actions */"X9xb");t.initEpic=((e,t,{getJson:n})=>e.ofType(s.INIT).switchMap(()=>new i.Observable(e=>{i.Observable.from(n(s.DB_URL)).subscribe(t=>{e.next(c.initReady({received:function({rows:e}){const t=r.getter("id");if(!t)return{rows:e};const n={first:[],second:[]};let o="first";return e.forEach(({doc:e})=>{e.altTag&&(a.kebabCase(e.altTag)===t&&(o="second"),n[o].push({doc:e}))}),{rows:[...n.second,...n.first]}}(function(e){return r.getter("child")?{rows:e.rows.filter(o.path("doc.pcFlag"))}:e}(t))})),e.complete()})})))},"5r7U":
/*!*********************************************!*\
  !*** ./src/root/navigation/styled/grid.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD");t.Container=r.default.div`
  position: absolute;
  width: 25vw;
  height: auto;
  bottom: 11vh;
  left: 0;
  z-index: 1000;
`,t.Grid=r.default.div`
  display: grid;
  grid-template-columns: 1fr 17fr 1fr;
  grid-template-rows: repeat(7, 1fr);
  grid-template-areas: ". nav_first ." 
  ". nav_second ." 
  ". nav_third ." 
  ". nav_fourth ." 
  ". nav_fifth ."
  ". nav_sixth ."
  ". nav_seventh .";
`},"66FG":
/*!*********************************************!*\
  !*** ./src/write_sentence/questionList.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./styled/question */"MLjJ");t.QuestionList=function(e){const{question:t,index:n}=e;return r.createElement(r.Fragment,null,t.map((e,i)=>{const a=i===n?o.QuestionActive:i>n?o.QuestionVisible:o.QuestionHidden;return r.createElement(a,{key:`ws-question-${i}`},t[i].visible)}))}},"6QB+":
/*!*****************************************!*\
  !*** ./src/learning_meme/epics/next.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! client-helpers */"RQK/"),i=n(/*! rambdax */"Ex95"),a=n(/*! rxjs/Observable */"4c1C"),s=n(/*! string-fn */"DOxJ"),c=n(/*! ../../_helpers/getNextIndex */"noCf"),l=n(/*! ../../bees/sharedNextReady */"LHni"),u=n(/*! ../actions */"1Wps"),d=n(/*! ../../_helpers/selectors */"NDrd"),p=n(/*! ../../bees/setConvertedImage */"0CO9"),E=n(/*! ../../bees/getConvertedImage */"ekhr");t.nextEpic=((e,t)=>e.ofType(r.LEARNING_MEME_NEXT).switchMap(()=>new a.Observable(e=>{const{textToSpeechFlag:n}=d.getCommons(t),{currentIndex:a,db:f}=t.getState().learningMemeStore,{easy:h,easier:g,easiest:m,random:_}=o.getterAnt(r.urlInputsDefault),S=m?1:4,v=c.getNextIndex({index:a,length:f.length}),T=f[v];l.sharedNextReadyBee(T);const C=[...s.maskSentence({charLimit:S,easyMode:h,easierMode:g,randomMode:_,sentence:T.fromWord}).visible].join(" "),O=s.maskSentence({charLimit:S,easyMode:h,easierMode:g,sentence:T.fromPart,words:T.fromWord.split(" ")}),N=i.map(e=>e.join(" ").trim(),O);E.getConvertedImageBee(T).then(t=>{const o={convertedImage:t,currentIndex:v,currentInstance:T,question:C,sentence:N};e.next(u.nextReady(o)),n&&e.next(r.sharedSpeak("toPart")),p.setConvertedImageBee(T),e.complete()})})))},"6QGu":
/*!******************************************!*\
  !*** ./src/lesson/epics/initQuestion.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"a44Q"),a=n(/*! ../bees/questionList */"ymlt");const s=e=>{const{currentStep:t}=e.getState().lessonStore,n=t.example.includes("["),o=r.allTrue(n,function(e){return r.match(/\[([A-Za-z\.\]\[])*/g,e).filter(e=>e.includes(".")).length>0}(t.example)),s=t.example.split(" ").map(e=>r.test(/\[.*\]/,e)?a.questionListBee(e,o):e);return i.questionReady(s)};t.initQuestionEpic=((e,t)=>e.ofType(o.LESSON_NEXT).filter(()=>(e=>e.getState().lessonStore.currentStep.example)(t)).map(()=>s(t)))},"6lbV":
/*!********************************************!*\
  !*** ./src/learning_meme/styled/input.tsx ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/input */"XJKb");t.InputContainer=r.default(o.CenteredItem)`
  grid-area: input;
`,t.Input=r.default(i.InputBase)`
  input{
    width: 70%;
  }
`},"7Xab":
/*!*********************************!*\
  !*** ./src/root/epics/index.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! notify/epic */"MUGr"),o=n(/*! redux-observable */"NOGq"),i=n(/*! ./click */"KN0k"),a=n(/*! ./general */"V/P4"),s=n(/*! ./init */"5E6V"),c=n(/*! ./notify */"Y8OM"),l=n(/*! ./sharedChangeSettings */"hnD8"),u=n(/*! ./sharedSpeak */"dt5O"),d=n(/*! ../../choose_word/epics/ */"HY6S"),p=n(/*! ../../guess_word/epics/ */"3vFA"),E=n(/*! ../../learning_meme/epics/ */"iWvF"),f=n(/*! ../../lesson/epics/ */"RQrR"),h=n(/*! ../../select_article/epics/ */"JDZ+"),g=n(/*! ../../write_sentence/epics/ */"S9pt"),m=n(/*! ./infoEpic */"Gtzr"),_=n(/*! ./sharedAddPoints */"UHcP");t.rootEpic=o.combineEpics(f.lessonEpic,h.selectArticleEpic,m.infoEpic,d.chooseWordEpic,i.clickEpic,a.generalEpic,p.guessWordEpic,s.initEpic,E.learningMemeEpic,c.notifyEpic,r.notifyEpic,_.sharedAddPointsEpic,l.sharedChangeSettingsEpic,u.sharedSpeakEpic,g.writeSentenceEpic)},"7YPl":
/*!*************************************************!*\
  !*** ./src/root/carrier/icons/textToSpeech.tsx ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.textToSpeechPath="m24.1 7.9v24.2q0 0.6-0.4 1t-1 0.5-1-0.5l-7.4-7.4h-5.9q-0.6 0-1-0.4t-0.4-1v-8.6q0-0.6 0.4-1t1-0.4h5.9l7.4-7.4q0.4-0.5 1-0.5t1 0.5 0.4 1z m8.6 12.1q0 1.7-0.9 3.2t-2.5 2q-0.3 0.2-0.6 0.2-0.6 0-1-0.5t-0.4-1q0-0.4 0.2-0.8t0.7-0.5 0.7-0.5 0.7-0.8 0.3-1.3-0.3-1.3-0.7-0.8-0.7-0.5-0.7-0.5-0.2-0.8q0-0.6 0.4-1t1-0.5q0.3 0 0.6 0.2 1.5 0.6 2.5 2t0.9 3.2z"},"7uE1":
/*!******************************!*\
  !*** ./src/root/reducers.ts ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o=n(/*! ../_helpers/getInitialState */"8/XC"),i=n(/*! ./bees/normalizeDatabase */"N6yV"),a=n(/*! ./side_effects/languageChangeClick */"9NNQ"),s=n(/*! ./side_effects/settingsRandom */"y5+H"),c=n(/*! ./side_effects/settingsTextToSpeech */"Gn8X");t.store=function(e=o.getInitialState(),t){switch(t.type){case r.INIT_READY:return Object.assign({},e,{db:i.normalizeDatabaseBee(t.payload.received.rows),ready:!0});case r.LANGUAGE_CHANGE_INIT:return Object.assign({},e,{toggleLanguage:!e.toggleLanguage});case r.LANGUAGE_CHANGE_CLICK:return a.languageChangeClick(t,e);case r.SETTINGS_RANDOM:return s.settingsRandom(t,e);case r.SETTINGS_TEXT_TO_SPEECH:return c.settingsTextToSpeech(t,e);case r.SHARED_ADD_POINTS_READY:return Object.assign({},e,{points:t.payload});case r.SHARED_INIT:return Object.assign({},e,{name:t.payload});default:return e}}},"8/XC":
/*!*****************************************!*\
  !*** ./src/_helpers/getInitialState.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! ../constants */"he5r"),{randomFlag:a,textToSpeechFlag:s,points:c,fromLanguage:l,toLanguage:u}=r.getterAnt(i.defaultState),d={changeLanguage:{roughness:.6,fill:o.darkblue3,fillWeight:2},info:{roughness:.3,fill:o.green,fillWeight:3},next:{roughness:.5,fill:o.darkblue3},random:{roughness:0,active:a},submit:{roughness:.5,fill:o.darkblue3},textToSpeech:{roughness:0,active:s,fillWeight:2}};t.getInitialState=function(){return{fromLanguage:l,instructions:"",logged:!1,name:"",points:c,randomFlag:a,ready:!1,roughData:d,textToSpeechFlag:s,toLanguage:u,toggleLanguage:!1}}},"81cQ":
/*!*******************************************!*\
  !*** ./src/learning_meme/epics/listen.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"1Wps");t.listenEpic=((e,t)=>e.ofType(o.LEARNING_MEME_LISTEN).switchMap(e=>new r.Observable(n=>{const{listen:r,inputState:o}=t.getState().learningMemeStore;"ENTER"===e.payload&&r?n.next(i.check(o.trim())):r?n.next(i.setInput(e.payload)):n.next(i.next()),n.complete()})))},"8GXq":
/*!*****************************************!*\
  !*** ./src/_helpers/convertToBase64.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertToBase64=function(e){return new Promise(t=>{const n=new XMLHttpRequest;n.onload=(()=>{const e=new FileReader;e.onloadend=(()=>{t(e.result)}),e.readAsDataURL(n.response)}),n.open("GET",e),n.responseType="blob",n.send()})}},"8Qhz":
/*!********************************!*\
  !*** ./src/lesson/reducers.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../_helpers/getNextIndex */"noCf"),o=n(/*! ../constants */"he5r"),i={currentIndex:0,currentStep:{},isExample:!1,ready:!1,showQuestion:!1,steps:[]};t.lessonStore=function(e=i,t){const n={index:0};switch(t.type){case o.LESSON_SELECT:return Object.assign({},e,{question:t.payload});case o.LESSON_QUESTION_READY:return Object.assign({},e,{showQuestion:!0,question:t.payload});case o.LESSON_NEXT:return n.index=r.getNextIndex({length:e.steps.length,index:e.currentIndex}),Object.assign({},e,{showQuestion:!1,currentIndex:n.index,currentStep:e.steps[n.index]});case o.LESSON_INIT_READY:return Object.assign({},e,{ready:!0,currentStep:t.payload[0],steps:t.payload});default:return e}}},"8yuS":
/*!****************************************!*\
  !*** ./src/ants/mini/createElement.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createElementAnt=function(e){const t=document.createElement("div");t.setAttribute("id",e),document.body.appendChild(t)}},"9NNQ":
/*!******************************************************!*\
  !*** ./src/root/side_effects/languageChangeClick.ts ***!
  \******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.languageChangeClick=function(e,t){return r.setter("fromLanguage",e.payload.from),r.setter("toLanguage",e.payload.to),Object.assign({},t,{fromLanguage:e.payload.from,toLanguage:e.payload.to,toggleLanguage:!t.toggleLanguage})}},B3gl:
/*!************************************!*\
  !*** ./src/root/carrier/style.css ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){var r=n(/*! !../../../node_modules/css-loader!./style.css */"bVGQ");"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(/*! ../../../node_modules/style-loader/lib/addStyles.js */"aET+")(r,o);r.locals&&(e.exports=r.locals)},BtHC:
/*!*******************************************!*\
  !*** ./src/guess_word/styled/related.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"M5ZK");t.RelatedContainer=o.default(i.CenteredItem)`
  height: ${2*a.frHeight}vh;
  grid-area: gw_related;
  outline: dashed ${r.teal2};
`,t.Related=o.default(a.Text)`
  text-align:center;
  font-weight: 600;
  color: ${r.grey4};
`},BtT8:
/*!***********************************************!*\
  !*** ./src/learning_meme/auto_mode/isNext.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=["nächste","tschüss","next","следващ"];t.isNext=function(e){return r.includes(e)}},"C+yF":
/*!*******************************************!*\
  !*** ./src/choose_word/epics/keypress.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"MdxE"),s=n(/*! ../actions */"MdxE");t.keypressEpic=((e,t)=>{const n=o.Observable.fromEvent(document,"keydown"),c=e.ofType(i.CHOOSE_WORD_NEXT_READY);return n.withLatestFrom(c).concatMap(([e,n])=>new o.Observable(n=>{const o=t.getState().chooseWordStore.listen,i=e.code;o||n.next(s.next());const c=!!(i.startsWith("Arrow")&&o)&&r.replace("Arrow","",i).toUpperCase();!1!==c&&n.next(a.check(c)),n.complete()}))})},CIU0:
/*!****************************************!*\
  !*** ./src/root/carrier/component.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ./icons/changeLanguage */"N6ga"),i=n(/*! ./icons/info */"IaSr"),a=n(/*! ./icons/next */"O4Tl"),s=n(/*! ./icons/random */"Y6KQ"),c=n(/*! ./icons/submit */"Fu44"),l=n(/*! ./icons/textToSpeech */"7YPl"),u=n(/*! ./styled/grid */"2B74"),d=u.createIconCell("info"),p=u.createIconCell("random"),E=u.createIconCell("changelanguage",!1),f=u.createIconCell("submit"),h=u.createIconCell("next"),g=u.createIconCell("texttospeech"),m=n(/*! colors */"dBCm"),_=n(/*! rambdax */"Ex95"),S=n(/*! react */"q1tI"),v=n(/*! react-redux */"/MKj"),T=n(/*! roughjs */"kfwI"),C=n(/*! ../navigation/styled/logo */"gdWI"),O=n(/*! ./languages */"VNSz"),N={changeLanguagePath:o.changeLanguagePath,infoPath:i.infoPath,nextPath:a.nextPath,randomPath:s.randomPath,submitPath:c.submitPath,textToSpeechPath:l.textToSpeechPath};class I extends S.Component{constructor(e){super(e),this.paint=this.paint.bind(this),this.singlePaint=this.singlePaint.bind(this)}singlePaint(e,t){const n=this.props.store.roughData[e],o=document.getElementById(`icon_${e.toLowerCase()}`);if(null===o)return;const i=T.default.canvas(o);t&&(n.active=!n.active);const a=_.defaultTo(.7,n.roughness),s=_.defaultTo(1,n.fillWeight),c=_.ifElse(_.isNil,()=>n.active?r.ICON_ACTIVE:r.ICON_PASSIVE,_.identity)(n.fill),l=N[`${e}Path`],u=m.dark6;i.path(l,{roughness:a,fill:c,fillWeight:s,stroke:u})}paint(){Object.keys(this.props.store.roughData).map(e=>this.singlePaint(e))}shouldComponentUpdate(e){return this.props.store.roughData.random.active!==e.store.roughData.random.active?this.singlePaint("random",!0):this.props.store.roughData.textToSpeech.active!==e.store.roughData.textToSpeech.active&&this.singlePaint("textToSpeech",!0),!0}componentDidMount(){this.paint()}render(){const e=this.props.store.fromLanguage,t=this.props.store.toLanguage;return S.createElement(u.Container,null,S.createElement(u.LogoCell,null,S.createElement(C.Logo,{id:"toggle-navigation"})),S.createElement(d.outer,null,S.createElement(d.inner,null)),S.createElement(E.outer,null,S.createElement(E.inner,null),this.props.store.toggleLanguage&&S.createElement(O.LanguagesComponent,{dispatch:this.props.dispatch,currentPair:`${e}${r.LANGUAGE_SEPARATOR}${t}`})),S.createElement(p.outer,null,S.createElement(p.inner,null)),S.createElement(g.outer,null,S.createElement(g.inner,null)),S.createElement(f.outer,null,S.createElement(f.inner,null)),S.createElement(h.outer,null,S.createElement(h.inner,null)),S.createElement(u.Points,{id:"points"},this.props.store.points))}}t.Carrier=I;t.CarrierWrapped=v.connect(({store:e})=>({store:e}))(I)},ChWf:
/*!***********************************!*\
  !*** ./src/lesson/epics/click.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../constants */"he5r");t.clickEpic=((e,t)=>e.ofType(o.LESSON_CLICK).map(({payload:e})=>(function(e,t){const{selection:n,i}=e,a=t.getState().lessonStore,s=a.question[e.i].map(e=>n===e.text?Object.assign({},e,{status:e.correct?"CORRECT":"WRONG"}):Object.assign({},e,{status:e.correct?"CORRECT":"INACTIVE"})),c=r.update(i,s,a.question);return{type:o.LESSON_SELECT,payload:c}})(e,t)))},DYMH:
/*!*************************************************!*\
  !*** ./src/write_sentence/bees/acceptSpeech.ts ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! ../actions */"o/T1"),a=n(/*! ../../ants/mini/normalizeLanguage */"07J5"),s=700;t.acceptSpeechBee=function(e){const t=r.getter("fromLanguage"),n=new webkitSpeechRecognition,c=e=>{e.error&&console.warn("ACCEPT_SPEECH"),n.stop(),o.delay(s).then(()=>n.start())};n.lang=a.normalizeLanguageAnt(t),n.interimResults=!1,n.continious=!0,n.maxAlternatives=1,n.onerror=c,n.onresult=function(t){const n=t.results[0][0].transcript;e(i.mic(n))},n.onspeechend=c,n.start()}},DZED:
/*!*************************************!*\
  !*** ./src/root/carrier/actions.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../../constants */"he5r");t.click=r.createAction(o.LANGUAGE_CHANGE_CLICK)},E2Ve:
/*!***********************************************!*\
  !*** ./src/learning_meme/auto_mode/solved.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.solved=function(){return!document.querySelector("span.fromWord").textContent.includes("_")}},EkVV:
/*!*********************************************!*\
  !*** ./src/write_sentence/styled/input.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/input */"XJKb");t.InputContainer=r.default(o.CenteredItem)`
  grid-area: ws_input;
`,t.Input=i.InputBase},Ep3D:
/*!*********************************************!*\
  !*** ./src/write_sentence/styled/image.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../_styled/image */"+aNb");t.ImageContainer=r.getImageContainer(6,"ws_image"),t.Image=r.ImageBase},F4XW:
/*!*********************************************!*\
  !*** ./src/choose_word/styled/question.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ./grid */"bELT"),a=i.cellHeight/3.15;t.Choice=o.default.div`
  line-height: ${a}vh;
  font-size: ${a/1.5}vh;
  border: ${"2px"} ridge ${r.blue};
  background: ${r.light};
  cursor: pointer;
`,t.QuestionContainer=o.default(i.Row)`
  grid-area: cw_question;
`,t.Question=o.default.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
  text-align: center;
  grid-template-areas: '. choicex .' '. choicey .' '. choicez .'; 
`,t.ChoiceX=o.default(t.Choice)`
  grid-area: choicex;
`,t.ChoiceY=o.default(t.Choice)`
  grid-area: choicey;
  background: ${r.light};
`,t.ChoiceZ=o.default(t.Choice)`
  grid-area: choicez;
  background: ${r.light};
`},FGAa:
/*!***************************************!*\
  !*** ./src/choose_word/component.tsx ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"MdxE"),a=n(/*! ./chooseWord */"edGR");class s extends r.Component{componentDidMount(){this.props.dispatch(i.init())}render(){return r.createElement("div",null,this.props.chooseWordStore.ready&&r.createElement(a.ChooseWord,Object.assign({},this.props)))}}t.ChooseWordComponent=s;t.ChooseWordWrapped=o.connect(({chooseWordStore:e})=>({chooseWordStore:e}))(s)},FWz5:
/*!***************************!*\
  !*** ./src/bees/speak.ts ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=window.speechSynthesis,i=new SpeechSynthesisUtterance,a={lang:"en-US",rate:.85,volume:1,pitch:.9},s=Object.assign({},a,{rate:.8,lang:"de-DE"});t.speakBee=function(e){return new Promise(t=>{const n=function(e){return r.maybe("EN"===e.language,a,"DE"===e.language&&s)}(e);if(!1===n)return t();"EN"===e.language&&function(e){const[t]=speechSynthesis.getVoices().filter(e=>"Google UK English Female"===e.voiceURI);t&&(e.voice=t)}(i),i.lang=n.lang,i.pitch=n.pitch,i.rate=n.rate,i.text=e.text,i.volume=n.volume,o.speak(i),i.onend=(()=>{t()})})}},Fu44:
/*!*******************************************!*\
  !*** ./src/root/carrier/icons/submit.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.submitPath="m39.4 0.2q0.7 0.6 0.6 1.5l-5.7 34.3q-0.1 0.6-0.7 1-0.4 0.1-0.7 0.1-0.3 0-0.6-0.1l-10.1-4.1-5.4 6.6q-0.4 0.5-1.1 0.5-0.3 0-0.5-0.1-0.4-0.1-0.7-0.5t-0.2-0.8v-7.8l19.3-23.7-23.9 20.7-8.8-3.6q-0.8-0.3-0.9-1.3 0-0.8 0.7-1.3l37.2-21.4q0.3-0.2 0.7-0.2 0.4 0 0.8 0.2z"},"GX+t":
/*!********************************************!*\
  !*** ./src/select_article/styled/grid.tsx ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),{getFraction:i}=o.fractionGetters(18,0);t.frHeight=i(1),t.Container=r.default(o.ContainerBase)`
  grid-template-columns: 1fr;
  grid-template-rows: 10fr 1fr 7fr;
  grid-template-areas: "sa_words"
  "sa_translation"
  "sa_image"; 
`},GfLB:
/*!***********************************************!*\
  !*** ./src/learning_meme/styled/sentence.tsx ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"P2/E");t.SentenceContainer=o.default(i.CenteredItem)`
  grid-area: sentence;
`,t.Sentence=o.default(a.Text)`
  color: ${r.dark7};
  padding-top: 0px;
`},Gn8X:
/*!*******************************************************!*\
  !*** ./src/root/side_effects/settingsTextToSpeech.ts ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.settingsTextToSpeech=function(e,t){const n=!t.textToSpeechFlag,r=Object.assign({},t.roughData,{textToSpeech:Object.assign({},t.roughData.textToSpeech,{active:n})});return Object.assign({},t,{roughData:r,textToSpeechFlag:n})}},Gtzr:
/*!************************************!*\
  !*** ./src/root/epics/infoEpic.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! driver.js */"wkzA"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),a=n(/*! ../../_helpers/infoSteps */"mi1x"),s=n(/*! ../../constants */"he5r");function c(e){const t=i.words(e.payload).map(o.head).map(o.toLower).join(""),n=a.infoSteps(t);if(void 0===n)return;const s=new r({animate:!0,opacity:.85});s.defineSteps(n),s.start()}t.infoEpic=((e,t)=>e.ofType(s.INFO).do(c).map(()=>({type:"infoEpic@IGNORE"})))},HY6S:
/*!****************************************!*\
  !*** ./src/choose_word/epics/index.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"2py+"),i=n(/*! ./click */"yU31"),a=n(/*! ./init */"rC4W"),s=n(/*! ./initReady */"5/+n"),c=n(/*! ./keypress */"C+yF"),l=n(/*! ./next */"k+nP"),u=n(/*! ./step */"qysT");t.chooseWordEpic=r.combineEpics(o.checkEpic,i.clickEpic,a.initEpic,s.initReadyEpic,c.keypressEpic,l.nextEpic,u.stepEpic)},HrOy:
/*!***************************************!*\
  !*** ./src/learning_meme/reducers.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o=n(/*! ../constants */"he5r"),i={convertedImage:!1,currentIndex:-1,inputState:"",listen:!1,question:"",ready:!1,sentence:{hidden:"",visible:""}};t.learningMemeStore=function(e=i,t){switch(t.type){case o.LEARNING_MEME_INIT_READY:return Object.assign({},e,{currentIndex:-1,db:t.payload});case o.LEARNING_MEME_READY:return Object.assign({},e,{ready:!0});case o.LEARNING_MEME_STOP:return Object.assign({},e,{listen:!1});case o.LEARNING_MEME_SET_INPUT:return Object.assign({},e,{inputState:t.payload});case r.LEARNING_MEME_NEXT_READY:return Object.assign({},e,{inputState:"",listen:!0,ready:!0},t.payload);case o.LEARNING_MEME_UNMOUNT:return Object.assign({},e,i);default:return e}}},IUHU:
/*!******************************************!*\
  !*** ./src/_helpers/instanceDatabase.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");n(/*! ../ants/mini/putAhead */"LqNq");t.instanceDatabase=function(e,t,n){return e?r.shuffle(t):t}},IaSr:
/*!*****************************************!*\
  !*** ./src/root/carrier/icons/info.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.infoPath="m27.3 30v2.9q0 0.5-0.4 1t-1 0.4h-11.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h1.5v-8.6h-1.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h8.6q0.6 0 1 0.4t0.4 1v12.9h1.5q0.5 0 1 0.4t0.4 1z m-2.9-25.7v4.3q0 0.6-0.4 1t-1 0.4h-5.7q-0.6 0-1-0.4t-0.4-1v-4.3q0-0.6 0.4-1t1-0.4h5.7q0.6 0 1 0.4t0.4 1z"},Iw3z:
/*!*******************************************!*\
  !*** ./src/select_article/epics/check.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"WVUV");function a(e){const{wordList:t}=e.getState().selectArticleStore.currentInstance;let n=!1;return{newWordList:t.map(e=>{const t="object"==typeof e&&e.solved;if("string"==typeof e||t)return e;n=!0;const r=e.articleSet.map(t=>{const n=t.value===e.correct?"CORRECT":"WRONG";return Object.assign({},t,{status:n})});return Object.assign({},e,{solved:!0,articleSet:r})}),changed:n}}t.checkEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_CHECK).filter(()=>a(t).changed).switchMap(e=>new r.Observable(e=>{e.next(i.clickReady(a(t).newWordList)),e.next(i.stop()),e.complete()})))},"JDZ+":
/*!*******************************************!*\
  !*** ./src/select_article/epics/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"Iw3z"),i=n(/*! ./click */"hKQu"),a=n(/*! ./initEpic */"sTV3"),s=n(/*! ./initReady */"XV4b"),c=n(/*! ./next */"Xydr"),l=n(/*! ./stop */"/I9d");t.selectArticleEpic=r.combineEpics(o.checkEpic,l.stopEpic,i.clickEpic,c.nextEpic,s.initReadyEpic,a.initEpic)},Jn2w:
/*!**********************************************!*\
  !*** ./src/select_article/styled/select.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ./grid */"GX+t"),a=10*i.frHeight,s=a/7;t.SelectContainer=o.default.ul`
  display:inline-block;
  height: ${a}vh;
  list-style-type: none;
  margin: 0 10px;
  min-width: 7vw;
  li.selectable_correct{
    color: ${r.light3};
    background: ${r.green3};
  }
  li.selectable_wrong{
    color: ${r.light3};
    background: ${r.red7};    
  }
  li.selectable_inactive{
    color: ${r.light3};
    background: ${r.blue7};    
  }
`,t.Select=o.default.li`
  background: ${r.light};
  cursor: pointer;
  height: ${s}vh;
  line-height: ${s}vh;
  font-size: ${s/2}vh;
  margin-top: ${.07*i.frHeight}vh;
  outline: double ${r.blue};
  text-align: center;
  transition: background 0.12s ease-in;

  &:hover{
    background: ${r.navy4};
  }
`},JqQx:
/*!*******************************************!*\
  !*** ./src/select_article/ants/filter.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=r.flip(r.includes),i=n(/*! string-fn */"DOxJ"),a=["das","dem","den","der","des","die"],s=["als","ob","obwohl","trotzdem","weil","wenn"],c=["ein","eine","einem","einen","einer","eines"],l=["mein","meine","meinem","meinen","meiner","meines"],u=["dein","deine","deinem","deinen","deiner","deines"],d=["sein","seine","seinem","seinen","seiner","seines"],p=["ihr","ihre","ihrem","ihren","ihrer","ihres"],E=["unser","unsere","unserem","unseren","unserer","unseres"],f=["euer","eurem","euren","eurer","eurere","eures"];t.whichArticleSet=function(e){return r.switcher(e).is(o(a),a).is(o(u),u).is(o(c),c).is(o(p),p).is(o(l),l).is(o(d),d).is(o(E),E).is(o(f),f).default(s)},t.allArticles=[...a,...c,...l,...u,...d,...p,...E,...f,...s],t.filterAnt=function(e){return e.filter(r.has("dePart")).filter(e=>(function(e){return i.wordsX(e).map(r.toLower).reduce((e,n)=>t.allArticles.includes(n)?e+1:e,0)})(e.dePart)>1)}},Jwh9:
/*!*******************************************!*\
  !*** ./src/write_sentence/answerList.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! react */"q1tI"),i=n(/*! ./styled/answer */"bjKX");t.AnswerList=function(e){const{okCorrect:t,question:n,index:a}=e;return o.createElement(o.Fragment,null,n.map((e,n)=>{const s=r.maybe(n<a,t[n]?i.AnswerVisible:i.AnswerVisibleWrong,i.AnswerHidden);return o.createElement(s,{key:`ws-answer-${n}`},e.hidden)}))}},KN0k:
/*!*********************************!*\
  !*** ./src/root/epics/click.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r");const a=2;t.clickEpic=((e,t)=>o.Observable.fromEvent(document,"click").switchMap(e=>new o.Observable(n=>{const o="CANVAS"===e.srcElement.nodeName,s=e.path.length>=a||o?function(e){let t="";for(const n of r.range(0,a+1))e.path[n].id&&(t=e.path[n].id);return t}(e):"",{name:c}=t.getState().store,l=function(e,t){switch(e){case"icon_changelanguage":return{type:i.LANGUAGE_CHANGE_INIT};case"toggle-navigation":return{type:i.NAVIGATION_TOGGLE};case"icon_info":return{type:i.INFO,payload:t};case"icon_next":return{type:`${t}@NEXT`};case"icon_submit":return{type:`${t}@CHECK`};case"icon_random":return{type:i.SETTINGS_RANDOM};case"icon_texttospeech":return{type:i.SETTINGS_TEXT_TO_SPEECH};default:return!1}}(s,c);if(!1===l)return n.complete();n.next(l),n.complete()})))},KZC7:
/*!*********************************************!*\
  !*** ./src/write_sentence/ants/lastWord.ts ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lastWordAnt=function(){const e=document.getElementById("ws_answer");if(null===e)return window.location.reload(!1);const t=e.querySelectorAll("span:last-child")[0];return"visible"===window.getComputedStyle(t).visibility}},LHni:
/*!*************************************!*\
  !*** ./src/bees/sharedNextReady.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! string-fn */"DOxJ");t.sharedNextReadyBee=(e=>{if(r.getter("reset"))return function(){r.setter("id",null);const[e]=window.location.href.split("?reset");window.location.href=e}();const t=o.kebabCase(e.altTag);console.log(t),r.setter("id",t)})},LqNq:
/*!***********************************!*\
  !*** ./src/ants/mini/putAhead.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.putAheadAnt=function(e,t){if(t<1)return e;const[n,r]=[e[0],e[t]];return e[0]=r,e[t]=n,e}},M5ZK:
/*!****************************************!*\
  !*** ./src/guess_word/styled/grid.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! styled-components */"vOnD"),a=n(/*! ../../_styled/grid */"ZPtv");t.Container=i.default(a.ContainerBase)`
  display: grid;
  grid-template-columns: 1fr 12fr 1fr;
  grid-template-rows: 1fr 1fr 2fr 1fr 5fr 1fr;
  grid-row-gap: 1vh;
  grid-template-areas: ". gw_input ."
  ". gw_word ." 
  ". gw_related ." 
  ". gw_sentence ." 
  ". gw_image ." 
  ". gw_translated .";
`,t.getFraction=a.fractionGetters(11,5).getFraction,t.frHeight=t.getFraction(1),t.Text=i.default.div`
  height: ${1*t.frHeight}vh;
  padding-top: ${.15*t.frHeight}vh;
  line-height: ${.7*t.frHeight}vh;
  font-size: ${.35*t.frHeight}vh;
  width: 100%;
`,t.CTextContainer=function(e){return i.default(a.CenteredItem)`
  height: ${1*t.frHeight}vh;
  grid-area: ${e};
`},t.CText=function(e){const n=o.defaultTo(r.dark3,e.color);return i.default(t.Text)`
  font-weight: ${o.defaultTo(!1,e.bold)?600:400};
  color: ${n};
`}},MLjJ:
/*!************************************************!*\
  !*** ./src/write_sentence/styled/question.tsx ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv");t.QuestionContainer=o.default(i.CenteredItem)`
  width: 100%;
  grid-area: ws_question;
`,t.QuestionBase=`\n  color: ${r.dark2};\n  letter-spacing: 0.1em;   \n`,t.QuestionActive=o.default.span`
  margin: 7px;
  box-shadow: 
  0.3vh 0.3vh 0.1vh 0.1vh ${r.lightblue4},
  -0.3vh 0.3vh 0.1vh 0.1vh ${r.lightblue4};
  padding: 0.5vh;
`,t.QuestionVisible=o.default.span`
  margin: 7px;
  padding: 0.5vh;
  box-shadow: -0.3vh -0.3vh 0.8vh 0.5vh ${i.background};
  visibility: visible;
`,t.QuestionHidden=o.default(t.QuestionVisible)`
  margin: 7px;
  visibility: hidden;
`},MdxE:
/*!************************************!*\
  !*** ./src/choose_word/actions.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.CHOOSE_WORD_CHECK),t.click=r.createAction(o.CHOOSE_WORD_CLICK),t.init=r.createAction(o.CHOOSE_WORD_INIT),t.initReady=r.createAction(o.CHOOSE_WORD_INIT_READY),t.incIndex=r.createAction(o.CHOOSE_WORD_INC_INDEX),t.incPoints=r.createAction(o.CHOOSE_WORD_INC_POINTS),t.next=r.createAction(o.CHOOSE_WORD_NEXT),t.nextReady=r.createAction(o.CHOOSE_WORD_NEXT_READY),t.show=r.createAction(o.CHOOSE_WORD_SHOW),t.step=r.createAction(o.CHOOSE_WORD_STEP),t.stop=r.createAction(o.CHOOSE_WORD_STOP)},N6ga:
/*!***************************************************!*\
  !*** ./src/root/carrier/icons/changeLanguage.tsx ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.changeLanguagePath="m36.7 23.6q0 0.1 0 0.1-1.4 6-6 9.7t-10.6 3.7q-3.3 0-6.4-1.2t-5.4-3.5l-2.9 2.9q-0.4 0.4-1 0.4t-1-0.4-0.4-1v-10q0-0.6 0.4-1t1-0.4h10q0.6 0 1 0.4t0.5 1-0.5 1l-3 3q1.6 1.5 3.6 2.3t4.1 0.8q3 0 5.6-1.4t4.2-4q0.2-0.4 1.2-2.6 0.1-0.5 0.6-0.5h4.3q0.3 0 0.5 0.2t0.2 0.5z m0.6-17.9v10q0 0.6-0.4 1t-1 0.4h-10q-0.6 0-1-0.4t-0.5-1 0.5-1l3-3.1q-3.3-3-7.8-3-2.9 0-5.5 1.4t-4.2 4q-0.2 0.4-1.2 2.6-0.2 0.5-0.6 0.5h-4.5q-0.3 0-0.5-0.2t-0.2-0.5v-0.1q1.5-6 6-9.7t10.7-3.7q3.3 0 6.4 1.2t5.4 3.5l3-2.9q0.4-0.4 1-0.4t1 0.4 0.4 1z"},N6yV:
/*!********************************************!*\
  !*** ./src/root/bees/normalizeDatabase.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=2;t.normalizeDatabaseBee=function(e){const t=r.pluck("doc",e);return r.filter(e=>{const t=function(e){return t=>"string"==typeof e[t]&&e[t].length>o}(e);return r.allTrue(t("dePart"),t("deWord"),t("enPart"),t("enPart"),t("imageSrc"))},t)}},NDrd:
/*!***********************************!*\
  !*** ./src/_helpers/selectors.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! reselect */"G4qV"),o=e=>e.fromLanguage,i=e=>e.toLanguage,a=r.createSelector(o,i,(e,t)=>({fromLanguage:e,toLanguage:t}));t.commonSelector=r.createSelector(o,e=>e.name,e=>e.randomFlag,e=>e.textToSpeechFlag,i,(e,t,n,r,o)=>({fromLanguage:e,name:t,randomFlag:n,textToSpeechFlag:r,toLanguage:o})),t.storeSelector=r.createSelector(e=>e.getState().store,e=>e),t.getLanguagePair=(e=>a(t.storeSelector(e))),t.getCommons=(e=>t.commonSelector(e.getState().store))},O39Z:
/*!******************************************!*\
  !*** ./src/learning_meme/epics/check.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/selectors */"NDrd"),a=n(/*! ../../constants */"he5r"),s=n(/*! ../../root/actions */"X9xb"),c=n(/*! ../actions */"1Wps");t.checkEpic=((e,t)=>e.ofType(a.LEARNING_MEME_CHECK).switchMap(e=>new r.Observable(e=>{const{textToSpeechFlag:n,fromLanguage:r}=i.getCommons(t),{currentInstance:l,inputState:u}=t.getState().learningMemeStore,d=function(e){return e.trim().length>0?e.trim():document.getElementsByTagName("input")[0].value.trim()}(u);("DE"===r?o.distanceGerman:o.distance)(d,l.fromWord)<=1&&e.next(s.sharedAddPoints(1)),e.next(c.stop()),n&&e.next({type:a.SHARED_SPEAK,payload:"fromPart"}),e.complete()})))},O4Tl:
/*!*****************************************!*\
  !*** ./src/root/carrier/icons/next.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.nextPath="m9.5 36.9q-0.4 0.4-0.7 0.2t-0.3-0.7v-32.8q0-0.6 0.3-0.7t0.7 0.2l15.9 15.9q0.1 0.2 0.2 0.4v-15.1q0-0.6 0.5-1t1-0.4h2.8q0.6 0 1 0.4t0.5 1v31.4q0 0.6-0.5 1t-1 0.4h-2.8q-0.6 0-1-0.4t-0.5-1v-15.1q-0.1 0.2-0.2 0.4z"},OJQa:
/*!*************************************!*\
  !*** ./src/choose_word/reducers.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o={correctAnswer:[],currentIndex:-1,index:0,listen:!1,localPoints:0,question:[[]],ready:!1};t.chooseWordStore=function(e=o,t){switch(t.type){case r.CHOOSE_WORD_INIT_READY:return Object.assign({},e,{db:t.payload.db,fillerWords:t.payload.fillerWords});case r.CHOOSE_WORD_NEXT_READY:return Object.assign({},e,t.payload,{index:0,listen:!0,localPoints:0,ready:!0});case r.CHOOSE_WORD_INC_INDEX:return Object.assign({},e,{index:e.index+1});case r.CHOOSE_WORD_INC_POINTS:return Object.assign({},e,{localPoints:e.localPoints+1});case r.CHOOSE_WORD_STOP:return Object.assign({},e,{index:e.index+1,listen:!1,question:[[]]});case r.CHOOSE_WORD_UNMOUNT:return Object.assign({},e,o);default:return e}}},OOwW:
/*!*****************************************************!*\
  !*** ./src/learning_meme/auto_mode/acceptSpeech.ts ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! ./click */"OcPR"),a=n(/*! ./isNext */"BtT8"),s=n(/*! ../../ants/mini/normalizeLanguage */"07J5"),c=n(/*! ./solved */"E2Ve"),l=700,u=1433;let d;async function p(e){const t=e.results[0][0].transcript;if(a.isNext(t))return i.click("next");const n=document.getElementsByTagName("input");c.solved()||(n[0].value=t,await o.delay(d),i.click("submit"),d!==u&&(await o.delay(2*d),i.click("next")))}t.acceptSpeech=function(){const e=r.getter("fromLanguage"),t=new webkitSpeechRecognition;d=o.defaultTo(u,1e3*r.getter("pause"));const n=e=>{e.error&&console.warn("ACCEPT_SPEECH"),t.stop(),o.delay(l).then(()=>t.start())};t.lang=s.normalizeLanguageAnt(e),t.interimResults=!1,t.continious=!0,t.maxAlternatives=1,t.onerror=n,t.onresult=p,t.onspeechend=n,t.start()}},OcPR:
/*!**********************************************!*\
  !*** ./src/learning_meme/auto_mode/click.ts ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.click=function(e){document.getElementById(`icon_${e}`).click()}},"P2/E":
/*!*******************************************!*\
  !*** ./src/learning_meme/styled/grid.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv");t.Text=o.default.div`
  padding-top: ${.3*i.height}vh;
  line-height: ${.5*i.height}vh;
  font-size: ${.43*i.height}vh;
  width: 100%;
`,t.Container=o.default(i.ContainerBase)`
  grid-template-columns: 1fr 12fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 4fr 1fr;
  grid-template-areas: ". input ."
  ". question ." 
  ". sentence ." 
  ". image ." 
  ". translation .";
  
  span.fromWord {
    color: ${r.blue6};
  }
  span.toWord {
    margin-left: 1vw;
    color: ${r.pink};
  }
`},QH2t:
/*!***************************************!*\
  !*** ./src/guess_word/epics/check.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/selectors */"NDrd"),a=n(/*! ../../constants */"he5r"),s=n(/*! ../../root/actions */"X9xb"),c=n(/*! ../actions */"0Yy6");t.checkEpic=((e,t)=>e.ofType(a.GUESS_WORD_CHECK).switchMap(e=>new r.Observable(e=>{const{textToSpeechFlag:n,fromLanguage:r}=i.getCommons(t),{wordAnswer:l,listen:u,inputState:d}=t.getState().guessWordStore;if(!u)return e.next(c.next()),e.complete();("DE"===r?o.distanceGerman:o.distance)(d.toLowerCase().trim(),l.toLowerCase())<=2&&e.next(s.sharedAddPoints(1)),e.next(c.stop()),n&&e.next({type:a.SHARED_SPEAK,payload:"fromPart"}),e.complete()})))},Qbxv:
/*!**************************************************!*\
  !*** ./src/learning_meme/styled/translation.tsx ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"P2/E");t.TranslationContainer=o.default(i.CenteredItem)`
  grid-area: translation;
`,t.Translation=o.default(a.Text)`
  color: ${r.darkblue7};
`},RQrR:
/*!***********************************!*\
  !*** ./src/lesson/epics/index.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./click */"ChWf"),i=n(/*! ./init */"Xnku"),a=n(/*! ./initQuestion */"6QGu");t.lessonEpic=r.combineEpics(a.initQuestionEpic,o.clickEpic,i.initEpic)},S9pt:
/*!*******************************************!*\
  !*** ./src/write_sentence/epics/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"luEA"),i=n(/*! ./init */"mmTX"),a=n(/*! ./initReady */"prBy"),s=n(/*! ./listen */"4MmZ"),c=n(/*! ./mic */"V27M"),l=n(/*! ./next */"Yr0F"),u=n(/*! ./step */"reJz");t.writeSentenceEpic=r.combineEpics(o.checkEpic,c.micEpic,i.initEpic,a.initReadyEpic,s.listenEpic,l.nextEpic,u.stepEpic)},UHcP:
/*!*******************************************!*\
  !*** ./src/root/epics/sharedAddPoints.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! rambdax */"Ex95"),a=n(/*! rxjs/Observable */"4c1C"),s=n(/*! ../../constants */"he5r"),c=n(/*! ../actions */"X9xb"),l=700,u={"animation-timing-function":"cubic-bezier(0.42, 0, 0.58, 1)",color:o.pink,opacity:.77,transform:"scale3d(1.18, 1.18, 1.18)"},d={"animation-timing-function":"cubic-bezier(0.42, 0, 0.58, 1)",color:o.pink6,opacity:.6,transform:"scale3d(0.97, 0.97, 0.97)"},p=Object.assign({},u,{transform:"scale3d(1.03, 1.03, 1.03)"}),E={"animation-timing-function":"cubic-bezier(0.25, 0.46, 0.45, 0.94)",color:o.navy,opacity:1,transform:"scale3d(1, 1, 1)"},f=[E,u,d,p,E];t.sharedAddPointsEpic=((e,t)=>e.ofType(s.SHARED_ADD_POINTS).switchMap(e=>new a.Observable(n=>{const{points:o,logged:a}=t.getState().store,s=o+Number(e.payload);a||r.setter("points",s),document.getElementById("points").animate(f,{direction:"normal",duration:l,easing:"ease-in",iterations:1}),i.delay(l/2).then(()=>{n.next(c.sharedAddPointsReady(s)),n.complete()})})))},"V/P4":
/*!***********************************!*\
  !*** ./src/root/epics/general.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),a=n(/*! ../../constants */"he5r"),s=o.replace("@INIT","");const c=[r.LANGUAGE_CHANGE_CLICK,r.ROUTER_CHANGE,r.LEARNING_MEME_INIT,a.LESSON_INIT,r.WRITE_SENTENCE_INIT,a.SELECT_ARTICLE_INIT,r.GUESS_WORD_INIT,r.CHOOSE_WORD_INIT];t.generalEpic=((e,t)=>e.ofType(...c).map(e=>(function(e,t){switch(e.type){case r.LANGUAGE_CHANGE_CLICK:return{type:`${i.camelCase(t.getState().store.name)}@INIT`};case r.ROUTER_CHANGE:return{type:`${i.camelCase(t.getState().store.name)}@UNMOUNT`};default:return{type:r.SHARED_INIT,payload:s(e.type)}}})(e,t)))},V27M:
/*!*****************************************!*\
  !*** ./src/write_sentence/epics/mic.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../constants */"he5r"),a=n(/*! rambdax */"Ex95"),s=n(/*! ../../root/actions */"X9xb"),c=n(/*! ../actions */"o/T1"),l=n(/*! ../../_helpers/selectors */"NDrd"),u=e=>t=>t>e;t.micEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_MIC).filter(()=>(e=>e.getState().writeSentenceStore.listen)(t)).switchMap(e=>new r.Observable(n=>{const r=e.payload,{textToSpeechFlag:i,fromLanguage:d}=l.getCommons(t),p=function(e,t){const n=o.distanceGerman(e,t),r=a.switcher(t.length).is(u(60),1.4).is(u(45),1.3).default(1.15),i=Math.floor(n/r);return a.switcher(i).is(u(20),0).is(u(16),1).is(u(12),2).is(u(9),3).default(13-i)}(r,a.path("writeSentenceStore.currentInstance.fromPart",t.getState()));p>0&&n.next(s.sharedAddPoints(p)),n.next(c.micReady()),n.next(c.notify(r)),i&&n.next(d),n.complete()})))},"VB+0":
/*!***************************************************!*\
  !*** ./src/select_article/styled/translation.tsx ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv");t.TranslationContainer=o.default(i.CenteredItem)`
  grid-area: sa_translation;
  outline: solid ${r.green2};
`,t.Translation=o.default(i.Text)`
  color: ${r.bluegrey7};
`},VNSz:
/*!****************************************!*\
  !*** ./src/root/carrier/languages.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ../../constants */"he5r"),i=n(/*! ./actions */"DZED"),a=n(/*! ./styled/languages */"uXMx");function s({dispatch:e,from:t,to:n,currentPair:a}){const s=`${t}${o.LANGUAGE_SEPARATOR}${n}`,c=s===a?"active_language":"inactive_language";return r.createElement(r.Fragment,null,r.createElement("div",{className:c,onClick:()=>e(i.click({from:t,to:n}))},s))}t.LanguagesComponent=function(e){return r.createElement(r.Fragment,null,r.createElement(a.LanguagesContainer,null,r.createElement(a.Languages,null,r.createElement(s,Object.assign({},e,{from:"DE",to:"EN"})),r.createElement(s,Object.assign({},e,{from:"DE",to:"BG"})),r.createElement(s,Object.assign({},e,{from:"EN",to:"DE"})),r.createElement(s,Object.assign({},e,{from:"EN",to:"BG"})),r.createElement(s,Object.assign({},e,{from:"BG",to:"DE"})),r.createElement(s,Object.assign({},e,{from:"BG",to:"EN"})))))}},Vkj9:
/*!*********************************************!*\
  !*** ./src/select_article/styled/words.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ./grid */"GX+t");t.WordsContainer=r.default.div`
  grid-area: sa_words;
  height: ${6*o.frHeight}vh;
  width: 100%;
  text-align: center;
  span{
    margin: 0 0.4vw;
  }
`},WVUV:
/*!***************************************!*\
  !*** ./src/select_article/actions.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.SELECT_ARTICLE_CHECK),t.stop=r.createAction(o.SELECT_ARTICLE_STOP),t.click=r.createAction(o.SELECT_ARTICLE_CLICK),t.clickReady=r.createAction(o.SELECT_ARTICLE_CLICK_READY),t.init=r.createAction(o.SELECT_ARTICLE_INIT),t.initReady=r.createAction(o.SELECT_ARTICLE_INIT_READY),t.next=r.createAction(o.SELECT_ARTICLE_NEXT),t.nextReady=r.createAction(o.SELECT_ARTICLE_NEXT_READY)},Wlfz:
/*!***********************************************!*\
  !*** ./src/learning_meme/styled/question.tsx ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"P2/E");t.QuestionContainer=o.default(i.CenteredItem)`
  grid-area: question;
`,t.Question=o.default(a.Text)`
  color: ${r.dark2};
  letter-spacing: 0.1em; 
`},X9xb:
/*!*****************************!*\
  !*** ./src/root/actions.ts ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.init=r.createAction(o.INIT),t.notifyInfo=r.createAction("notify@INFO"),t.initReady=r.createAction(o.INIT_READY),t.sharedAddPoints=r.createAction(o.SHARED_ADD_POINTS),t.sharedAddPointsReady=r.createAction(o.SHARED_ADD_POINTS_READY),t.sharedSpeak=r.createAction(o.SHARED_SPEAK),t.sharedSpeakTo=t.sharedSpeak("toPart")},XEOf:
/*!*****************************************!*\
  !*** ./src/guess_word/styled/image.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/image */"+aNb"),a=n(/*! ./grid */"M5ZK");t.ImageContainer=r.default(o.CenteredItem)`
  grid-area: gw_image;
  height: ${5*a.frHeight}vh;
  width: 100%;
`,t.Image=i.ImageBase},XJKb:
/*!*******************************!*\
  !*** ./src/_styled/input.tsx ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ./grid */"ZPtv");t.InputBase=o.default.div`
  padding-top: ${.1*i.height}vh;
  
  input {
    caret-color: ${r.green};
    height: ${.7*i.height}vh;
    font-size: ${.6*i.height}vh;
    text-align: center;
    width: auto;
    box-shadow: 3px 3px 1px ${r.darkblue};
  }
`},XV4b:
/*!***********************************************!*\
  !*** ./src/select_article/epics/initReady.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"WVUV");t.initReadyEpic=((e,t)=>e.ofType(r.SELECT_ARTICLE_INIT_READY).filter(()=>"DE"===t.getState().store.fromLanguage).map(o.next))},XfmU:
/*!**************************!*\
  !*** ./src/bees/post.ts ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postBee=(async(e,t)=>fetch(e,{body:JSON.stringify(t),headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"}))},Xipg:
/*!*************************************!*\
  !*** ./src/ants/mini/getCompose.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux */"fvjX");t.getComposeAnt=function(){return r.compose}},Xnku:
/*!**********************************!*\
  !*** ./src/lesson/epics/init.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"a44Q"),s=n(/*! ../bees/parseLesson */"eJae");async function c(e){const t=r.glue(`\n    https://gl.githack.com\n    dejantoteff\n    lessons\n    raw\n    master\n    ${r.remove("lesson-",e)}.md\n  `,"/"),n=await async function(e){return(await fetch(e,{method:"GET"})).text()}(t);return a.initReady(s.parseLessonBee(n))}t.initEpic=((e,t)=>e.ofType(i.LESSON_INIT).switchMap(({payload:e})=>(e=>o.Observable.fromPromise(c(e)))(e)))},Xydr:
/*!******************************************!*\
  !*** ./src/select_article/epics/next.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! string-fn */"DOxJ"),a=n(/*! ../../_helpers/getNextIndex */"noCf"),s=n(/*! ../../bees/sharedNextReady */"LHni"),c=n(/*! ../../constants */"he5r"),l=n(/*! ../../root/actions */"X9xb"),u=n(/*! ../actions */"WVUV"),d=n(/*! ../ants/filter */"JqQx");t.nextEpic=((e,t)=>e.ofType(c.SELECT_ARTICLE_NEXT).switchMap(()=>new o.Observable(e=>{const{db:n,oldCurrentIndex:o,toLanguage:c,textToSpeechFlag:p}=function(e){const{currentIndex:t,db:n}=e.getState().selectArticleStore,{toLanguage:r,textToSpeechFlag:o}=e.getState().store;return{db:n,oldCurrentIndex:t,toLanguage:r.toLowerCase(),textToSpeechFlag:o}}(t),E=a.getNextIndex({index:o,length:n.length}),f=n[E];s.sharedNextReadyBee(f);const h=f[`${c}Part`],g=f.dePart,m=f.imageSrc;let _=0;const S={wordList:i.wordsX(f.dePart).map(e=>{if(!d.allArticles.includes(e.toLowerCase()))return e;const t=d.whichArticleSet(e.toLowerCase()),n=r.map(e=>({status:"ACTIVE",value:e}),t);return{solved:!1,correct:e.toLowerCase(),articleSet:n,index:_++}}),fromPart:g,toPart:h,imageSrc:m};e.next(u.nextReady({currentInstance:S,currentIndex:E})),p&&"en"===c&&e.next(l.sharedSpeak("toPart")),e.complete()})))},Y6KQ:
/*!*******************************************!*\
  !*** ./src/root/carrier/icons/random.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.randomPath="m14.9 10.7q-1.4 2.1-3.1 6.1-0.5-1-0.8-1.6t-0.9-1.4-1.2-1.3-1.4-0.7-1.8-0.4h-5q-0.3 0-0.5-0.2t-0.2-0.5v-4.3q0-0.3 0.2-0.5t0.5-0.2h5q5.6 0 9.2 5z m25.1 17.9q0 0.3-0.2 0.5l-7.1 7.1q-0.2 0.2-0.6 0.2-0.2 0-0.5-0.2t-0.2-0.5v-4.3q-0.7 0-1.9 0t-1.8 0.1-1.6-0.1-1.6-0.1-1.4-0.2-1.4-0.4-1.3-0.7-1.3-0.8-1.3-1.2-1.2-1.6q1.3-2.1 3-6.1 0.5 1 0.8 1.6t1 1.4 1.1 1.3 1.4 0.8 1.8 0.3h5.7v-4.3q0-0.3 0.2-0.5t0.5-0.2q0.3 0 0.6 0.2l7.1 7.2q0.2 0.2 0.2 0.5z m0-20q0 0.3-0.2 0.5l-7.1 7.1q-0.2 0.2-0.6 0.2-0.2 0-0.5-0.2t-0.2-0.5v-4.3h-5.7q-1.1 0-1.9 0.4t-1.6 1-1.1 1.3-1 1.8q-0.7 1.4-1.7 3.8-0.7 1.5-1.2 2.5t-1.2 2.3-1.4 2.2-1.6 1.9-2.1 1.5-2.3 1-2.9 0.3h-5q-0.3 0-0.5-0.2t-0.2-0.5v-4.3q0-0.3 0.2-0.5t0.5-0.2h5q1.1 0 2-0.3t1.5-1 1.1-1.4 1-1.7q0.8-1.4 1.8-3.8 0.6-1.5 1.1-2.5t1.2-2.4 1.4-2.2 1.7-1.9 2-1.5 2.4-0.9 2.8-0.4h5.7v-4.3q0-0.3 0.2-0.5t0.5-0.2q0.3 0 0.6 0.2l7.1 7.2q0.2 0.2 0.2 0.5z"},Y8OM:
/*!**********************************!*\
  !*** ./src/root/epics/notify.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"X9xb");function i(e){switch(e){case"DE":return"German";case"BG":return"Bulgarian";case"EN":return"English"}}function a(e){switch(e.type){case r.LANGUAGE_CHANGE_CLICK:return o.notifyInfo(function(e){return{message:`Now language direction is from '${i(e.payload.from)}' to '${i(e.payload.to)}'`,ms:1500}}(e))}}const s=[r.LANGUAGE_CHANGE_CLICK];t.notifyEpic=((e,t)=>e.ofType(...s).map(a))},YMUk:
/*!**********************************************!*\
  !*** ./src/select_article/selectArticle.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"WVUV"),i=n(/*! ./styled/grid */"GX+t"),a=n(/*! ./styled/image */"1keb"),s=n(/*! ./styled/select */"Jn2w"),c=n(/*! ./styled/translation */"VB+0"),l=n(/*! ./styled/words */"Vkj9");function u(e){const{article:t,i:n,dispatch:i,listen:a}=e,c=e=>{if(a)return i(o.click({article:t,word:e.target.textContent}));i(o.next())};return r.createElement(s.SelectContainer,null,t.articleSet.map((e,t)=>r.createElement(s.Select,{className:`selectable_${e.status.toLowerCase()}`,key:`${n}_${t}`,onClick:c},e.value)))}t.SelectArticle=class extends r.PureComponent{render(){const{wordList:e,toPart:t,imageSrc:n}=this.props.selectArticleStore.currentInstance;return r.createElement(i.Container,null,r.createElement(l.WordsContainer,null,e.map((e,t)=>"string"==typeof e?r.createElement("span",{key:t},e):r.createElement(u,{i:t,key:t,article:e,dispatch:this.props.dispatch,listen:this.props.selectArticleStore.listen}))),r.createElement(a.ImageContainer,null,r.createElement(a.Image,{src:n})),r.createElement(c.TranslationContainer,null,r.createElement(c.Translation,null,t)))}}},Yr0F:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/next.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! client-helpers */"RQK/"),i=n(/*! rambdax */"Ex95"),a=n(/*! rxjs/Observable */"4c1C"),s=n(/*! string-fn */"DOxJ"),c=n(/*! ../../_helpers/getNextIndex */"noCf"),l=n(/*! ../../bees/sharedNextReady */"LHni"),u=n(/*! ../../root/actions */"X9xb"),d=n(/*! ../actions */"o/T1"),p=n(/*! ../../_helpers/selectors */"NDrd"),E=n(/*! ../../bees/setConvertedImage */"0CO9"),f=n(/*! ../../bees/getConvertedImage */"ekhr");t.nextEpic=((e,t)=>e.ofType(r.WRITE_SENTENCE_NEXT).concatMap(()=>new a.Observable(e=>{const{currentIndex:n,db:a,ready:h}=t.getState().writeSentenceStore,{easy:g,easier:m,easiest:_,random:S}=o.getterAnt(r.urlInputsDefault),{textToSpeechFlag:v}=p.getCommons(t),T=c.getNextIndex({index:n,length:a.length}),C=a[T];l.sharedNextReadyBee(C),E.setConvertedImageBee(C);const O=s.maskSentence({sentence:C.fromPart,easyMode:g,easierMode:m,randomMode:S,charLimit:_?1:4}),N=O.visible.map((e,t)=>({hidden:O.hidden[t],visible:e})),I=Array(N.length).fill(null),b={currentIndex:T,currentInstance:C,okCorrect:I,question:N};e.next(d.setNext(b));const x=h?r.NEXT_TICK:r.SHORT_DELAY;Promise.all([f.getConvertedImageBee(C),i.delay(x)]).then(([t])=>{const n={currentIndex:T,currentInstance:C,okCorrect:I,question:N,convertedImage:t};e.next(d.setNext(n)),e.next({type:r.WRITE_SENTENCE_READY}),v&&e.next(u.sharedSpeakTo),e.complete()})})))},ZPtv:
/*!******************************!*\
  !*** ./src/_styled/grid.tsx ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD");function o(e,n,r){return(t.totalHeight-n)/e*r}t.height=8,t.totalHeight=90,t.background="#b0bec5",t.fractionGetters=function(e,t){return{getFraction:n=>o(e,t,n),getSubFraction:(n,r)=>(function(e,t,n,r){return o(e,t,r)/n})(e,t,n,r)}},t.ContainerBase=r.default.div`
  height: 90vh;
  width: 100vw;    
  display: grid;
`,t.CenteredItem=r.default.div`
  text-align: center;
  height: ${t.height}vh;
`,t.CenteredWithId=(e=>r.default.div.attrs({id:e})`
  text-align: center;
  height: ${t.height}vh;
`),t.Text=r.default.div`
  padding-top: ${.3*t.height}vh;
  line-height: ${.5*t.height}vh;
  font-size: ${.43*t.height}vh;
  width: 100%;
`},ZhGE:
/*!**********************************!*\
  !*** ./src/lesson/component.tsx ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),a=n(/*! react-redux */"/MKj"),s=n(/*! styled-components */"vOnD"),c=n(/*! ./actions */"a44Q"),l=n(/*! ./selectOption */"dGrs"),u=s.default.div`
  display: grid;
  grid-template-rows: 1fr 5fr 15fr 1fr;
  height: 89vh;
`,d=s.default.div`
  text-align: center;
  font-size: 4vh;
  padding-top: 8vh;
  background: ${r.dark2};
  color: ${r.light2};
`,p=s.default.p`
  font-size: 4vh;
  padding-left: 3vh;
`,E=s.default.div`
  padding-top: 2vh;
`,f=s.default.div``;class h extends i.Component{componentDidMount(){const e=o.last(window.location.href.split("/"));this.props.dispatch(c.init(e))}render(){const{lessonStore:e}=this.props;return e.ready?void 0!==e.currentStep.example?function(e,t){return e.showQuestion?i.createElement(l.SelectOption,{store:e,dispatch:t}):""}(e,this.props.dispatch):function(e){const{title:t,text:n}=e.lessonStore.currentStep;return i.createElement(u,null,i.createElement(f,null),i.createElement(d,null,t),i.createElement(E,null,n.map((e,t)=>i.createElement(p,{key:`single-line-${t}`},e))),i.createElement(f,null))}(this.props):""}}t.Lesson=h;t.LessonWrapped=a.connect(({lessonStore:e})=>({lessonStore:e}))(h)},a44Q:
/*!*******************************!*\
  !*** ./src/lesson/actions.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.next=r.createAction(o.LESSON_NEXT),t.questionReady=r.createAction(o.LESSON_QUESTION_READY),t.click=r.createAction(o.LESSON_CLICK),t.initReady=r.createAction(o.LESSON_INIT_READY),t.init=r.createAction(o.LESSON_INIT)},bELT:
/*!*****************************************!*\
  !*** ./src/choose_word/styled/grid.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv");t.cellHeight=25.7,t.Row=o.default.div`
  height: ${t.cellHeight}vh;
`;const a=o.default.div`
text-align: center;
padding-top: ${.12*t.cellHeight}vh;
line-height: ${.7*t.cellHeight}vh;
font-size: ${.17*t.cellHeight}vh;
height: ${t.cellHeight}vh;
`;t.Container=o.default(i.ContainerBase)`
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: "cw_question" "cw_solved" "cw_translation";
`,t.Translation=o.default(a)`
color: ${r.blue};
grid-area: cw_translation;
font-weight: bolder;
`,t.Solved=o.default(a)`
color:  ${r.darkblue7};
grid-area: cw_solved;
`},bVGQ:
/*!**************************************************************!*\
  !*** ./node_modules/css-loader!./src/root/carrier/style.css ***!
  \**************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){(t=e.exports=n(/*! ../../../node_modules/css-loader/lib/css-base.js */"I1BE")(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600,800&subset=cyrillic);",""]),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Kranky:400&subset=latin);",""]),t.push([e.i,"* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: 'Source Code Pro', monospace;\n}\nbody {\n  margin: 0;\n}\nhtml {\n  font-size: 16px;\n  overflow: hidden;\n  background-color: #b0bec5;\n}\n\n@media screen and (min-width: 1200px) {\n  font-size: 20px;\n}\n@media screen and (min-width: 900px) {\n  font-size: 18px;\n}\n@media screen and (min-width: 600px) {\n  font-size: 16px;\n}\n\n.hvr-pulse {\n  display: inline-block;\n  vertical-align: middle;\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px transparent;\n}\n.hvr-pulse:hover, .hvr-pulse:focus, .hvr-pulse:active {\n  animation-name: hvr-pulse;\n  animation-duration: 3s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n}\n@keyframes hvr-pulse {\n  25% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n  75% {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9);\n  }\n}\n\n.special-modes{\n  cursor: pointer\n}\n\ndiv#driver-popover-item{display:none;position:absolute;background:#fff;color:#2d2d2d;margin:0;padding:15px;border-radius:5px;min-width:250px;max-width:300px;box-shadow:0 1px 10px rgba(0,0,0,.4);z-index:1000000000}div#driver-popover-item .driver-popover-tip{border:5px solid #fff;content:\"\";position:absolute}div#driver-popover-item .driver-popover-tip.bottom{bottom:-10px;border-top-color:#fff;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}div#driver-popover-item .driver-popover-tip.left{left:-10px;top:10px;border-top-color:transparent;border-right-color:#fff;border-bottom-color:transparent;border-left-color:transparent}div#driver-popover-item .driver-popover-tip.right{right:-10px;top:10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:#fff}div#driver-popover-item .driver-popover-tip.top{top:-10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:#fff;border-left-color:transparent}div#driver-popover-item .driver-popover-footer{display:block;clear:both;margin-top:5px}div#driver-popover-item .driver-popover-footer a{display:inline-block;padding:3px 10px;border:1px solid #d4d4d4;text-decoration:none;text-shadow:1px 1px 0 #fff;color:#2d2d2d;font:11px/normal sans-serif;cursor:pointer;outline:0;background-color:#f1f1f1;border-radius:2px;zoom:1;margin:10px 0 0}div#driver-popover-item .driver-popover-footer a.driver-disabled{color:gray;cursor:default;pointer-events:none}div#driver-popover-item .driver-popover-footer .driver-close-btn{float:left}div#driver-popover-item .driver-popover-footer .driver-btn-group{float:right}div#driver-popover-item .driver-popover-title{font:19px/normal sans-serif;margin:0 0 5px;font-weight:700;display:block;position:relative;line-height:1.5;zoom:1}div#driver-popover-item .driver-popover-description{margin-bottom:0;font:14px/normal sans-serif;line-height:1.5;color:#2d2d2d;font-weight:400;zoom:1}",""])},bjKX:
/*!**********************************************!*\
  !*** ./src/write_sentence/styled/answer.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=`color: ${r.darkblue};`,s=`color: ${r.darkblue6};`,c=`border-top: solid 1px ${r.green4};`,l=`border-top: solid 1px ${r.red3};`;t.AnswerContainer=o.default(i.CenteredWithId("ws_answer"))`
  width: 100%;
  grid-area: ws_answer;
`,t.AnswerBase=`\n${a}\n\nspan:not(:first-child) {\n  margin-left: 6px;\n}\n`;t.AnswerHidden=o.default.span`
  ${s}
  padding-top: 0.05vh;
  background: linear-gradient(to bottom right, ${"#DEE5E0"}, ${"#eae3cd"});  
  border-radius: 5%;
  padding-left: 0.6vw;
  padding-right: 0.6vw;
  visibility: hidden;
`,t.AnswerVisible=o.default(t.AnswerHidden)`
  ${c}
  visibility: visible;
`,t.AnswerVisibleWrong=o.default(t.AnswerVisible)`
  ${l}
`},dGrs:
/*!*************************************!*\
  !*** ./src/lesson/selectOption.tsx ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),a=n(/*! styled-components */"vOnD"),s=n(/*! ../_styled/grid */"ZPtv"),c=n(/*! ../select_article/styled/select */"Jn2w"),l=n(/*! ./actions */"a44Q");function u(e){const{options:t,i:n,dispatch:r}=e,o=e=>r(l.click({i:n,selection:e.target.textContent}));return i.createElement(c.SelectContainer,null,t.map((e,t)=>i.createElement(c.Select,{className:`selectable_${e.status.toLowerCase()}`,key:`${n}_${t}`,onClick:o},e.text)))}const d=a.default(s.ContainerBase)`
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 7fr 2fr 1fr;
`,p=a.default.div`
  width: 100%;
  text-align: center;
  span{
    margin: 0 0.4vw;
  }
`,E=a.default.div`
  width: 100%;
  text-align: center;
  color: ${r.darkblue3};
  text-decoration: underline;
`;t.SelectOption=function({store:e,dispatch:t}){const n=o.allTrue(function(e){return 0===o.piped(e,o.filter(Array.isArray),o.map(o.head),o.filter(e=>"ACTIVE"===e.status),o.length)}(e.question),""!==e.currentStep.translation);return i.createElement(d,null,i.createElement("div",null),i.createElement(p,null,e.question.map((e,n)=>"string"==typeof e?i.createElement("span",{key:n},e):i.createElement(u,{i:n,key:n,options:e,dispatch:t}))),n?i.createElement(E,null,e.currentStep.translation):"")}},dHhz:
/*!*****************************************!*\
  !*** ./src/guess_word/styled/input.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/input */"XJKb"),a=n(/*! ./grid */"M5ZK");t.InputContainer=r.default(o.CenteredItem)`
  height: ${1*a.frHeight}vh;
  grid-area: gw_input;
`,t.Input=r.default(i.InputBase)`
  input{
    width: 70%;
  }
`},dt5O:
/*!***************************************!*\
  !*** ./src/root/epics/sharedSpeak.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/selectors */"NDrd"),a=n(/*! ../../bees/speak */"FWz5"),s=n(/*! ../../constants */"he5r");let c=!1;t.sharedSpeakEpic=((e,t)=>e.ofType(s.SHARED_SPEAK).filter(()=>!c).switchMap(e=>new r.Observable(n=>{c=!0;const{fromLanguage:r,toLanguage:s}=i.getCommons(t),{name:l}=t.getState().store,u=`${o.camelCase(l)}Store`,d=t.getState()[u].currentInstance[e.payload],p={language:"fromPart"===e.payload?r:s,text:d};a.speakBee(p).then(()=>{c=!1,n.complete()})})))},e2sN:
/*!***********************************************!*\
  !*** ./src/_helpers/getConvertedNamespace.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.getConvertedNamespace=function(e){const[t]=r.match(/:\/\/[a-zA-Z0-9]{2,9}/,e),n=r.replace("://","",t),o=e.split("/");return`${n}_${r.last(o)}`}},eJae:
/*!****************************************!*\
  !*** ./src/lesson/bees/parseLesson.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.head,r.remove("#"),r.trim),i=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.tail,r.join("\n\n"),r.split("\n")),a=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.head,r.trim),s=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.filter(r.startsWith(">")),r.ifElse(e=>e.length>0,e=>r.remove("> ",r.head(e)),r.always(""))),c=e=>!e.startsWith("# ");t.parseLessonBee=function(e){return e.split("---").map(r.trim).filter(e=>e.length>2).map(e=>{const t=c(e)?"":o(e);return c(e)?{title:t,example:a(e),translation:s(e)}:{title:t,text:i(e)}})}},edGR:
/*!****************************************!*\
  !*** ./src/choose_word/chooseWord.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"MdxE"),i=n(/*! ./styled/grid */"bELT"),a=n(/*! ./styled/question */"F4XW");t.ChooseWord=class extends r.Component{constructor(e){super(e),this.onClickUp=this.onClickUp.bind(this),this.onClickRight=this.onClickRight.bind(this),this.onClickDown=this.onClickDown.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){this.props.dispatch(o.click(e))}onClickUp(){this.onClick("UP")}onClickRight(){this.onClick("RIGHT")}onClickDown(){this.onClick("DOWN")}render(){const{question:e,index:t}=this.props.chooseWordStore;return r.createElement(i.Container,null,r.createElement(a.QuestionContainer,null,this.props.chooseWordStore.listen&&r.createElement(a.Question,null,r.createElement(a.ChoiceX,{onClick:this.onClickUp},e[t][0]),r.createElement(a.ChoiceY,{onClick:this.onClickRight},e[t][1]),r.createElement(a.ChoiceZ,{onClick:this.onClickDown},e[t][2]))),r.createElement(i.Solved,null,this.props.chooseWordStore.correctAnswer.filter((e,t)=>t<this.props.chooseWordStore.index).join(" ")),r.createElement(i.Translation,null,this.props.chooseWordStore.currentInstance.toPart))}}},ekhr:
/*!***************************************!*\
  !*** ./src/bees/getConvertedImage.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! localforage */"oAJy"),o=n(/*! ../_helpers/getConvertedNamespace */"e2sN");t.getConvertedImageBee=async function(e){const t=o.getConvertedNamespace(e.imageSrc),n=await r.getItem(t);return null!==n&&n}},emwK:
/*!****************************************!*\
  !*** ./src/write_sentence/bees/get.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! rambdax */"Ex95"),i=n(/*! ../styled/answer */"bjKX"),a=n(/*! ../styled/question */"MLjJ"),s=n(/*! ../styled/grid */"oOQG"),c=n(/*! colors */"dBCm"),l=n(/*! client-helpers */"RQK/"),u=4,d=102,p=2700;function E(e,t){return Number(Number.parseFloat(`${e/t}`).toFixed(2))}function f(e){const t=l.getter("window"),n=o.defaultToStrict(p,t);return E(E(E(window.visualViewport.width,n),E(e,d)),u)}t.getBee=function(e){const t=f(e.fromPart.length);return{Question:r.default(s.getText(t))`${a.QuestionBase}`,Answer:r.default(s.getText(t))`${i.AnswerBase}`,Translation:r.default(s.getText(f(e.toPart.length)*1.1))`color: ${c.darkblue5};`}}},f6FE:
/*!*******************************!*\
  !*** ./src/bees/okCorrect.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.okCorrectBee=function(e,t){return Object.assign({},e,{okCorrect:r.update(e.index,t,e.okCorrect)})}},fJpv:
/*!**************************************!*\
  !*** ./src/guess_word/guessWord.tsx ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"0Yy6"),i=n(/*! colors */"dBCm"),a=n(/*! ./styled/grid */"M5ZK"),s=n(/*! ./styled/image */"XEOf"),c=n(/*! ./styled/input */"dHhz"),l=n(/*! ./styled/related */"BtHC"),u=n(/*! ./styled/word */"qjlp"),d=a.CTextContainer("gw_translated"),p=a.CText({color:i.blue7}),E=a.CTextContainer("gw_sentence"),f=a.CText({color:i.darkblue7});t.GuessWord=class extends r.PureComponent{constructor(e){super(e),this.onInput=this.onInput.bind(this),this.onKeyPress=this.onKeyPress.bind(this)}onInput(e){this.props.dispatch(o.input(e.target.value))}onKeyPress(e){"Enter"===e.key&&this.props.dispatch(o.check())}render(){const e=this.props.guessWordStore,t=e.currentInstance.imageSrc;return r.createElement(a.Container,null,r.createElement(c.InputContainer,null,r.createElement(c.Input,null,r.createElement("input",{type:"text",autoFocus:!0,value:e.inputState,onChange:this.onInput,onKeyPress:this.onKeyPress}))),r.createElement(u.WordContainer,null,e.listen&&r.createElement(u.Word,null,e.wordQuestion),!e.listen&&r.createElement(u.Word,null,e.wordAnswer)),r.createElement(l.RelatedContainer,null,r.createElement(l.Related,null,e.related[0]),r.createElement(l.Related,null,e.related[1])),r.createElement(E,null,e.listen&&r.createElement(f,null,e.question),!e.listen&&r.createElement(f,null,e.answer)),r.createElement(s.ImageContainer,null,r.createElement(s.Image,{src:t})),r.createElement(d,null,r.createElement(p,null,e.translated)))}}},fjO1:
/*!*************************************!*\
  !*** ./src/ants/css_in_js/media.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.mediaAnt=function(e){return r.glue(`\n  @media (max-width: 800px) {\n    ${e}\n  }\n  @media (max-height: 800px) {\n    ${e}    \n  }\n  `)},t.mediaImportantAnt=function(e){return r.glue(`\n  @media (max-width: 2800px) {\n    ${e}\n  }\n  `)}},fqjP:
/*!******************************************!*\
  !*** ./src/select_article/component.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"WVUV"),a=n(/*! ./selectArticle */"YMUk");class s extends r.Component{constructor(e){super(e)}componentDidMount(){this.props.dispatch(i.init())}render(){const{ready:e}=this.props.selectArticleStore;return r.createElement("div",null,e&&r.createElement(a.SelectArticle,Object.assign({},this.props)))}}t.SelectArticle=s;t.SelectArticleWrapped=o.connect(({store:e,selectArticleStore:t})=>({store:e,selectArticleStore:t}))(s)},gKvR:
/*!*********************************!*\
  !*** ./src/bees/getDatabase.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ");t.getDatabaseBee=function(e){const{fromLanguage:t,toLanguage:n,db:i}=e,a=r.filter(e=>{const i=`${t.toLowerCase()}Part`,a=`${n.toLowerCase()}Part`,s=`${t.toLowerCase()}Word`,c=`${n.toLowerCase()}Word`,l=e[i],u=e[s],d=void 0!==e[c],p=void 0!==e[a]&&d;if(!r.allTrue(void 0!==l,void 0!==u,p)||l.length>102)return!1;const E=r.last(u.split(" "));return o.wordsX(l).map(e=>e.toLowerCase()).includes(E.toLowerCase())||function(e){return e.startsWith("по-")||e.startsWith("най-")}(E)},i);return r.map(e=>{const r=e[`${t.toLowerCase()}Part`],o=e[`${t.toLowerCase()}Word`],i=e.imageSrc,a=e[`${n.toLowerCase()}Part`],s=e[`${n.toLowerCase()}Word`];return{altTag:e.altTag,fromPart:r,fromWord:o,imageSrc:i,toPart:a,toWord:s}},a)}},gdWI:
/*!*********************************************!*\
  !*** ./src/root/navigation/styled/logo.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD");t.Logo=r.default.div`
  margin-bottom:1vh;
  margin-left:1vh;
  width: 8vh;
  height: 8vh;
  background-size: cover;
  border-radius: 7px;
  cursor: pointer;
  z-index: 1000;
  background-image: url(data:image/jpeg;base64,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);
`},hDuU:
/*!*****************************************************!*\
  !*** ./src/choose_word/bees/generateFillerWords.ts ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ"),i=2,a=20;t.generateFillerWordsBee=function(e){const t=r.pluck("fromPart",e),n=r.map(o.wordsX,t),s=r.uniq(r.flatten(n)),c=r.filter(e=>!e.includes(",")||!e.includes("."),s);return r.produce(function(){const e={};return r.range(i,a).map(t=>{e[t]=r.filter(e=>e.length===t)}),e}(),c)}},hEQj:
/*!***************************************************!*\
  !*** ./src/write_sentence/styled/translation.tsx ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"oOQG");t.TranslationContainer=o.default(i.CenteredItem)`
  grid-area: ws_translation;
  width: 100%;            
`,t.Translation=o.default(a.Text)`
  color: ${r.darkblue5};
`,t.TranslationSmall=o.default(a.getText(.37))`
  color: ${r.darkblue5};
`},hKQu:
/*!*******************************************!*\
  !*** ./src/select_article/epics/click.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../../root/actions */"X9xb"),a=n(/*! ../actions */"WVUV");t.clickEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_CLICK).filter(e=>!e.payload.article.solved).switchMap(e=>new r.Observable(n=>{const{wordList:r}=t.getState().selectArticleStore.currentInstance,{word:o,article:s}=e.payload;o===s.correct&&n.next(i.sharedAddPoints(1));const c=r.map(e=>{const t="object"==typeof e&&e.index!==s.index;if("string"==typeof e||t)return e;const n=e.articleSet.map(e=>{const t=e.value===s.correct?"CORRECT":e.value===o?"WRONG":"INACTIVE";return Object.assign({},e,{status:t})});return Object.assign({},e,{solved:!0,articleSet:n})});n.next(a.clickReady(c)),function(e){return 0===e.filter(e=>"object"==typeof e&&!e.solved).length}(c)&&n.next(a.stop()),n.complete()})))},hULM:
/*!**********************************************!*\
  !*** ./src/root/navigation/styled/cells.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=o.default.div`
  outline: 1px solid ${r.green};
  text-align: center;
  height: ${8}vh;
  background-color: ${r.navy5};
  color: ${r.dark5};

  a {
      text-decoration: none;
      color: inherit;
  }

  a:hover {
      color: inherit;
  }
  &:hover {
      color: ${r.navy5};
      background-color: ${r.dark5};
  }
  span {
      display: inline-block;
      vertical-align: middle;
      line-height: ${8}vh;
  }
`;t.CCell=function(e){return o.default(i)`grid-area: ${e};`}},he5r:
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! create-action */"Hxzp"),i=n(/*! rambdax */"Ex95");t.initialDefaultState={randomFlag:!1,textToSpeechFlag:!1},t.defaultState={randomFlag:!1,textToSpeechFlag:!1,points:0,fromLanguage:"DE",toLanguage:"EN"},t.urlInputsDefault={easy:!1,easier:!1,easiest:!1,random:!1},t.allowedUrlInputs=i.glue("\n  id\n  fromLanguage\n  toLanguage\n  lock\n  mic\n  random\n  reset\n  window\n  auto,pause\n  big,small\n  child,adult,\n  easy,easier,easiest\n",",");t.resetUrlInputs=i.remove(["window,","child,","id,"],t.allowedUrlInputs),t.LESSON_CLICK="lesson@CLICK",t.LESSON_SELECT="lesson@SELECT",t.LESSON_NEXT="lesson@NEXT",t.LESSON_QUESTION_READY="lesson@QUESTION_READY",t.LESSON_INIT_READY="lesson@INIT_READY",t.LESSON_INIT="lesson@INIT",t.SELECT_ARTICLE="selectArticle",t.SELECT_ARTICLE_SHOW="selectArticle@SHOW",t.SELECT_ARTICLE_STOP="selectArticle@STOP",t.SELECT_ARTICLE_CHECK="selectArticle@CHECK",t.SELECT_ARTICLE_CLICK="selectArticle@CLICK",t.SELECT_ARTICLE_CLICK_READY="selectArticle@CLICK_READY",t.SELECT_ARTICLE_INPUT="selectArticle@INPUT",t.SELECT_ARTICLE_INPUT_CHANGE="selectArticle@INPUT_CHANGE",t.SELECT_ARTICLE_NEXT="selectArticle@NEXT",t.SELECT_ARTICLE_NEXT_READY="selectArticle@NEXT_READY",t.SELECT_ARTICLE_INIT="selectArticle@INIT",t.SELECT_ARTICLE_UNMOUNT="selectArticle@UNMOUNT",t.SELECT_ARTICLE_INIT_READY="selectArticle@INIT_READY",t.GUESS_WORD="guessWord",t.GUESS_WORD_SHOW="guessWord@SHOW",t.GUESS_WORD_STOP="guessWord@STOP",t.GUESS_WORD_CHECK="guessWord@CHECK",t.GUESS_WORD_INPUT="guessWord@INPUT",t.GUESS_WORD_INPUT_CHANGE="guessWord@INPUT_CHANGE",t.GUESS_WORD_NEXT="guessWord@NEXT",t.GUESS_WORD_NEXT_READY="guessWord@NEXT_READY",t.GUESS_WORD_INIT="guessWord@INIT",t.GUESS_WORD_UNMOUNT="guessWord@UNMOUNT",t.GUESS_WORD_INIT_READY="guessWord@INIT_READY",t.WRITE_SENTENCE_MIC="writeSentence@MIC",t.WRITE_SENTENCE_MIC_READY="writeSentence@MIC_READY",t.WRITE_SENTENCE="writeSentence",t.WRITE_SENTENCE_CHECK="writeSentence@CHECK",t.WRITE_SENTENCE_INIT="writeSentence@INIT",t.WRITE_SENTENCE_INIT_READY="writeSentence@INIT_READY",t.WRITE_SENTENCE_LISTEN="writeSentence@LISTEN",t.WRITE_SENTENCE_NEXT="writeSentence@NEXT",t.WRITE_SENTENCE_READY="writeSentence@READY",t.WRITE_SENTENCE_SET_INDEX="writeSentence@SET_INDEX",t.WRITE_SENTENCE_SET_INPUT="writeSentence@SET_INPUT",t.WRITE_SENTENCE_SET_NEXT="writeSentence@SET_NEXT",t.WRITE_SENTENCE_SET_OK_CORRECT="writeSentence@SET_OK_CORRECT",t.WRITE_SENTENCE_SHOW="writeSentence@SHOW",t.WRITE_SENTENCE_STEP="writeSentence@STEP",t.WRITE_SENTENCE_STOP="writeSentence@STOP",t.WRITE_SENTENCE_UNMOUNT="writeSentence@UNMOUNT",t.LEARNING_MEME="learningMeme",t.LEARNING_MEME_CHECK="learningMeme@CHECK",t.LEARNING_MEME_INIT="learningMeme@INIT",t.LEARNING_MEME_INIT_READY="learningMeme@INIT_READY",t.LEARNING_MEME_LISTEN="learningMeme@LISTEN",t.LEARNING_MEME_NEXT="learningMeme@NEXT",t.LEARNING_MEME_NEXT_READY="learningMeme@NEXT_READY",t.LEARNING_MEME_READY="learningMeme@READY",t.LEARNING_MEME_SET_INPUT="learningMeme@SET_INPUT",t.LEARNING_MEME_SET_NEXT="learningMeme@SET_NEXT",t.LEARNING_MEME_SHOW="learningMeme@SHOW",t.LEARNING_MEME_STOP="learningMeme@STOP",t.LEARNING_MEME_UNMOUNT="learningMeme@UNMOUNT",t.CHOOSE_WORD="chooseWord",t.CHOOSE_WORD_CLICK="chooseWord@CLICK",t.CHOOSE_WORD_CHECK="chooseWord@CHECK",t.CHOOSE_WORD_INIT="chooseWord@INIT",t.CHOOSE_WORD_INIT_READY="chooseWord@INIT_READY",t.CHOOSE_WORD_NEXT="chooseWord@NEXT",t.CHOOSE_WORD_NEXT_READY="chooseWord@NEXT_READY",t.CHOOSE_WORD_INC_INDEX="chooseWord@INC_INDEX",t.CHOOSE_WORD_INC_POINTS="chooseWord@INC_POINTS",t.CHOOSE_WORD_SHOW="chooseWord@SHOW",t.CHOOSE_WORD_STEP="chooseWord@STEP",t.CHOOSE_WORD_STOP="chooseWord@STOP",t.CHOOSE_WORD_UNMOUNT="chooseWord@UNMOUNT",t.BACKGROUND="#b0bec5",t.DATA_READY="DATA_READY";t.DB_URL="https://rawcdn.githack.com/selfrefactor/front/e9f0c5eb4900460d7b4891acd6a5b762ee1582fa/files/db.json",t.DELAY=500,t.INFO="INFO",t.INIT="INIT",t.INIT_READY="INIT_READY",t.LONG_DELAY=1e3,t.NEXT_TICK=0,t.ROUTER_CHANGE="@@router/LOCATION_CHANGE",t.SETTINGS_RANDOM="settings@RANDOM",t.SETTINGS_TEXT_TO_SPEECH="settings@TEXT_TO_SPEECH",t.SHORT_DELAY=150,t.UPDATE_POINTS_DELAY=3e3,t.SHARED_ADD_POINTS="shared@ADD_POINTS",t.SHARED_ADD_POINTS_READY="shared@ADD_POINTS_READY",t.SHARED_INIT="shared@INIT",t.SHARED_SHOW_ANSWER="shared@SHOW_ANSWER",t.SHARED_SPEAK="shared@SPEAK",t.SHARED_NEXT_READY="shared@NEXT_READY",t.LANGUAGE_CHANGE="languageChange",t.LANGUAGE_CHANGE_TOGGLE="languageChange@TOGGLE",t.LANGUAGE_CHANGE_INIT="languageChange@INIT",t.LANGUAGE_CHANGE_CLICK="languageChange@CLICK",t.LANGUAGE_CHANGE_SET="languageChange@SET",t.LANGUAGE_SEPARATOR=" ⇨ ",t.CARRIER_CHECK="carrier@CHECK",t.CARRIER_INIT="carrier@INIT",t.CARRIER_INIT_READY="carrier@INIT_READY",t.CARRIER_LISTEN="carrier@LISTEN",t.CARRIER_READY="carrier@READY",t.CARRIER_SHOW="carrier@SHOW",t.CARRIER_STEP="carrier@STEP",t.CARRIER_STOP="carrier@STOP",t.CARRIER_UNMOUNT="carrier@UNMOUNT",t.NAVIGATION_TOGGLE="navigation@TOGGLE",t.NAVIGATION_CHANGE="navigation@CHANGE",t.ICON_ACTIVE=r.darkblue3,t.ICON_PASSIVE=r.pink5,t.NOTIFY_INFO="notify@INFO",t.sharedSpeak=o.createAction(t.SHARED_SPEAK),t.sharedNextReady=o.createAction(t.SHARED_NEXT_READY)},hnD8:
/*!************************************************!*\
  !*** ./src/root/epics/sharedChangeSettings.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! string-fn */"DOxJ"),a=n(/*! ../../_helpers/selectors */"NDrd");t.sharedChangeSettingsEpic=((e,t)=>e.ofType(r.SETTINGS_RANDOM,r.SETTINGS_TEXT_TO_SPEECH).switchMap(e=>new o.Observable(e=>{const{name:n}=a.getCommons(t),r={type:`${i.camelCase(n)}@INIT`};e.next(r),e.complete()})).debounceTime(r.LONG_DELAY))},iWvF:
/*!******************************************!*\
  !*** ./src/learning_meme/epics/index.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"O39Z"),i=n(/*! ./init */"+0l1"),a=n(/*! ./initReady */"l1si"),s=n(/*! ./listen */"81cQ"),c=n(/*! ./next */"6QB+");t.learningMemeEpic=r.combineEpics(i.initEpic,a.initReadyEpic,c.nextEpic,s.listenEpic,o.checkEpic)},ikCi:
/*!**************************************!*\
  !*** ./src/guess_word/epics/init.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_helpers/instanceDatabase */"IUHU"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"0Yy6");function s(e){const t=e.getState().store,{randomFlag:n,fromLanguage:r,toLanguage:i,db:a}=t,s=a.filter(e=>{const t=`${r.toLowerCase()}Related`,n=`${i.toLowerCase()}Part`,o=void 0!==e[t]&&e[t].length>0,a=void 0!==e[n]&&e[n].length>0;return o&&a});return o.instanceDatabase(n,s)}t.createDB=s,t.initEpic=((e,t)=>{const n=e.ofType(i.GUESS_WORD_INIT),o=e.ofType(i.INIT_READY);return r.Observable.combineLatest(n,o).map(()=>a.initReady(s(t)))})},jcVd:
/*!****************************************!*\
  !*** ./src/write_sentence/reducers.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../bees/okCorrect */"f6FE"),o=n(/*! ../constants */"he5r"),i={ready:!1};t.writeSentenceStore=function(e=i,t){switch(t.type){case o.WRITE_SENTENCE_INIT_READY:return Object.assign({},e,{currentIndex:-1,db:t.payload});case o.WRITE_SENTENCE_READY:return Object.assign({},e,{ready:!0});case o.WRITE_SENTENCE_SET_INPUT:return Object.assign({},e,{inputState:t.payload.input,question:t.payload.question});case o.WRITE_SENTENCE_SET_INDEX:return Object.assign({},e,{index:e.index+1,inputState:""});case o.WRITE_SENTENCE_MIC_READY:return Object.assign({},e,{listen:!1});case o.WRITE_SENTENCE_STOP:return Object.assign({},e,{index:e.index+1,inputState:"",listen:!1});case o.WRITE_SENTENCE_SET_NEXT:return Object.assign({},e,t.payload,{index:0,inputState:"",listen:!0});case o.WRITE_SENTENCE_SET_OK_CORRECT:return r.okCorrectBee(e,t.payload);case o.WRITE_SENTENCE_UNMOUNT:return Object.assign({},e,i);default:return e}}},jjzj:
/*!**************************************************!*\
  !*** ./src/write_sentence/ants/lastCharSpace.ts ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.lastCharSpaceAnt=(e=>" "===r.last(e))},"k+nP":
/*!***************************************!*\
  !*** ./src/choose_word/epics/next.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/getNextIndex */"noCf"),a=n(/*! ../../_helpers/selectors */"NDrd"),s=n(/*! ../../bees/sharedNextReady */"LHni"),c=n(/*! ../../constants */"he5r"),l=n(/*! ../../root/actions */"X9xb"),u=n(/*! ../actions */"MdxE"),d=n(/*! ../bees/getFillers */"qhap");t.nextEpic=((e,t)=>e.ofType(c.CHOOSE_WORD_NEXT).switchMap(e=>new r.Observable(e=>{const{currentIndex:n,db:r,fillerWords:c}=t.getState().chooseWordStore,{textToSpeechFlag:p}=a.getCommons(t),E=i.getNextIndex({index:n,length:r.length}),f=r[E];s.sharedNextReadyBee(f);const h=o.wordsX(f.fromPart),g={correctAnswer:h,currentIndex:E,currentInstance:f,question:h.map(e=>d.getFillersBee({fillers:c,word:e}))};e.next(u.nextReady(g)),p&&e.next(l.sharedSpeak("toPart")),e.complete()})))},l1si:
/*!**********************************************!*\
  !*** ./src/learning_meme/epics/initReady.ts ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.LEARNING_MEME_INIT_READY).map(()=>({type:r.LEARNING_MEME_NEXT})))},"l7n/":
/*!**************************************!*\
  !*** ./src/root/combinedReducers.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux */"fvjX"),o=n(/*! notify/reducers */"kY1S"),i=n(/*! ../choose_word/reducers */"OJQa"),a=n(/*! ../guess_word/reducers */"2Skl"),s=n(/*! ../learning_meme/reducers */"HrOy"),c=n(/*! ../lesson/reducers */"8Qhz"),l=n(/*! ../select_article/reducers */"/ZOX"),u=n(/*! ../write_sentence/reducers */"jcVd"),d=n(/*! ./navigation/reducers */"uVC7"),p=n(/*! ./reducers */"7uE1"),E={lessonStore:c.lessonStore,selectArticleStore:l.selectArticleStore,chooseWordStore:i.chooseWordStore,guessWordStore:a.guessWordStore,learningMemeStore:s.learningMemeStore,navigationStore:d.navigationStore,notifyStore:o.notifyStore,store:p.store,writeSentenceStore:u.writeSentenceStore};t.combinedReducers=r.combineReducers(E)},luEA:
/*!*******************************************!*\
  !*** ./src/write_sentence/epics/check.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../../root/actions */"X9xb"),s=n(/*! ../actions */"o/T1"),c=n(/*! ../../_helpers/selectors */"NDrd");t.checkEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_CHECK).switchMap(()=>new r.Observable(e=>{const{fromLanguage:n}=c.getCommons(t),{inputState:r,question:i,index:l}=t.getState().writeSentenceStore,u=r.trim().length,d=("DE"===n?o.distanceGerman:o.distance)(r.trim(),i[l].hidden),p=u>1&&d<=(u>5?1:0),E=1===i[l].hidden.length||p;p&&e.next(a.sharedAddPoints(1)),e.next(s.setOkCorrect(E)),e.next(s.step()),e.complete()})))},"m+B3":
/*!**************************************!*\
  !*** ./src/guess_word/epics/next.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/getNextIndex */"noCf"),a=n(/*! ../../_helpers/glueRelated */"q/ul"),s=n(/*! ../../bees/sharedNextReady */"LHni"),c=n(/*! ../../constants */"he5r"),l=n(/*! ../actions */"0Yy6"),u=(e,t)=>{const[n]=e.split(","),i=o.maskWords({charLimit:4,words:n}),a=n.split(" ");return{wordAnswer:n,wordQuestion:i,words:!(1===a.length&&!t.includes(n))?a:[(e=>{return`${e[0].toUpperCase()}${r.tail(e)}`})(a[0])]}};t.nextEpic=((e,t)=>e.ofType(c.GUESS_WORD_NEXT).map(()=>l.nextReady(function(e){const{fromLanguage:t,toLanguage:n}=e.getState().store,{db:r,currentIndex:c}=e.getState().guessWordStore,l=i.getNextIndex({length:r.length,index:c}),d=r[l];s.sharedNextReadyBee(d);const p=`${t.toLowerCase()}Related`,E=`${t.toLowerCase()}Word`,f=`${t.toLowerCase()}Part`,h=`${n.toLowerCase()}Part`,g=a.glueRelated(d[p]),m=d[f],{wordAnswer:_,wordQuestion:S,words:v}=u(d[E],m),T=d[h],{hidden:C,visible:O}=o.maskSentence({sentence:m,words:v}),N=O.join(" ");return{answer:C.join(" "),currentIndex:l,currentInstance:{fromPart:m,fromWord:"",imageSrc:d.imageSrc,toPart:"",toWord:""},question:N,related:g,translated:T,wordAnswer:_,wordQuestion:S}}(t))))},mfjz:
/*!******************************************!*\
  !*** ./src/write_sentence/component.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),a=n(/*! react-redux */"/MKj"),s=n(/*! ./actions */"o/T1"),c=n(/*! ./styled/answer */"bjKX"),l=n(/*! ./styled/grid */"oOQG"),u=n(/*! ./styled/image */"Ep3D"),d=n(/*! ./styled/input */"EkVV"),p=n(/*! ./styled/question */"MLjJ"),E=n(/*! ./styled/translation */"hEQj"),f=n(/*! ./answerList */"Jwh9"),h=n(/*! ./ants/lastCharSpace */"jjzj"),g=n(/*! ./questionList */"66FG"),m=n(/*! ./ants/auto */"49dL"),_=n(/*! ./ants/lock */"ucJp"),S=n(/*! ./bees/acceptSpeech */"DYMH"),v=n(/*! ./bees/get */"emwK");class T extends i.Component{constructor(e){super(e),this.onInputKeyPress=this.onInputKeyPress.bind(this),this.onInputChange=this.onInputChange.bind(this),this.state={lock:r.getter("lock")}}componentDidMount(){const{auto:e,id:t,mic:n,pause:i}=r.masterGetter("auto,pause,id,mic");"number"==typeof e&&m.autoAnt(this.props.dispatch,1e3*e,o.defaultTo(3e3*e,1e3*i)),n&&S.acceptSpeechBee(this.props.dispatch),this.props.dispatch(s.init(t)),setTimeout(()=>{const e=document.getElementById("ws-input");e&&e.focus()},700)}onInputKeyPress(e){" "===e.key&&this.props.dispatch(s.listen("SPACE"))}onInputChange(e){h.lastCharSpaceAnt(e.target.value)||this.state.lock&&!_.lockAnt(this.props.writeSentenceStore,e)||this.props.dispatch(s.listen(e.target.value))}render(){const{currentInstance:e,convertedImage:t,inputState:n,ready:r}=this.props.writeSentenceStore;if(!r)return"";const o=void 0===e?"":!1===t?e.imageSrc:t,a=v.getBee(e);return i.createElement("div",null,i.createElement(l.Container,null,i.createElement(d.InputContainer,null,i.createElement(d.Input,null,i.createElement("input",{id:"ws-input",type:"text",autoFocus:r,value:n,onChange:this.onInputChange,onKeyPress:this.onInputKeyPress}))),i.createElement(p.QuestionContainer,null,i.createElement(a.Question,null,i.createElement(g.QuestionList,Object.assign({},this.props.writeSentenceStore)))),i.createElement(c.AnswerContainer,null,i.createElement(a.Answer,null,i.createElement(f.AnswerList,Object.assign({},this.props.writeSentenceStore)))),i.createElement(u.ImageContainer,null,i.createElement(u.Image,{src:o})),i.createElement(E.TranslationContainer,null,i.createElement(a.Translation,null,e.toPart))))}}t.WriteSentence=T;t.WriteSentenceWrapped=a.connect(({writeSentenceStore:e})=>({writeSentenceStore:e}))(T)},mi1x:
/*!***********************************!*\
  !*** ./src/_helpers/infoSteps.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r={context:function(e){return{element:`#${e}_context`,popover:{description:"This is a context to help you figure out the answer",position:"bottom",title:"Context"}}},image:function(e){return{element:`#${e}_image`,popover:{description:"This is image related to the context",position:"top",title:"Image"}}},input:function(e,t){return{element:`#${e}_input`,popover:{description:t,position:"bottom",title:"Input field"}}},question:function(e,t){return{element:`#${e}_question`,popover:{description:t,position:"bottom",title:"Question"}}},translated:function(e){return{element:`#${e}_translated`,popover:{description:"Translation of the context section",position:"top",title:"Translation"}}}};const o={lm:function(e,t){return t.map(t=>{if("string"==typeof t)return r[t](e);const[n,o]=Object.entries(t)[0];return r[n](e,o)})}("lm",[{question:"This is a hidden word that you need to guess correctly"},"context",{input:"This is a hidden word that you need to guess correctly.Submit by simply pressing 'Enter'"},"image","translated"])};t.infoSteps=function(e){return o[e]}},mmTX:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/init.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../actions */"o/T1"),a=n(/*! ../../bees/createDatabase */"sz3p");t.initEpic=((e,t)=>{const n=e.ofType(r.WRITE_SENTENCE_INIT),s=e.ofType(r.INIT_READY);return o.Observable.combineLatest(s,n).map(([,e])=>i.initReady(a.createDatabaseBee(t,e)))})},noCf:
/*!**************************************!*\
  !*** ./src/_helpers/getNextIndex.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getNextIndex=function(e){const t=e.index+1;return t===e.length?0:t}},"o/T1":
/*!***************************************!*\
  !*** ./src/write_sentence/actions.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.mic=r.createAction(o.WRITE_SENTENCE_MIC),t.micReady=r.createAction(o.WRITE_SENTENCE_MIC_READY),t.check=r.createAction(o.WRITE_SENTENCE_CHECK),t.init=r.createAction(o.WRITE_SENTENCE_INIT),t.initReady=r.createAction(o.WRITE_SENTENCE_INIT_READY),t.listen=r.createAction(o.WRITE_SENTENCE_LISTEN),t.next=r.createAction(o.WRITE_SENTENCE_NEXT),t.setIndex=r.createAction(o.WRITE_SENTENCE_SET_INDEX),t.setNext=r.createAction(o.WRITE_SENTENCE_SET_NEXT),t.setOkCorrect=r.createAction(o.WRITE_SENTENCE_SET_OK_CORRECT),t.setInput=r.createAction(o.WRITE_SENTENCE_SET_INPUT),t.step=r.createAction(o.WRITE_SENTENCE_STEP),t.stop=r.createAction(o.WRITE_SENTENCE_STOP),t.notify=function(e){return{payload:{message:e,ms:7e3},type:"notify@INFO"}}},o2aO:
/*!*******************************************!*\
  !*** ./src/guess_word/epics/initReady.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.GUESS_WORD_INIT_READY).map(()=>({type:r.GUESS_WORD_NEXT})))},oOQG:
/*!********************************************!*\
  !*** ./src/write_sentence/styled/grid.tsx ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv");t.getText=function(e){return r.default.div`
    padding-top: ${.3*o.height}vh;
    line-height: ${e*o.height}vh;
    font-size: ${e*o.height}vh;
    width: 100%;
  `},t.Text=r.default.div`
  padding-top: ${.3*o.height}vh;
  line-height: ${.5*o.height}vh;
  font-size: ${.5*o.height}vh;
  width: 100%;
`,t.Container=r.default(o.ContainerBase)`
  grid-template-columns: 1fr 23fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 4fr;
  grid-template-areas: ". ws_input ." 
  ". ws_question ." 
  ". ws_answer ." 
  ". ws_translation ." 
  ". ws_image .";
`},oztT:
/*!***************************************!*\
  !*** ./src/guess_word/epics/input.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"0Yy6");t.inputEpic=((e,t)=>e.ofType(r.GUESS_WORD_INPUT).filter(()=>(function(e){return e.getState().guessWordStore.listen})(t)).map(e=>o.inputChange(e.payload)))},pZ8w:
/*!*****************************!*\
  !*** ./src/bees/getJson.ts ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getJsonBee=(async e=>{return(await fetch(e,{method:"GET"})).json()})},prBy:
/*!***********************************************!*\
  !*** ./src/write_sentence/epics/initReady.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.WRITE_SENTENCE_INIT_READY).map(()=>({type:r.WRITE_SENTENCE_NEXT})))},"q/ul":
/*!*************************************!*\
  !*** ./src/_helpers/glueRelated.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=(e,t)=>t.length-e.length,i=75,a="; ";function s(e){return e.reduce((e,t)=>e+t.length,0)}function c(e,t){let n=!0,r=-1;const o=[e];for(;n;){if(++r===t.length){n=!1;continue}const e=[...o,t[r]];s(e)+(e.length-1)*a.length<i&&o.push(t[r])}return o}t.glueRelated=function(e){const t=e.filter(e=>e.length<i),n=r.sort(o,t);if(0===n.length)return["",""];if(1===n.length)return[n[0],""];const s=c(n[0],r.tail(n)),l=n.filter(e=>!s.includes(e));if(l.join(a).length<i)return[s.join(a),l.join(a)];const u=c(l[0],r.tail(l));return[s.join(a),u.join(a)]}},qhap:
/*!********************************************!*\
  !*** ./src/choose_word/bees/getFillers.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=2,i=3;t.getFillersBee=function(e){const t=e.word.length;if(void 0===e.fillers[t]||e.fillers[t].length<i)return[e.word];const n=r.filter(t=>t!==e.word,e.fillers[t]),a=r.take(o,r.shuffle(n));return r.shuffle(r.append(e.word,a))}},qjlp:
/*!****************************************!*\
  !*** ./src/guess_word/styled/word.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"M5ZK");t.WordContainer=o.default(i.CenteredItem)`
  height: ${1*a.frHeight}vh;
  grid-area: gw_word;
`,t.Word=o.default(a.Text)`
  color: ${r.darkblue3};
  letter-spacing: 0.4rem;
  word-spacing: 1rem;
`},qysT:
/*!***************************************!*\
  !*** ./src/choose_word/epics/step.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_helpers/selectors */"NDrd"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../../root/actions */"X9xb"),s=n(/*! ../actions */"MdxE");t.stepEpic=((e,t)=>e.ofType(i.CHOOSE_WORD_STEP).switchMap(e=>new r.Observable(e=>{const{index:n,correctAnswer:r,localPoints:i}=t.getState().chooseWordStore,c=n+1===r.length,l=r.length-i<=2;if(c){const{textToSpeechFlag:n}=o.getCommons(t);l&&e.next(a.sharedAddPoints(1)),n&&e.next(a.sharedSpeak("fromPart")),e.next(s.stop())}else e.next(s.incIndex());e.complete()})))},rC4W:
/*!***************************************!*\
  !*** ./src/choose_word/epics/init.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../_helpers/instanceDatabase */"IUHU"),a=n(/*! ../../_helpers/selectors */"NDrd"),s=n(/*! ../actions */"MdxE"),c=n(/*! ../../bees/getDatabase */"gKvR"),l=n(/*! ../bees/generateFillerWords */"hDuU");t.initEpic=((e,t)=>{const n=e.ofType(r.INIT_READY),u=e.ofType(r.CHOOSE_WORD_INIT);return o.Observable.combineLatest(n,u).map(()=>s.initReady(function(e){const{randomFlag:t,fromLanguage:n,toLanguage:r}=a.getCommons(e),{db:o}=e.getState().store,s=c.getDatabaseBee({db:o,fromLanguage:n,toLanguage:r}),u=l.generateFillerWordsBee(s);return{db:i.instanceDatabase(t,s),fillerWords:u}}(t)))})},reJz:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/step.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_helpers/selectors */"NDrd"),i=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"o/T1"),s={type:i.SHARED_SPEAK,payload:"fromPart"};t.stepEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_STEP).switchMap(e=>new r.Observable(e=>{const{index:n,question:r}=t.getState().writeSentenceStore,{textToSpeechFlag:i}=o.getCommons(t);n+1===r.length?(e.next(a.stop()),i&&e.next(s)):e.next(a.setIndex()),e.complete()})))},s1Kj:
/*!********************************************!*\
  !*** ./src/learning_meme/styled/image.tsx ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/image */"+aNb");t.ImageContainer=r.default(o.CenteredItem)`
  grid-area: image;
  height: ${7*o.height}vh;
  width: 100%;
`,t.Image=i.ImageBase},sTV3:
/*!**********************************************!*\
  !*** ./src/select_article/epics/initEpic.ts ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../_helpers/instanceDatabase */"IUHU"),a=n(/*! ../../constants */"he5r"),s=n(/*! ../actions */"WVUV"),c=n(/*! ../ants/filter */"JqQx"),l=n(/*! ../../_helpers/selectors */"NDrd");t.initEpic=((e,t)=>{const n=e.ofType(a.INIT_READY),u=e.ofType(a.SELECT_ARTICLE_INIT);return o.Observable.combineLatest(n,u).filter(()=>"DE"===l.getCommons(t).fromLanguage).map(()=>s.initReady(function(e){const{randomFlag:t}=l.getCommons(e),{db:n}=e.getState().store,o=c.filterAnt(n),a=t?r.shuffle(o):o;return{db:i.instanceDatabase(t,a)}}(t)))})},sz3p:
/*!************************************!*\
  !*** ./src/bees/createDatabase.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../_helpers/instanceDatabase */"IUHU"),o=n(/*! ./getDatabase */"gKvR"),i=n(/*! ../_helpers/selectors */"NDrd");t.createDatabaseBee=function(e,t){const{randomFlag:n,fromLanguage:a,toLanguage:s}=i.getCommons(e),{db:c}=e.getState().store,l=o.getDatabaseBee({db:c,fromLanguage:a,toLanguage:s});return r.instanceDatabase(n,l,t)}},"tGx/":
/*!******************************!*\
  !*** ./src/bees/rootInit.ts ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),a=n(/*! ../constants */"he5r");t.rootInitBee=function(){o.s(),r.resetter(a.resetUrlInputs);const e=o.pick(a.allowedUrlInputs,i.takeArguments(window.location.href)),t=e.adult?{child:!1}:{};r.masterSetter(Object.assign({},r.masterGetter(),e,t))}},uVC7:
/*!*****************************************!*\
  !*** ./src/root/navigation/reducers.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o={active:!1};t.navigationStore=function(e=o,t){switch(t.type){case r.NAVIGATION_TOGGLE:return Object.assign({},e,{active:!e.active});case r.ROUTER_CHANGE:return Object.assign({},e,{active:!1});default:return e}}},uXMx:
/*!***********************************************!*\
  !*** ./src/root/carrier/styled/languages.tsx ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD");t.LanguagesContainer=o.default.div`
  position: relative;
  top: ${-37.5}vh;
  z-index: 9999;
  background: ${r.light2};
  left: 0;
  width: 15vw;

  div.active_language {
    background: ${r.darkblue};
    color: ${r.light2};
    :hover{
      color: ${r.darkblue};
    }
  }
  div.inactive_language:hover {
    color: ${r.green};
  }
`,t.Languages=o.default.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 1fr;
  text-align: center;

  div {
    cursor: pointer;
    color: ${r.darkblue};
    height: ${5}vh;
    line-height: ${5}vh;
    font-size: ${4}vh;
    outline: 1px solid ${r.blue};
  }
`},ucJp:
/*!*****************************************!*\
  !*** ./src/write_sentence/ants/lock.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.lockAnt=function(e,t){const n=r.last(t.target.value).toLowerCase(),o=e.question[e.index].hidden[t.target.value.length-1];return void 0!==o&&n===o.toLowerCase()}},vrkp:
/*!*******************************!*\
  !*** ./src/root/rxImports.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(/*! rxjs/add/observable/combineLatest */"JwtW"),n(/*! rxjs/add/observable/dom/ajax */"4aHI"),n(/*! rxjs/add/observable/forkJoin */"5eVA"),n(/*! rxjs/add/observable/from */"7uu2"),n(/*! rxjs/add/observable/fromEvent */"sx9y"),n(/*! rxjs/add/observable/fromPromise */"K4wu"),n(/*! rxjs/add/observable/if */"tomz"),n(/*! rxjs/add/observable/interval */"TGZE"),n(/*! rxjs/add/observable/merge */"T3pr"),n(/*! rxjs/add/observable/of */"neMA"),n(/*! rxjs/add/observable/zip */"VBoa"),n(/*! rxjs/add/operator/combineAll */"yJZD"),n(/*! rxjs/add/operator/concat */"hyLG"),n(/*! rxjs/add/operator/concatAll */"wpj7"),n(/*! rxjs/add/operator/concatMap */"hh2c"),n(/*! rxjs/add/operator/debounce */"L+TF"),n(/*! rxjs/add/operator/debounceTime */"DlyV"),n(/*! rxjs/add/operator/delay */"yYKy"),n(/*! rxjs/add/operator/do */"92bn"),n(/*! rxjs/add/operator/filter */"fjAU"),n(/*! rxjs/add/operator/ignoreElements */"T6aK"),n(/*! rxjs/add/operator/map */"4XzM"),n(/*! rxjs/add/operator/mapTo */"Wj7N"),n(/*! rxjs/add/operator/mergeAll */"Jnez"),n(/*! rxjs/add/operator/sample */"RNrG"),n(/*! rxjs/add/operator/skip */"whEG"),n(/*! rxjs/add/operator/skipUntil */"Sg2c"),n(/*! rxjs/add/operator/switchMap */"MKA9"),n(/*! rxjs/add/operator/take */"VcZd"),n(/*! rxjs/add/operator/takeUntil */"6Ojo"),n(/*! rxjs/add/operator/throttle */"QU2U"),n(/*! rxjs/add/operator/throttleTime */"4PPT"),n(/*! rxjs/add/operator/toArray */"llKn"),n(/*! rxjs/add/operator/withLatestFrom */"964D")},"y5+H":
/*!*************************************************!*\
  !*** ./src/root/side_effects/settingsRandom.ts ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.settingsRandom=function(e,t){const n=!t.randomFlag;t.logged||r.setter("randomFlag",n);const o=Object.assign({},t.roughData,{random:Object.assign({},t.roughData.random,{active:n})});return Object.assign({},t,{randomFlag:n,roughData:o})}},y8dd:
/*!*****************************************!*\
  !*** ./src/learning_meme/component.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! react */"q1tI"),i=n(/*! react-redux */"/MKj"),a=n(/*! ./actions */"1Wps"),s=n(/*! ./auto_mode/acceptSpeech */"OOwW"),c=n(/*! ./styled/grid */"P2/E"),l=n(/*! ./styled/image */"s1Kj"),u=n(/*! ./styled/input */"6lbV"),d=n(/*! ./styled/question */"Wlfz"),p=n(/*! ./styled/sentence */"GfLB"),E=n(/*! ./styled/translation */"Qbxv");class f extends o.Component{constructor(e){super(e),this.onInput=this.onInput.bind(this)}onInput(e){if("Enter"===e.key)return this.props.dispatch(a.listen("ENTER"));this.props.dispatch(a.listen(e.target.value))}componentDidMount(){r.getter("mic")&&s.acceptSpeech(),this.props.dispatch(a.init())}render(){const{convertedImage:e,currentInstance:t,inputState:n,listen:r,question:i,ready:a,sentence:s}=this.props.learningMemeStore,f=void 0===t?"":!1===e?t.imageSrc:e;return o.createElement("div",null,a&&o.createElement(c.Container,null,o.createElement(u.InputContainer,null,o.createElement(u.Input,{id:"lm_input"},o.createElement("input",{autoFocus:a,onChange:this.onInput,onKeyPress:this.onInput,type:"text",value:n}))),o.createElement(d.QuestionContainer,null,o.createElement(d.Question,{id:"lm_question"},r&&o.createElement("div",null,o.createElement("span",{className:"fromWord"},i),o.createElement("span",{className:"toWord"},t.toWord)),!r&&o.createElement("div",null,o.createElement("span",{className:"fromWord"},t.fromWord),o.createElement("span",{className:"toWord"},t.toWord)))),o.createElement(p.SentenceContainer,null,o.createElement(p.Sentence,{id:"lm_context"},!r&&o.createElement("span",null,s.hidden),r&&o.createElement("span",null,s.visible))),o.createElement(l.ImageContainer,{id:"lm_image"},o.createElement(l.Image,{src:f})),o.createElement(E.TranslationContainer,null,o.createElement(E.Translation,{id:"lm_translated"},t.toPart))))}}t.LearningMeme=f;t.LearningMemeWrapped=i.connect(({learningMemeStore:e})=>({learningMemeStore:e}))(f)},yU31:
/*!****************************************!*\
  !*** ./src/choose_word/epics/click.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"MdxE");t.clickEpic=((e,t)=>e.ofType(r.CHOOSE_WORD_CLICK).filter(()=>t.getState().chooseWordStore.listen).map(({payload:e})=>o.check(e)))},ymlt:
/*!*****************************************!*\
  !*** ./src/lesson/bees/questionList.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o="WAITING",i="ACTIVE",a="[",s="]";function c(e){const[t]=e.split(a);let n=o;const r=[];let c="";return[...e].forEach(e=>e===a?n=i:e===s?(n=o,r.push(c),c=""):void(n!==o&&(c+=e))),[t,...r]}function l(e){const t=r.replace(/\./g," ",e);return r.remove(["[","]"],t)}t.wordListAnt=c,t.parseInputWhenComplex=l,t.questionListBee=function(e,t=!1){const n=t?l(e):e,[o,...i]=c(n);if(1===i.length){const e=[{correct:!0,text:o,status:"ACTIVE"},{correct:!1,text:i[0],status:"ACTIVE"}];return[{correct:!1,text:"_",status:"ACTIVE"},...r.shuffle(e)]}const[a,s]=r.shuffle(i),u=[{correct:!0,text:o,status:"ACTIVE"},{correct:!1,text:a,status:"ACTIVE"},{correct:!1,text:s,status:"ACTIVE"}];return r.shuffle(u)}}},[["2YZa","runtime~main","common"]]]);