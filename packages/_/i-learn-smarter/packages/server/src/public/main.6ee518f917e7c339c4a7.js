(window.webpackJsonp=window.webpackJsonp||[]).push([["main"],{"+0l1":
/*!*****************************************!*\
  !*** ./src/learning_meme/epics/init.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../actions */"1Wps"),s=n(/*! ../../_modules/createDB */"vQGA");t.initEpic=((e,t)=>{const n=e.ofType(r.INIT_READY),a=e.ofType(r.LEARNING_MEME_INIT);return o.Observable.combineLatest(n,a).map(()=>i.initReady(s.createDB(t)))})},"+3tB":
/*!**************************************************!*\
  !*** ./src/root/user/_helpers/getCredentials.ts ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.getCredentials=function(){const e=r.getter("userDBName"),t=r.getter("password");return!(!e||!t)&&{userDBName:e,password:t}}},"+aNb":
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
`},"+waF":
/*!**************************************!*\
  !*** ./src/root/user/epics/index.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./login */"IgLH"),i=n(/*! ./register */"wmyC");t.userEpic=r.combineEpics(o.loginEpic,i.registerEpic)},"/4J7":
/*!*************************************!*\
  !*** ./src/_helpers/bees/isNext.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=["nächste","tschüss","next","следващ"];t.isNextBee=function(e){return r.includes(e)}},"/I9d":
/*!******************************************!*\
  !*** ./src/select_article/epics/stop.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../../root/actions */"X9xb");t.stopEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_STOP).switchMap(()=>new r.Observable(e=>{const{textToSpeechFlag:n}=function(e){const{textToSpeechFlag:t}=e.getState().store;return{textToSpeechFlag:t}}(t);n&&e.next(i.sharedSpeak("fromPart")),e.complete()})))},"/ZOX":
/*!****************************************!*\
  !*** ./src/select_article/reducers.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o={currentIndex:-1,currentInstance:{fromPart:"",imageSrc:"",toPart:"",wordList:[]},db:[],listen:!1,ready:!1};t.selectArticleStore=function(e=o,t){switch(t.type){case r.SELECT_ARTICLE_INIT_READY:return Object.assign({},e,{currentIndex:-1},t.payload);case r.SELECT_ARTICLE_NEXT_READY:return Object.assign({},e,{ready:!0,listen:!0},t.payload);case r.SELECT_ARTICLE_STOP:return Object.assign({},e,{listen:!1});case r.SELECT_ARTICLE_CLICK_READY:return Object.assign({},e,{currentInstance:Object.assign({},e.currentInstance,{wordList:t.payload})});case r.SELECT_ARTICLE_UNMOUNT:return Object.assign({},e,o);default:return e}}},"/szH":
/*!*************************************!*\
  !*** ./src/root/user/component.tsx ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./components/form */"HvoL"),s=n(/*! ./components/settings */"wbcH"),a=n(/*! ./styled */"mtq/");class c extends r.Component{constructor(e){super(e)}render(){return r.createElement("div",null,r.createElement(a.Container,null,!this.props.store.logged&&r.createElement(i.UserForm,Object.assign({},this.props)),this.props.userStore.ready&&r.createElement(s.UserSettings,Object.assign({},this.props))))}}t.User=c;t.UserWrapped=o.connect(({userStore:e,store:t})=>({userStore:e,store:t}))(c)},"0Sgv":
/*!**************************************!*\
  !*** ./src/guess_word/component.tsx ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"0Yy6"),s=n(/*! ./guessWord */"fJpv");t.GuessWordWrapped=o.connect(({store:e,guessWordStore:t})=>({store:e,guessWordStore:t}))(class extends r.PureComponent{componentDidMount(){this.props.dispatch(i.init())}render(){const{ready:e}=this.props.guessWordStore;return r.createElement("div",null,e&&r.createElement(s.GuessWord,Object.assign({},this.props)))}})},"0Yy6":
/*!***********************************!*\
  !*** ./src/guess_word/actions.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.GUESS_WORD_CHECK),t.init=r.createAction(o.GUESS_WORD_INIT),t.initReady=r.createAction(o.GUESS_WORD_INIT_READY),t.input=r.createAction(o.GUESS_WORD_INPUT),t.inputChange=r.createAction(o.GUESS_WORD_INPUT_CHANGE),t.next=r.createAction(o.GUESS_WORD_NEXT),t.nextReady=r.createAction(o.GUESS_WORD_NEXT_READY),t.nextTick=r.createAction(o.GUESS_WORD_NEXT),t.stop=r.createAction(o.GUESS_WORD_STOP),t.unmount=r.createAction(o.GUESS_WORD_UNMOUNT)},"1HTa":
/*!******************************************!*\
  !*** ./src/learning_meme/ants/solved.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.solvedAnt=function(){return!document.querySelector("span.fromWord").textContent.includes("_")}},"1Wps":
/*!**************************************!*\
  !*** ./src/learning_meme/actions.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.init=r.createAction(o.LEARNING_MEME_INIT),t.initReady=r.createAction(o.LEARNING_MEME_INIT_READY),t.check=r.createAction(o.LEARNING_MEME_CHECK),t.stop=r.createAction(o.LEARNING_MEME_STOP),t.next=r.createAction(o.LEARNING_MEME_NEXT),t.nextReady=r.createAction(o.LEARNING_MEME_NEXT_READY),t.listen=r.createAction(o.LEARNING_MEME_LISTEN),t.setInput=r.createAction(o.LEARNING_MEME_SET_INPUT)},"1keb":
/*!*********************************************!*\
  !*** ./src/select_article/styled/image.tsx ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/image */"+aNb"),s=n(/*! ./grid */"GX+t");t.ImageContainer=r.default(o.CenteredItem)`
  grid-area: sa_image;
  height: ${7*s.frHeight}vh;
  width: 100%;
`,t.Image=i.ImageBase},"1uLi":
/*!*******************************************!*\
  !*** ./src/root/navigation/component.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ./styled/cells */"hULM"),o=n(/*! ./styled/grid */"5r7U"),i=r.CCell("nav_first"),s=r.CCell("nav_second"),a=r.CCell("nav_third"),c=r.CCell("nav_fourth"),l=r.CCell("nav_fifth"),u=r.CCell("nav_sixth"),d=r.CCell("nav_seventh"),p=n(/*! rambdax */"Ex95"),E=n(/*! react */"q1tI"),f=n(/*! react-redux */"/MKj"),g=n(/*! react-router-dom */"55Ip"),h=n(/*! ../../constants */"he5r");class m extends E.Component{render(){const e=""===p.last(window.location.href.split("/")),t=this.props.store.name===h.LEARNING_MEME&&!e;return E.createElement("div",null,this.props.navigationStore.active&&E.createElement(o.Container,null,E.createElement(o.Grid,null,E.createElement(i,null,!e&&E.createElement("span",null,E.createElement(g.Link,{to:"/learning-meme"},"Learning Meme"))),E.createElement(s,null,E.createElement("span",null,E.createElement(g.Link,{to:"/write-sentence"},"Write Sentence"))),E.createElement(a,null,E.createElement("span",null,E.createElement(g.Link,{to:"/choose-word"},"Choose Word"))),E.createElement(c,null,E.createElement("span",null,E.createElement(g.Link,{to:"/guess-word"},"Guess Word"))),E.createElement(l,null,E.createElement("span",null,E.createElement(g.Link,{to:"/select-article"},"Select Article"))),E.createElement(u,null,E.createElement("span",null,E.createElement(g.Link,{to:"/user"},"User"))),E.createElement(d,null,!t&&E.createElement("span",null,E.createElement(g.Link,{to:"/"},"Home"))))))}}t.Navigation=m;t.NavigationWrapped=f.connect(({navigationStore:e,store:t})=>({navigationStore:e,store:t}))(m)},"2B74":
/*!******************************************!*\
  !*** ./src/root/carrier/styled/grid.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! rambdax */"Ex95"),s=n(/*! styled-components */"vOnD"),a=n(/*! ../../../_helpers/css_in_js/media */"D3rE"),c=i.glue("logo \n  c_info\n  . . \n  c_changelanguage \n  c_random \n  c_texttospeech \n  c_submit \n  c_next \n  . . .\n  points\n"),l=i.replace(". points","points points",c),{points:u}=r.getterAnt({points:0}),d=`grid-template-areas: "${l}";`,p=u>999?a.mediaImportant(d):a.media(d);t.Container=s.default.div`
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
`;const E=s.default.div`
  width: 8vw;
  height: 10vh;
`;t.LogoCell=s.default(E)`
  grid-area: logo;
`,t.createIconCell=function(e,t){const n=40,r=i.defaultTo(!0,t)?"hvr-pulse":"";return{inner:s.default.canvas.attrs({height:n,id:`icon_${e}`,width:n})``,outer:s.default.div.attrs({className:r})`
    grid-area: c_${e};
    height: 8vh;
    text-align: center;  
    width: 7.8vw;
  `}},t.Points=s.default(E)`
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(/*! ./root/carrier/style.css */"B3gl"),n(/*! ./root/rxImports */"vrkp");const r=n(/*! client-helpers */"RQK/"),o=n(/*! ./_modules/rootInit */"MTn+"),i=n(/*! ./constants */"he5r");r.initLocalState("SK",i.defaultState);const s=n(/*! connected-react-router */"PBcv"),a=n(/*! react */"q1tI"),c=n(/*! react-dom */"i8i4"),l=n(/*! @sentry/browser */"abTI"),u=n(/*! react-redux */"/MKj"),d=n(/*! react-router-dom */"55Ip"),p=n(/*! rxjs/Observable */"4c1C"),E=n(/*! history */"YHGo"),f=n(/*! redux */"fvjX"),g=n(/*! redux-observable */"NOGq"),h=n(/*! ./_helpers/mini/createElement */"5bQO"),m=n(/*! ./_helpers/mini/getCompose */"N0V8"),_=n(/*! notify/component */"dS5j"),S=n(/*! ./choose_word/component */"FGAa"),v=n(/*! ./guess_word/component */"0Sgv"),O=n(/*! ./learning_meme/component */"y8dd"),C=n(/*! ./lesson/component */"ZhGE"),T=n(/*! ./root/carrier/component */"CIU0"),N=n(/*! ./root/navigation/component */"1uLi"),b=n(/*! ./root/user/component */"/szH"),y=n(/*! ./select_article/component */"fqjP"),I=n(/*! ./write_sentence/component */"mfjz"),x=n(/*! ./_modules/getJSON */"ajio"),A=n(/*! ./_modules/getPouchDB */"mFFS"),w=n(/*! ./_modules/getUserData */"NCrD"),R=n(/*! ./_modules/post */"JTIw"),P=n(/*! ./root/actions */"X9xb"),L=n(/*! ./root/combinedReducers */"l7n/"),M=n(/*! ./root/epics/ */"7Xab"),D={getJSON:e=>p.Observable.fromPromise(x.getJSON(e)),getPouchDB:A.getPouchDB,getUserData:e=>p.Observable.fromPromise(w.getUserData(e)),postRequest:(e,t)=>p.Observable.fromPromise(R.post(e,t))},j=g.createEpicMiddleware(M.rootEpic,{dependencies:D}),W="react-container";h.createElement(W);const G=m.getCompose(),U=E.createBrowserHistory(),H=f.createStore(s.connectRouter(U)(L.combinedReducers),G(f.applyMiddleware(s.routerMiddleware(U),j)));const k=u.connect(({store:e,navigationStore:t})=>({navigationStore:t,store:e}))(class extends a.Component{constructor(e){super(e),o.rootInit()}componentDidMount(){l.init({dsn:"https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126"}),this.props.dispatch(P.init())}componentDidCatch(e){l.captureException(e)}render(){return a.createElement("div",null,a.createElement(_.Notify,null),a.createElement(T.CarrierWrapped,null),a.createElement(s.ConnectedRouter,{history:U},a.createElement("div",null,a.createElement(N.NavigationWrapped,null),a.createElement(d.Route,{component:O.LearningMemeWrapped,exact:!0,path:"/"}),a.createElement(d.Route,{component:C.LessonWrapped,path:"/lesson-*"}),a.createElement(d.Route,{component:y.SelectArticleWrapped,exact:!0,path:"/select-article"}),a.createElement(d.Route,{component:v.GuessWordWrapped,exact:!0,path:"/guess-word"}),a.createElement(d.Route,{component:O.LearningMemeWrapped,exact:!0,path:"/learning-meme"}),a.createElement(d.Route,{component:I.WriteSentenceWrapped,exact:!0,path:"/write-sentence"}),a.createElement(d.Route,{component:S.ChooseWordWrapped,exact:!0,path:"/choose-word"}),a.createElement(d.Route,{component:b.UserWrapped,exact:!0,path:"/user"}))))}});c.render(a.createElement(u.Provider,{store:H},a.createElement(k,null)),document.getElementById(W))},"2py+":
/*!****************************************!*\
  !*** ./src/choose_word/epics/check.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"MdxE");t.checkEpic=((e,t)=>e.ofType(o.CHOOSE_WORD_CHECK).switchMap(e=>new r.Observable(n=>{const r=(e=>"UP"===e.payload?0:"DOWN"===e.payload?2:1)(e),{correctAnswer:o,index:s,question:a}=t.getState().chooseWordStore;o[s]===a[s][r]&&n.next(i.incPoints()),n.next(i.step()),n.complete()})))},"3vFA":
/*!***************************************!*\
  !*** ./src/guess_word/epics/index.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"QH2t"),i=n(/*! ./init */"ikCi"),s=n(/*! ./initReady */"o2aO"),a=n(/*! ./input */"oztT"),c=n(/*! ./next */"m+B3");t.guessWordEpic=r.combineEpics(o.checkEpic,a.inputEpic,s.initReadyEpic,c.nextEpic,i.initEpic)},"3xLh":
/*!*******************************************!*\
  !*** ./src/_helpers/rabbits/okCorrect.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.okCorrectRabbit=function(e,t){return Object.assign({},e,{okCorrect:r.update(e.index,t,e.okCorrect)})}},"49dL":
/*!*****************************************!*\
  !*** ./src/write_sentence/ants/auto.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../actions */"o/T1"),i=n(/*! ./lastWord */"KZC7");t.autoAnt=async function(e,t,n){await r.delay(2*t);let s=0;for(;;)s++,await r.delay(t),s>5&&i.lastWordAnt()&&(await r.delay(n),s=0),e(o.listen("SPACE"))}},"4MmZ":
/*!********************************************!*\
  !*** ./src/write_sentence/epics/listen.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r"),s=n(/*! ../actions */"o/T1"),a="_";t.listenEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_LISTEN).switchMap(e=>new o.Observable(n=>{const{index:o,inputState:i,listen:c,question:l}=t.getState().writeSentenceStore,u=r.allTrue(c,()=>l[o].hidden.length===i.length);if(r.allTrue(c,"SPACE"===e.payload||u))n.next(s.check());else if(c){const t=function({question:e,index:t,input:n}){const o=e[t],i=n.length-1;if(o.visible[i]!==a)return e;const s=o.visible.split(""),c=r.update(i,r.last(n),s).join("");return r.update(t,Object.assign({},o,{visible:c}),e)}({index:o,input:e.payload,question:l});n.next(s.setInput({input:e.payload,question:t}))}else n.next(s.next());n.complete()})))},"4Owf":
/*!***************************************!*\
  !*** ./src/lesson/epics/initReady.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.LESSON_INIT_READY).map(()=>({type:"REPLACE_ME"})))},"5/+n":
/*!********************************************!*\
  !*** ./src/choose_word/epics/initReady.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.CHOOSE_WORD_INIT_READY).map(()=>({type:r.CHOOSE_WORD_NEXT})))},"5E6V":
/*!********************************!*\
  !*** ./src/root/epics/init.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! rxjs/Observable */"4c1C"),s=n(/*! ./../../constants */"he5r"),a=n(/*! ./../actions */"X9xb");t.initEpic=((e,t,{getJSON:n,getUserData:c,getPouchDB:l})=>e.ofType(s.INIT).switchMap(()=>new i.Observable(e=>{i.Observable.forkJoin(n(s.DB_URL),c(l)).subscribe(([t,n])=>{e.next(a.initReady({received:function(e){return r.getter("child")?{rows:e.rows.filter(o.path("doc.pcFlag"))}:e}(t),userData:n})),e.complete()})})))},"5bQO":
/*!********************************************!*\
  !*** ./src/_helpers/mini/createElement.ts ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=function(e){const t=document.createElement("div");t.setAttribute("id",e),document.body.appendChild(t)}},"5r7U":
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./styled/question */"MLjJ");t.QuestionList=function(e){const{question:t,index:n}=e;return r.createElement(r.Fragment,null,t.map((e,i)=>{const s=i===n?o.QuestionActive:i>n?o.QuestionVisible:o.QuestionHidden;return r.createElement(s,{key:i},t[i].visible)}))}},"6QB+":
/*!*****************************************!*\
  !*** ./src/learning_meme/epics/next.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rambdax */"Ex95"),i=n(/*! rxjs/Observable */"4c1C"),s=n(/*! string-fn */"DOxJ"),a=n(/*! ../../_helpers/getNextIndex */"noCf"),c=n(/*! ../../_modules/getConvertedImage */"Ec1U"),l=n(/*! ../../_modules/selectors */"6QbG"),u=n(/*! ../actions */"1Wps"),d=n(/*! ../../_modules/setConvertedImage */"wZsN"),p=n(/*! client-helpers */"RQK/");t.nextEpic=((e,t)=>e.ofType(r.LEARNING_MEME_NEXT).switchMap(()=>new i.Observable(e=>{const{textToSpeechFlag:n}=l.getCommons(t),{currentIndex:i,db:E}=t.getState().learningMemeStore,{easy:f,easier:g,easiest:h,random:m}=p.getterAnt(r.urlInputsDefault),_=h?1:4,S=a.getNextIndex({index:i,length:E.length}),v=E[S],O=[...s.maskSentence({charLimit:_,easyMode:f,easierMode:g,randomMode:m,sentence:v.fromWord}).visible].join(" "),C=s.maskSentence({charLimit:_,easyMode:f,easierMode:g,sentence:v.fromPart,words:v.fromWord.split(" ")}),T=o.map(e=>e.join(" ").trim(),C);c.getConvertedImage(v).then(t=>{const o={convertedImage:t,currentIndex:S,currentInstance:v,question:O,sentence:T};e.next(u.nextReady(o)),n&&e.next(r.sharedSpeak("toPart")),d.setConvertedImage(v),e.complete()})})))},"6QGu":
/*!******************************************!*\
  !*** ./src/lesson/epics/initQuestion.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../constants */"he5r"),i=e=>{const{currentStep:t}=e.getState().lessonStore,n=t.example.split(" ").map(e=>e.includes("][")?function(e){const[t,n,o]=e.s(r.replace(/\]|\[/g," ")).s(r.split(" ")).s(r.filter(e=>""!==e.trim())),i=[{correct:!0,text:t,status:"ACTIVE"},{correct:!1,text:n,status:"ACTIVE"},{correct:!1,text:o,status:"ACTIVE"}];return r.shuffle(i)}(e):e);return{type:o.LESSON_QUESTION_READY,payload:n}};t.initQuestionEpic=((e,t)=>e.ofType(o.LESSON_NEXT).filter(()=>(e=>e.getState().lessonStore.currentStep.example)(t)).map(()=>i(t)))},"6QbG":
/*!***********************************!*\
  !*** ./src/_modules/selectors.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! reselect */"G4qV"),o=e=>e.fromLanguage,i=e=>e.toLanguage,s=r.createSelector(o,i,(e,t)=>({fromLanguage:e,toLanguage:t}));t.commonSelector=r.createSelector(o,e=>e.name,e=>e.randomFlag,e=>e.textToSpeechFlag,i,(e,t,n,r,o)=>({fromLanguage:e,name:t,randomFlag:n,textToSpeechFlag:r,toLanguage:o})),t.storeSelector=r.createSelector(e=>e.getState().store,e=>e),t.getLanguagePair=(e=>s(t.storeSelector(e))),t.getCommons=(e=>t.commonSelector(e.getState().store))},"6lbV":
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! notify/epic */"MUGr"),i=n(/*! ./click */"KN0k"),s=n(/*! ./general */"V/P4"),a=n(/*! ./init */"5E6V"),c=n(/*! ./notify */"Y8OM"),l=n(/*! ./sharedChangeSettings */"hnD8"),u=n(/*! ./sharedSpeak */"dt5O"),d=n(/*! ../../choose_word/epics/ */"HY6S"),p=n(/*! ../../guess_word/epics/ */"3vFA"),E=n(/*! ../../learning_meme/epics/ */"iWvF"),f=n(/*! ../../lesson/epics/ */"RQrR"),g=n(/*! ../../select_article/epics/ */"JDZ+"),h=n(/*! ../../write_sentence/epics/ */"S9pt"),m=n(/*! ../user/epics/ */"+waF"),_=n(/*! ./infoEpic */"Gtzr"),S=n(/*! ./sharedAddPoints */"UHcP");t.rootEpic=r.combineEpics(f.lessonEpic,g.selectArticleEpic,_.infoEpic,d.chooseWordEpic,i.clickEpic,s.generalEpic,p.guessWordEpic,a.initEpic,E.learningMemeEpic,c.notifyEpic,o.notifyEpic,S.sharedAddPointsEpic,l.sharedChangeSettingsEpic,u.sharedSpeakEpic,m.userEpic,h.writeSentenceEpic)},"7YPl":
/*!*************************************************!*\
  !*** ./src/root/carrier/icons/textToSpeech.tsx ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.textToSpeechPath="m24.1 7.9v24.2q0 0.6-0.4 1t-1 0.5-1-0.5l-7.4-7.4h-5.9q-0.6 0-1-0.4t-0.4-1v-8.6q0-0.6 0.4-1t1-0.4h5.9l7.4-7.4q0.4-0.5 1-0.5t1 0.5 0.4 1z m8.6 12.1q0 1.7-0.9 3.2t-2.5 2q-0.3 0.2-0.6 0.2-0.6 0-1-0.5t-0.4-1q0-0.4 0.2-0.8t0.7-0.5 0.7-0.5 0.7-0.8 0.3-1.3-0.3-1.3-0.7-0.8-0.7-0.5-0.7-0.5-0.2-0.8q0-0.6 0.4-1t1-0.5q0.3 0 0.6 0.2 1.5 0.6 2.5 2t0.9 3.2z"},"7uE1":
/*!******************************!*\
  !*** ./src/root/reducers.ts ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o=n(/*! ../_helpers/getInitialState */"8/XC"),i=n(/*! ../_helpers/normalizeDB */"eKGT"),s=n(/*! ../constants */"he5r"),a=n(/*! ./side_effects/languageChangeClick */"9NNQ"),c=n(/*! ./side_effects/settingsRandom */"y5+H"),l=n(/*! ./side_effects/settingsTextToSpeech */"Gn8X");t.store=function(e=o.getInitialState(),t){switch(t.type){case r.INIT_READY:return Object.assign({},e,t.payload.userData.forRootReducer,{db:i.normalizeDB(t.payload.received.rows),ready:!0});case r.LANGUAGE_CHANGE_INIT:return Object.assign({},e,{toggleLanguage:!e.toggleLanguage});case r.LANGUAGE_CHANGE_CLICK:return a.languageChangeClick(t,e);case r.SETTINGS_RANDOM:return c.settingsRandom(t,e);case r.SETTINGS_TEXT_TO_SPEECH:return l.settingsTextToSpeech(t,e);case r.SHARED_ADD_POINTS_READY:return Object.assign({},e,{points:t.payload});case r.SHARED_INIT:return Object.assign({},e,{name:t.payload});case r.POUCH_USER_READY:return Object.assign({},e,{logged:!0,points:t.payload.data.points,randomFlag:t.payload.data.randomFlag,textToSpeechFlag:t.payload.data.textToSpeechFlag,userDBCloud:t.payload.userDBCloud});case s.USER_LOGOUT:return o.getInitialState();default:return e}}},"8/XC":
/*!*****************************************!*\
  !*** ./src/_helpers/getInitialState.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! ../constants */"he5r"),{randomFlag:s,textToSpeechFlag:a,points:c,fromLanguage:l,toLanguage:u}=r.getterAnt(i.defaultState),d={changeLanguage:{roughness:.6,fill:o.darkblue3,fillWeight:2},info:{roughness:.3,fill:o.green,fillWeight:3},next:{roughness:.5,fill:o.darkblue3},random:{roughness:0,active:s},submit:{roughness:.5,fill:o.darkblue3},textToSpeech:{roughness:0,active:a,fillWeight:2}};t.getInitialState=function(){return{fromLanguage:l,instructions:"",logged:!1,name:"",points:c,randomFlag:s,ready:!1,roughData:d,textToSpeechFlag:a,toLanguage:u,toggleLanguage:!1}}},"81cQ":
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../_helpers/getNextIndex */"noCf"),o=n(/*! ../constants */"he5r"),i={currentIndex:0,currentStep:{},isExample:!1,ready:!1,showQuestion:!1,steps:[]};t.lessonStore=function(e=i,t){const n={index:0};switch(t.type){case o.LESSON_SELECT:return Object.assign({},e,{question:t.payload});case o.LESSON_QUESTION_READY:return Object.assign({},e,{showQuestion:!0,question:t.payload});case o.LESSON_NEXT:return n.index=r.getNextIndex({length:e.steps.length,index:e.currentIndex}),Object.assign({},e,{showQuestion:!1,currentIndex:n.index,currentStep:e.steps[n.index]});case o.LESSON_INIT_READY:return Object.assign({},e,{ready:!0,currentStep:t.payload[0],steps:t.payload});default:return e}}},"9NNQ":
/*!******************************************************!*\
  !*** ./src/root/side_effects/languageChangeClick.ts ***!
  \******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.languageChangeClick=function(e,t){return r.setter("fromLanguage",e.payload.from),r.setter("toLanguage",e.payload.to),Object.assign({},t,{fromLanguage:e.payload.from,toLanguage:e.payload.to,toggleLanguage:!t.toggleLanguage})}},"A+jW":
/*!************************************!*\
  !*** ./src/_helpers/bees/click.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.clickBee=function(e){document.getElementById(`icon_${e}`).click()}},B3gl:
/*!************************************!*\
  !*** ./src/root/carrier/style.css ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){var r=n(/*! !../../../node_modules/css-loader!./style.css */"bVGQ");"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(/*! ../../../node_modules/style-loader/lib/addStyles.js */"aET+")(r,o);r.locals&&(e.exports=r.locals)},BtHC:
/*!*******************************************!*\
  !*** ./src/guess_word/styled/related.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"M5ZK");t.RelatedContainer=o.default(i.CenteredItem)`
  height: ${2*s.frHeight}vh;
  grid-area: gw_related;
  outline: dashed ${r.teal2};
`,t.Related=o.default(s.Text)`
  text-align:center;
  font-weight: 600;
  color: ${r.grey4};
`},"C+yF":
/*!*******************************************!*\
  !*** ./src/choose_word/epics/keypress.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r"),s=n(/*! ../actions */"MdxE"),a=n(/*! ../actions */"MdxE");t.keypressEpic=((e,t)=>{const n=o.Observable.fromEvent(document,"keydown"),c=e.ofType(i.CHOOSE_WORD_NEXT_READY);return n.withLatestFrom(c).concatMap(([e,n])=>new o.Observable(n=>{const o=t.getState().chooseWordStore.listen,i=e.code;o||n.next(a.next());const c=!!(i.startsWith("Arrow")&&o)&&r.replace("Arrow","",i).toUpperCase();!1!==c&&n.next(s.check(c)),n.complete()}))})},CIU0:
/*!****************************************!*\
  !*** ./src/root/carrier/component.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ./icons/changeLanguage */"N6ga"),i=n(/*! ./icons/info */"IaSr"),s=n(/*! ./icons/next */"O4Tl"),a=n(/*! ./icons/random */"Y6KQ"),c=n(/*! ./icons/submit */"Fu44"),l=n(/*! ./icons/textToSpeech */"7YPl"),u=n(/*! ./styled/grid */"2B74"),d=u.createIconCell("info"),p=u.createIconCell("random"),E=u.createIconCell("changelanguage",!1),f=u.createIconCell("submit"),g=u.createIconCell("next"),h=u.createIconCell("texttospeech"),m=n(/*! colors */"dBCm"),_=n(/*! rambdax */"Ex95"),S=n(/*! react */"q1tI"),v=n(/*! react-redux */"/MKj"),O=n(/*! roughjs */"kfwI"),C=n(/*! ../navigation/styled/logo */"gdWI"),T=n(/*! ./languages */"VNSz"),N={changeLanguagePath:o.changeLanguagePath,infoPath:i.infoPath,nextPath:s.nextPath,randomPath:a.randomPath,submitPath:c.submitPath,textToSpeechPath:l.textToSpeechPath};class b extends S.Component{constructor(e){super(e),this.paint=this.paint.bind(this),this.singlePaint=this.singlePaint.bind(this)}singlePaint(e,t){const n=this.props.store.roughData[e],o=document.getElementById(`icon_${e.toLowerCase()}`);if(null===o)return;const i=O.default.canvas(o);t&&(n.active=!n.active);const s=_.defaultTo(.7,n.roughness),a=_.defaultTo(1,n.fillWeight),c=_.ifElse(_.isNil,()=>n.active?r.ICON_ACTIVE:r.ICON_PASSIVE,_.identity)(n.fill),l=N[`${e}Path`],u=m.dark6;i.path(l,{roughness:s,fill:c,fillWeight:a,stroke:u})}paint(){Object.keys(this.props.store.roughData).map(e=>this.singlePaint(e))}shouldComponentUpdate(e){return this.props.store.roughData.random.active!==e.store.roughData.random.active?this.singlePaint("random",!0):this.props.store.roughData.textToSpeech.active!==e.store.roughData.textToSpeech.active&&this.singlePaint("textToSpeech",!0),!0}componentDidMount(){this.paint()}render(){const e=this.props.store.fromLanguage,t=this.props.store.toLanguage;return S.createElement(u.Container,null,S.createElement(u.LogoCell,null,S.createElement(C.Logo,{id:"toggle-navigation"})),S.createElement(d.outer,null,S.createElement(d.inner,null)),S.createElement(E.outer,null,S.createElement(E.inner,null),this.props.store.toggleLanguage&&S.createElement(T.LanguagesComponent,{dispatch:this.props.dispatch,currentPair:`${e}${r.LANGUAGE_SEPARATOR}${t}`})),S.createElement(p.outer,null,S.createElement(p.inner,null)),S.createElement(h.outer,null,S.createElement(h.inner,null)),S.createElement(f.outer,null,S.createElement(f.inner,null)),S.createElement(g.outer,null,S.createElement(g.inner,null)),S.createElement(u.Points,{id:"points"},this.props.store.points))}}t.Carrier=b;t.CarrierWrapped=v.connect(({store:e})=>({store:e}))(b)},CZg4:
/*!*************************************!*\
  !*** ./src/_helpers/parseLesson.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.head,r.remove("#"),r.trim),i=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.tail),s=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.nth(1),r.trim),a=e=>r.piped(e,r.split("\n"),r.filter(Boolean),r.filter(r.startsWith(">")),r.ifElse(e=>e.length>0,e=>r.remove("> ",r.head(e)),r.always("")));t.parseLesson=function(e){return e.split("---").map(e=>{const t=o(e);return e.includes("[")&&e.includes("]")?{title:t,example:s(e),translation:a(e)}:{title:t,text:i(e)}})}},ChWf:
/*!***********************************!*\
  !*** ./src/lesson/epics/click.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../constants */"he5r");t.clickEpic=((e,t)=>e.ofType(o.LESSON_CLICK).map(({payload:e})=>(function(e,t){const{selection:n,i}=e,s=t.getState().lessonStore,a=s.question[e.i].map(e=>n===e.text?Object.assign({},e,{status:e.correct?"CORRECT":"WRONG"}):Object.assign({},e,{status:e.correct?"CORRECT":"INACTIVE"})),c=r.update(i,a,s.question);return{type:o.LESSON_SELECT,payload:c}})(e,t)))},D3rE:
/*!*****************************************!*\
  !*** ./src/_helpers/css_in_js/media.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.media=function(e){return r.glue(`\n  @media (max-width: 800px) {\n    ${e}\n  }\n  @media (max-height: 800px) {\n    ${e}    \n  }\n  `)},t.mediaImportant=function(e){return r.glue(`\n  @media (max-width: 2800px) {\n    ${e}\n  }\n  `)}},DZED:
/*!*************************************!*\
  !*** ./src/root/carrier/actions.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../../constants */"he5r");t.click=r.createAction(o.LANGUAGE_CHANGE_CLICK)},E6NO:
/*!*****************************************!*\
  !*** ./src/write_sentence/ants/getX.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../_helpers/mini/mobileFlag */"ay9D"),i=n(/*! ../styled/answer */"bjKX"),s=n(/*! ../styled/question */"MLjJ"),a=n(/*! ../styled/translation */"hEQj");t.getX=function(e){const t=o.mobileFlag(),n={Answer:i.AnswerSmall,Question:s.QuestionSmall,Translation:a.TranslationSmall},c={Answer:i.AnswerMobile,Question:s.QuestionMobile,Translation:a.TranslationSmall},l={Answer:i.Answer,Question:s.Question,Translation:a.Translation};return r.maybe(t,c,e?n:l)}},Ec1U:
/*!*******************************************!*\
  !*** ./src/_modules/getConvertedImage.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! localforage */"oAJy"),o=n(/*! ../_helpers/getConvertedNamespace */"e2sN");t.getConvertedImage=async function(e){const t=o.getConvertedNamespace(e.imageSrc),n=await r.getItem(t);return null!==n&&n}},EkVV:
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ./grid */"bELT"),s=i.cellHeight/3.15;t.Choice=o.default.div`
  line-height: ${s}vh;
  font-size: ${s/1.5}vh;
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"MdxE"),s=n(/*! ./chooseWord */"edGR");class a extends r.Component{componentDidMount(){this.props.dispatch(i.init())}render(){return r.createElement("div",null,this.props.chooseWordStore.ready&&r.createElement(s.ChooseWord,Object.assign({},this.props)))}}t.ChooseWordComponent=a;t.ChooseWordWrapped=o.connect(({chooseWordStore:e})=>({chooseWordStore:e}))(a)},Fu44:
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"P2/E");t.SentenceContainer=o.default(i.CenteredItem)`
  grid-area: sentence;
`,t.Sentence=o.default(s.Text)`
  color: ${r.dark7};
  padding-top: 0px;
`},Gn8X:
/*!*******************************************************!*\
  !*** ./src/root/side_effects/settingsTextToSpeech.ts ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.settingsTextToSpeech=function(e,t){const n=!t.textToSpeechFlag,r=Object.assign({},t.roughData,{textToSpeech:Object.assign({},t.roughData.textToSpeech,{active:n})});return Object.assign({},t,{roughData:r,textToSpeechFlag:n})}},GoLL:
/*!********************************!*\
  !*** ./src/_helpers/notify.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r");t.successLoginNotify=(()=>{return{payload:{message:"Successfully signed in",ms:r.LONG_DELAY},type:"notify@SUCCESS"}}),t.failLoginNotify=(()=>{return{payload:{message:"No such user or wrong password",ms:r.LONG_DELAY},type:"notify@ERROR"}}),t.invalidForm=(()=>{return{payload:{message:"Invalid email or password",ms:2e3},type:"notify@ERROR"}})},Gtzr:
/*!************************************!*\
  !*** ./src/root/epics/infoEpic.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! driver.js */"wkzA"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../../_helpers/infoSteps */"mi1x"),a=n(/*! ../../constants */"he5r");function c(e){const t=i.words(e.payload).map(o.head).map(o.toLower).join(""),n=s.infoSteps(t);if(void 0===n)return;const a=new r({animate:!0,opacity:.85});a.defineSteps(n),a.start()}t.infoEpic=((e,t)=>e.ofType(a.INFO).do(c).map(()=>({type:"infoEpic@IGNORE"})))},HY6S:
/*!****************************************!*\
  !*** ./src/choose_word/epics/index.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"2py+"),i=n(/*! ./click */"yU31"),s=n(/*! ./init */"rC4W"),a=n(/*! ./initReady */"5/+n"),c=n(/*! ./keypress */"C+yF"),l=n(/*! ./next */"k+nP"),u=n(/*! ./step */"qysT");t.chooseWordEpic=r.combineEpics(o.checkEpic,i.clickEpic,s.initEpic,a.initReadyEpic,c.keypressEpic,l.nextEpic,u.stepEpic)},HrOy:
/*!***************************************!*\
  !*** ./src/learning_meme/reducers.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o=n(/*! ../constants */"he5r"),i={convertedImage:!1,currentIndex:-1,inputState:"",listen:!1,question:"",ready:!1,sentence:{hidden:"",visible:""}};t.learningMemeStore=function(e=i,t){switch(t.type){case o.LEARNING_MEME_INIT_READY:return Object.assign({},e,{currentIndex:-1,db:t.payload});case o.LEARNING_MEME_READY:return Object.assign({},e,{ready:!0});case o.LEARNING_MEME_STOP:return Object.assign({},e,{listen:!1});case o.LEARNING_MEME_SET_INPUT:return Object.assign({},e,{inputState:t.payload});case r.LEARNING_MEME_NEXT_READY:return Object.assign({},e,{inputState:"",listen:!0,ready:!0},t.payload);case o.LEARNING_MEME_UNMOUNT:return Object.assign({},e,i);default:return e}}},HvoL:
/*!*******************************************!*\
  !*** ./src/root/user/components/form.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ../../../_helpers/notify */"GoLL"),i=n(/*! ../actions */"unZb"),s=n(/*! ../styled */"mtq/"),a=e=>e.email&&e.password&&e.email.length>5&&e.password.length>5;function c(){const e=document.getElementById("email"),t=document.getElementById("password"),n={email:e.value,password:t.value};return a(n)&&(e.value="",t.value=""),!!a(n)&&n}t.UserForm=class extends r.Component{constructor(e){super(e),this.onLoginClick=this.onLoginClick.bind(this),this.onRegisterClick=this.onRegisterClick.bind(this),this.whenPassword=this.whenPassword.bind(this)}onLoginClick(){const e=c(),t=!1===e?o.invalidForm():i.login(e);this.props.dispatch(t)}onRegisterClick(){const e=c(),t=!1===e?o.invalidForm():i.register(e);this.props.dispatch(t)}whenPassword(e){"Enter"===e.key&&this.onLoginClick()}render(){return r.createElement(s.FormContainer,null,r.createElement(s.Form,null,r.createElement("div",null,this.props.store.logged&&r.createElement("span",null,"Log in"),!this.props.store.logged&&r.createElement("span",null,"Create account")),r.createElement("div",null,r.createElement("input",{type:"email",name:"email",placeholder:"email",id:"email"})),r.createElement("div",null,r.createElement("input",{type:"password",name:"password",placeholder:"password",id:"password",onKeyPress:this.whenPassword})),r.createElement("div",null,r.createElement("button",{type:"button",onClick:this.onRegisterClick},"Register"),r.createElement("button",{type:"button",onClick:this.onLoginClick},"Login"))))}}},IaSr:
/*!*****************************************!*\
  !*** ./src/root/carrier/icons/info.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.infoPath="m27.3 30v2.9q0 0.5-0.4 1t-1 0.4h-11.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h1.5v-8.6h-1.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h8.6q0.6 0 1 0.4t0.4 1v12.9h1.5q0.5 0 1 0.4t0.4 1z m-2.9-25.7v4.3q0 0.6-0.4 1t-1 0.4h-5.7q-0.6 0-1-0.4t-0.4-1v-4.3q0-0.6 0.4-1t1-0.4h5.7q0.6 0 1 0.4t0.4 1z"},IgLH:
/*!**************************************!*\
  !*** ./src/root/user/epics/login.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../../../_helpers/notify */"GoLL"),a=n(/*! ../../../constants */"he5r"),c=n(/*! ../_helpers/saveCredentials */"Mfnc");t.loginEpic=((e,t,n)=>e.ofType(a.USER_LOGIN).switchMap(e=>new o.Observable(t=>{const o=n.getPouchDB(),l=i.snakeCase(e.payload.email),u=new o(`https://couchdb-7ea601.smileupps.com/${l}`,{skip_setup:!0});u.login(l,e.payload.password).then(({ok:n})=>{if(!n)return t.next(s.failLoginNotify()),t.complete();c.saveCredentials(l,e.payload.password),t.next(s.successLoginNotify()),u.get("data").then(e=>{const n={payload:{data:r.omit("_id,_rev",e),userDBCloud:u},type:a.POUCH_USER_READY};t.next(n)})}).catch(e=>{console.warn(e),t.complete()})})))},Iw3z:
/*!*******************************************!*\
  !*** ./src/select_article/epics/check.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../actions */"WVUV");function s(e){const{wordList:t}=e.getState().selectArticleStore.currentInstance;let n=!1;return{newWordList:t.map(e=>{const t="object"==typeof e&&e.solved;if("string"==typeof e||t)return e;n=!0;const r=e.articleSet.map(t=>{const n=t.value===e.correct?"CORRECT":"WRONG";return Object.assign({},t,{status:n})});return Object.assign({},e,{solved:!0,articleSet:r})}),changed:n}}t.checkEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_CHECK).filter(()=>s(t).changed).switchMap(e=>new r.Observable(e=>{e.next(i.clickReady(s(t).newWordList)),e.next(i.stop()),e.complete()})))},"JDZ+":
/*!*******************************************!*\
  !*** ./src/select_article/epics/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"Iw3z"),i=n(/*! ./click */"hKQu"),s=n(/*! ./initEpic */"sTV3"),a=n(/*! ./initReady */"XV4b"),c=n(/*! ./next */"Xydr"),l=n(/*! ./stop */"/I9d");t.selectArticleEpic=r.combineEpics(o.checkEpic,l.stopEpic,i.clickEpic,c.nextEpic,a.initReadyEpic,s.initEpic)},"JO/r":
/*!************************************************!*\
  !*** ./src/learning_meme/ants/acceptSpeech.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! ../../_helpers/bees/click */"A+jW"),s=n(/*! ../../_helpers/bees/isNext */"/4J7"),a=n(/*! ../../_helpers/mini/normalizeLanguage */"mVbh"),c=n(/*! ./solved */"1HTa"),l=700,u=1433;let d;async function p(e){const t=e.results[0][0].transcript;if(s.isNextBee(t))return i.clickBee("next");const n=document.getElementsByTagName("input");c.solvedAnt()||(n[0].value=t,await o.delay(d),i.clickBee("submit"),d!==u&&(await o.delay(2*d),i.clickBee("next")))}t.acceptSpeechAnt=function(){const e=r.getter("fromLanguage"),t=new webkitSpeechRecognition;d=o.defaultTo(u,1e3*r.getter("pause"));const n=e=>{e.error&&console.warn("ACCEPT_SPEECH"),t.stop(),o.delay(l).then(()=>t.start())};t.lang=a.normalizeLanguage(e),t.interimResults=!1,t.continious=!0,t.maxAlternatives=1,t.onerror=n,t.onresult=p,t.onspeechend=n,t.start()}},JTIw:
/*!******************************!*\
  !*** ./src/_modules/post.ts ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.post=(async(e,t)=>fetch(e,{body:JSON.stringify(t),headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"}))},Jn2w:
/*!**********************************************!*\
  !*** ./src/select_article/styled/select.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ./grid */"GX+t"),s=10*i.frHeight,a=s/7;t.SelectContainer=o.default.ul`
  display:inline-block;
  height: ${s}vh;
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
  height: ${a}vh;
  line-height: ${a}vh;
  font-size: ${a/2}vh;
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=r.flip(r.includes),i=n(/*! string-fn */"DOxJ"),s=["das","dem","den","der","des","die"],a=["als","ob","obwohl","trotzdem","weil","wenn"],c=["ein","eine","einem","einen","einer","eines"],l=["mein","meine","meinem","meinen","meiner","meines"],u=["dein","deine","deinem","deinen","deiner","deines"],d=["sein","seine","seinem","seinen","seiner","seines"],p=["ihr","ihre","ihrem","ihren","ihrer","ihres"],E=["unser","unsere","unserem","unseren","unserer","unseres"],f=["euer","eurem","euren","eurer","eurere","eures"];t.whichArticleSet=function(e){return r.switcher(e).is(o(s),s).is(o(u),u).is(o(c),c).is(o(p),p).is(o(l),l).is(o(d),d).is(o(E),E).is(o(f),f).default(a)},t.allArticles=[...s,...c,...l,...u,...d,...p,...E,...f,...a],t.filterAnt=function(e){return e.filter(r.has("dePart")).filter(e=>(function(e){return i.wordsX(e).map(r.toLower).reduce((e,n)=>t.allArticles.includes(n)?e+1:e,0)})(e.dePart)>1)}},Jwh9:
/*!*******************************************!*\
  !*** ./src/write_sentence/answerList.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! react */"q1tI"),i=n(/*! ./styled/answer */"bjKX");t.AnswerList=function(e){const{okCorrect:t,question:n,index:s}=e;return o.createElement(o.Fragment,null,n.map((e,n)=>{const a=r.maybe(n<s,t[n]?i.AnswerVisible:i.AnswerVisibleWrong,i.AnswerHidden);return o.createElement(a,{key:n},e.hidden)}))}},KN0k:
/*!*********************************!*\
  !*** ./src/root/epics/click.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../constants */"he5r");const s=2;t.clickEpic=((e,t)=>o.Observable.fromEvent(document,"click").switchMap(e=>new o.Observable(n=>{const o="CANVAS"===e.srcElement.nodeName,a=e.path.length>=s||o?function(e){let t="";for(const n of r.range(0,s+1))e.path[n].id&&(t=e.path[n].id);return t}(e):"",{name:c}=t.getState().store,l=function(e,t){switch(e){case"icon_changelanguage":return{type:i.LANGUAGE_CHANGE_INIT};case"toggle-navigation":return{type:i.NAVIGATION_TOGGLE};case"icon_info":return{type:i.INFO,payload:t};case"icon_next":return{type:`${t}@NEXT`};case"icon_submit":return{type:`${t}@CHECK`};case"icon_random":return{type:i.SETTINGS_RANDOM};case"icon_texttospeech":return{type:i.SETTINGS_TEXT_TO_SPEECH};default:return!1}}(a,c);if(!1===l)return n.complete();n.next(l),n.complete()})))},KZC7:
/*!*********************************************!*\
  !*** ./src/write_sentence/ants/lastWord.ts ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lastWordAnt=function(){const e=document.getElementById("ws_answer");if(null===e)return window.location.reload(!1);const t=e.querySelectorAll("span:last-child")[0];return"visible"===window.getComputedStyle(t).visibility}},M5ZK:
/*!****************************************!*\
  !*** ./src/guess_word/styled/grid.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! styled-components */"vOnD"),s=n(/*! ../../_styled/grid */"ZPtv");t.Container=i.default(s.ContainerBase)`
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
`,t.getFraction=s.fractionGetters(11,5).getFraction,t.frHeight=t.getFraction(1),t.Text=i.default.div`
  height: ${1*t.frHeight}vh;
  padding-top: ${.15*t.frHeight}vh;
  line-height: ${.7*t.frHeight}vh;
  font-size: ${.35*t.frHeight}vh;
  width: 100%;
`,t.CTextContainer=function(e){return i.default(s.CenteredItem)`
  height: ${1*t.frHeight}vh;
  grid-area: ${e};
`},t.CText=function(e){const n=o.defaultTo(r.dark3,e.color);return i.default(t.Text)`
  font-weight: ${o.defaultTo(!1,e.bold)?600:400};
  color: ${n};
`}},MKED:
/*!***************************************!*\
  !*** ./src/_helpers/mini/putAhead.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.putAhead=function(e,t){if(t<1)return e;const[n,r]=[e[0],e[t]];return e[0]=r,e[t]=n,e}},MLjJ:
/*!************************************************!*\
  !*** ./src/write_sentence/styled/question.tsx ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"oOQG");t.QuestionContainer=o.default(i.CenteredItem)`
  width: 100%;
  grid-area: ws_question;
`;const a=`\n  color: ${r.dark2};\n  letter-spacing: 0.1em;   \n\n  span:not(:first-child) {\n    margin-left: 6px;\n  }\n`;t.Question=o.default(s.getText(.96))`${a}`,t.QuestionSmall=o.default(s.getText(.31))`${a}`,t.QuestionMobile=o.default(s.getText(.19))`
  ${a}

  span:not(:first-child) {
    margin-left: 4px;
  }
`,t.QuestionActive=o.default.span`
  border: 0.5vh dashed ${r.green};
  padding: 0.5vh;
`,t.QuestionVisible=o.default.span`
  padding: 0.5vh;
  border: 5px solid ${i.background};  
  visibility: visible;
`,t.QuestionHidden=o.default.span`
  padding: 0.5vh;
  border: 5px solid ${i.background};  
  visibility: hidden;
`},"MTn+":
/*!**********************************!*\
  !*** ./src/_modules/rootInit.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../constants */"he5r");t.rootInit=function(){o.s(),r.resetter(s.resetUrlInputs);const e=o.pick(s.allowedUrlInputs,i.takeArguments(window.location.href)),t=e.adult?{child:!1}:{};r.masterSetter(Object.assign({},r.masterGetter(),e,t))}},MdxE:
/*!************************************!*\
  !*** ./src/choose_word/actions.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.CHOOSE_WORD_CHECK),t.click=r.createAction(o.CHOOSE_WORD_CLICK),t.init=r.createAction(o.CHOOSE_WORD_INIT),t.initReady=r.createAction(o.CHOOSE_WORD_INIT_READY),t.incIndex=r.createAction(o.CHOOSE_WORD_INC_INDEX),t.incPoints=r.createAction(o.CHOOSE_WORD_INC_POINTS),t.next=r.createAction(o.CHOOSE_WORD_NEXT),t.nextReady=r.createAction(o.CHOOSE_WORD_NEXT_READY),t.show=r.createAction(o.CHOOSE_WORD_SHOW),t.step=r.createAction(o.CHOOSE_WORD_STEP),t.stop=r.createAction(o.CHOOSE_WORD_STOP)},Mfnc:
/*!***************************************************!*\
  !*** ./src/root/user/_helpers/saveCredentials.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.saveCredentials=function(e,t){r.setter("userDBName",e),r.setter("password",t)}},N0V8:
/*!*****************************************!*\
  !*** ./src/_helpers/mini/getCompose.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux */"fvjX");t.getCompose=function(){return r.compose}},N6ga:
/*!***************************************************!*\
  !*** ./src/root/carrier/icons/changeLanguage.tsx ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.changeLanguagePath="m36.7 23.6q0 0.1 0 0.1-1.4 6-6 9.7t-10.6 3.7q-3.3 0-6.4-1.2t-5.4-3.5l-2.9 2.9q-0.4 0.4-1 0.4t-1-0.4-0.4-1v-10q0-0.6 0.4-1t1-0.4h10q0.6 0 1 0.4t0.5 1-0.5 1l-3 3q1.6 1.5 3.6 2.3t4.1 0.8q3 0 5.6-1.4t4.2-4q0.2-0.4 1.2-2.6 0.1-0.5 0.6-0.5h4.3q0.3 0 0.5 0.2t0.2 0.5z m0.6-17.9v10q0 0.6-0.4 1t-1 0.4h-10q-0.6 0-1-0.4t-0.5-1 0.5-1l3-3.1q-3.3-3-7.8-3-2.9 0-5.5 1.4t-4.2 4q-0.2 0.4-1.2 2.6-0.2 0.5-0.6 0.5h-4.5q-0.3 0-0.5-0.2t-0.2-0.5v-0.1q1.5-6 6-9.7t10.7-3.7q3.3 0 6.4 1.2t5.4 3.5l3-2.9q0.4-0.4 1-0.4t1 0.4 0.4 1z"},NCrD:
/*!*************************************!*\
  !*** ./src/_modules/getUserData.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../root/user/_helpers/getCredentials */"+3tB"),i=n(/*! ./userLogin */"flZ8");t.getUserData=async function(e){const t=o.getCredentials();if(!1===t)return{forRootReducer:{}};const{userDBName:n,password:s}=t,{ok:a,userDBCloud:c}=await i.userLogin({getPouchDB:e,password:s,userDBName:n});if(!a)return{forRootReducer:{}};const l=await c.get("data"),u=r.pick("points,randomFlag,textToSpeechFlag",l);return{forRootReducer:Object.assign({},u,{logged:!0,userDBCloud:c}),userDoc:l}}},O39Z:
/*!******************************************!*\
  !*** ./src/learning_meme/epics/check.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/bees/takeInput */"Zfto"),s=n(/*! ../../_modules/selectors */"6QbG"),a=n(/*! ../../constants */"he5r"),c=n(/*! ../../root/actions */"X9xb"),l=n(/*! ../actions */"1Wps");t.checkEpic=((e,t)=>e.ofType(a.LEARNING_MEME_CHECK).switchMap(e=>new r.Observable(e=>{const{textToSpeechFlag:n,fromLanguage:r}=s.getCommons(t),{currentInstance:u,inputState:d}=t.getState().learningMemeStore,p=i.takeInputBee(d);("DE"===r?o.distanceGerman:o.distance)(p,u.fromWord)<=1&&e.next(c.sharedAddPoints(1)),e.next(l.stop()),n&&e.next({type:a.SHARED_SPEAK,payload:"fromPart"}),e.complete()})))},O4Tl:
/*!*****************************************!*\
  !*** ./src/root/carrier/icons/next.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.nextPath="m9.5 36.9q-0.4 0.4-0.7 0.2t-0.3-0.7v-32.8q0-0.6 0.3-0.7t0.7 0.2l15.9 15.9q0.1 0.2 0.2 0.4v-15.1q0-0.6 0.5-1t1-0.4h2.8q0.6 0 1 0.4t0.5 1v31.4q0 0.6-0.5 1t-1 0.4h-2.8q-0.6 0-1-0.4t-0.5-1v-15.1q-0.1 0.2-0.2 0.4z"},OJQa:
/*!*************************************!*\
  !*** ./src/choose_word/reducers.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../constants */"he5r"),o={correctAnswer:[],currentIndex:-1,index:0,listen:!1,localPoints:0,question:[[]],ready:!1};t.chooseWordStore=function(e=o,t){switch(t.type){case r.CHOOSE_WORD_INIT_READY:return Object.assign({},e,{db:t.payload.db,fillerWords:t.payload.fillerWords});case r.CHOOSE_WORD_NEXT_READY:return Object.assign({},e,t.payload,{index:0,listen:!0,localPoints:0,ready:!0});case r.CHOOSE_WORD_INC_INDEX:return Object.assign({},e,{index:e.index+1});case r.CHOOSE_WORD_INC_POINTS:return Object.assign({},e,{localPoints:e.localPoints+1});case r.CHOOSE_WORD_STOP:return Object.assign({},e,{index:e.index+1,listen:!1,question:[[]]});case r.CHOOSE_WORD_UNMOUNT:return Object.assign({},e,o);default:return e}}},"P2/E":
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_modules/selectors */"6QbG"),s=n(/*! ../../constants */"he5r"),a=n(/*! ../../root/actions */"X9xb"),c=n(/*! ../actions */"0Yy6");t.checkEpic=((e,t)=>e.ofType(s.GUESS_WORD_CHECK).switchMap(e=>new r.Observable(e=>{const{textToSpeechFlag:n,fromLanguage:r}=i.getCommons(t),{wordAnswer:l,listen:u,inputState:d}=t.getState().guessWordStore;if(!u)return e.next(c.next()),e.complete();("DE"===r?o.distanceGerman:o.distance)(d.toLowerCase().trim(),l.toLowerCase())<=2&&e.next(a.sharedAddPoints(1)),e.next(c.stop()),n&&e.next({type:s.SHARED_SPEAK,payload:"fromPart"}),e.complete()})))},Qbxv:
/*!**************************************************!*\
  !*** ./src/learning_meme/styled/translation.tsx ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"P2/E");t.TranslationContainer=o.default(i.CenteredItem)`
  grid-area: translation;
`,t.Translation=o.default(s.Text)`
  color: ${r.darkblue7};
`},RQrR:
/*!***********************************!*\
  !*** ./src/lesson/epics/index.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./click */"ChWf"),i=n(/*! ./init */"Xnku"),s=n(/*! ./initQuestion */"6QGu"),a=n(/*! ./initReady */"4Owf");t.lessonEpic=r.combineEpics(s.initQuestionEpic,o.clickEpic,a.initReadyEpic,i.initEpic)},S9pt:
/*!*******************************************!*\
  !*** ./src/write_sentence/epics/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"luEA"),i=n(/*! ./init */"mmTX"),s=n(/*! ./initReady */"prBy"),a=n(/*! ./listen */"4MmZ"),c=n(/*! ./next */"Yr0F"),l=n(/*! ./step */"reJz");t.writeSentenceEpic=r.combineEpics(o.checkEpic,i.initEpic,s.initReadyEpic,a.listenEpic,c.nextEpic,l.stepEpic)},UHcP:
/*!*******************************************!*\
  !*** ./src/root/epics/sharedAddPoints.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! colors */"dBCm"),i=n(/*! rambdax */"Ex95"),s=n(/*! rxjs/Observable */"4c1C"),a=n(/*! ../../constants */"he5r"),c=n(/*! ../actions */"X9xb"),l=700,u={"animation-timing-function":"cubic-bezier(0.42, 0, 0.58, 1)",color:o.pink,opacity:.77,transform:"scale3d(1.18, 1.18, 1.18)"},d={"animation-timing-function":"cubic-bezier(0.42, 0, 0.58, 1)",color:o.pink6,opacity:.6,transform:"scale3d(0.97, 0.97, 0.97)"},p=Object.assign({},u,{transform:"scale3d(1.03, 1.03, 1.03)"}),E={"animation-timing-function":"cubic-bezier(0.25, 0.46, 0.45, 0.94)",color:o.navy,opacity:1,transform:"scale3d(1, 1, 1)"},f=[E,u,d,p,E];t.sharedAddPointsEpic=((e,t)=>e.ofType(a.SHARED_ADD_POINTS).switchMap(e=>new s.Observable(n=>{const{userDBCloud:o,points:s,logged:a}=t.getState().store,u=s+Number(e.payload);a||r.setter("points",u),document.getElementById("points").animate(f,{direction:"normal",duration:l,easing:"ease-in",iterations:1}),i.delay(l/2).then(()=>{if(n.next(c.sharedAddPointsReady(u)),!o)return n.complete();o.get("data").then(e=>{const t=Object.assign({},e,{points:s});o.put(t).then(n.complete)}).catch(e=>{console.error(e),n.complete()})})})))},"V/P4":
/*!***********************************!*\
  !*** ./src/root/epics/general.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rambdax */"Ex95"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../../constants */"he5r"),a=o.replace("@INIT","");const c=[r.LANGUAGE_CHANGE_CLICK,r.ROUTER_CHANGE,r.LEARNING_MEME_INIT,s.LESSON_INIT,r.WRITE_SENTENCE_INIT,s.SELECT_ARTICLE_INIT,r.GUESS_WORD_INIT,r.CHOOSE_WORD_INIT];t.generalEpic=((e,t)=>e.ofType(...c).map(e=>(function(e,t){switch(e.type){case r.LANGUAGE_CHANGE_CLICK:return{type:`${i.camelCase(t.getState().store.name)}@INIT`};case r.ROUTER_CHANGE:return{type:`${i.camelCase(t.getState().store.name)}@UNMOUNT`};default:return{type:r.SHARED_INIT,payload:a(e.type)}}})(e,t)))},"VB+0":
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ../../constants */"he5r"),i=n(/*! ./actions */"DZED"),s=n(/*! ./styled/languages */"uXMx");function a({dispatch:e,from:t,to:n,currentPair:s}){const a=`${t}${o.LANGUAGE_SEPARATOR}${n}`,c=a===s?"active_language":"inactive_language";return r.createElement(r.Fragment,null,r.createElement("div",{className:c,onClick:()=>e(i.click({from:t,to:n}))},a))}t.LanguagesComponent=function(e){return r.createElement(r.Fragment,null,r.createElement(s.LanguagesContainer,null,r.createElement(s.Languages,null,r.createElement(a,Object.assign({},e,{from:"DE",to:"EN"})),r.createElement(a,Object.assign({},e,{from:"DE",to:"BG"})),r.createElement(a,Object.assign({},e,{from:"EN",to:"DE"})),r.createElement(a,Object.assign({},e,{from:"EN",to:"BG"})),r.createElement(a,Object.assign({},e,{from:"BG",to:"DE"})),r.createElement(a,Object.assign({},e,{from:"BG",to:"EN"})))))}},Vkj9:
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"P2/E");t.QuestionContainer=o.default(i.CenteredItem)`
  grid-area: question;
`,t.Question=o.default(s.Text)`
  color: ${r.dark2};
  letter-spacing: 0.1em; 
`},X9xb:
/*!*****************************!*\
  !*** ./src/root/actions.ts ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.init=r.createAction(o.INIT),t.notifyInfo=r.createAction("notify@INFO"),t.initReady=r.createAction(o.INIT_READY),t.sharedAddPoints=r.createAction(o.SHARED_ADD_POINTS),t.sharedAddPointsReady=r.createAction(o.SHARED_ADD_POINTS_READY),t.sharedSpeak=r.createAction(o.SHARED_SPEAK)},XEOf:
/*!*****************************************!*\
  !*** ./src/guess_word/styled/image.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/image */"+aNb"),s=n(/*! ./grid */"M5ZK");t.ImageContainer=r.default(o.CenteredItem)`
  grid-area: gw_image;
  height: ${5*s.frHeight}vh;
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"WVUV");t.initReadyEpic=((e,t)=>e.ofType(r.SELECT_ARTICLE_INIT_READY).filter(()=>"DE"===t.getState().store.fromLanguage).map(o.next))},Xnku:
/*!**********************************!*\
  !*** ./src/lesson/epics/init.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../_helpers/parseLesson */"CZg4"),s=n(/*! ../../constants */"he5r"),a=n(/*! ../actions */"a44Q");async function c(e){const t=r.glue(`\n    https://gl.githack.com\n    dejantoteff\n    lessons\n    raw\n    master\n    ${r.remove("lesson-",e)}.md\n  `,"/"),n=await async function(e){return(await fetch(e,{method:"GET"})).text()}(t);return a.initReady(i.parseLesson(n))}t.initEpic=((e,t)=>e.ofType(s.LESSON_INIT).switchMap(({payload:e})=>(e=>o.Observable.fromPromise(c(e)))(e)))},Xydr:
/*!******************************************!*\
  !*** ./src/select_article/epics/next.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../../_helpers/getNextIndex */"noCf"),a=n(/*! ../ants/filter */"JqQx"),c=n(/*! ../../constants */"he5r"),l=n(/*! ../../root/actions */"X9xb"),u=n(/*! ../actions */"WVUV");t.nextEpic=((e,t)=>e.ofType(c.SELECT_ARTICLE_NEXT).switchMap(()=>new o.Observable(e=>{const{db:n,oldCurrentIndex:o,toLanguage:c,textToSpeechFlag:d}=function(e){const{currentIndex:t,db:n}=e.getState().selectArticleStore,{toLanguage:r,textToSpeechFlag:o}=e.getState().store;return{db:n,oldCurrentIndex:t,toLanguage:r.toLowerCase(),textToSpeechFlag:o}}(t),p=s.getNextIndex({index:o,length:n.length}),E=n[p],f=E[`${c}Part`],g=E.dePart,h=E.imageSrc;let m=0;const _={wordList:i.wordsX(E.dePart).map(e=>{if(!a.allArticles.includes(e.toLowerCase()))return e;const t=a.whichArticleSet(e.toLowerCase()),n=r.map(e=>({status:"ACTIVE",value:e}),t);return{solved:!1,correct:e.toLowerCase(),articleSet:n,index:m++}}),fromPart:g,toPart:f,imageSrc:h};e.next(u.nextReady({currentInstance:_,currentIndex:p})),d&&"en"===c&&e.next(l.sharedSpeak("toPart")),e.complete()})))},Y6KQ:
/*!*******************************************!*\
  !*** ./src/root/carrier/icons/random.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.randomPath="m14.9 10.7q-1.4 2.1-3.1 6.1-0.5-1-0.8-1.6t-0.9-1.4-1.2-1.3-1.4-0.7-1.8-0.4h-5q-0.3 0-0.5-0.2t-0.2-0.5v-4.3q0-0.3 0.2-0.5t0.5-0.2h5q5.6 0 9.2 5z m25.1 17.9q0 0.3-0.2 0.5l-7.1 7.1q-0.2 0.2-0.6 0.2-0.2 0-0.5-0.2t-0.2-0.5v-4.3q-0.7 0-1.9 0t-1.8 0.1-1.6-0.1-1.6-0.1-1.4-0.2-1.4-0.4-1.3-0.7-1.3-0.8-1.3-1.2-1.2-1.6q1.3-2.1 3-6.1 0.5 1 0.8 1.6t1 1.4 1.1 1.3 1.4 0.8 1.8 0.3h5.7v-4.3q0-0.3 0.2-0.5t0.5-0.2q0.3 0 0.6 0.2l7.1 7.2q0.2 0.2 0.2 0.5z m0-20q0 0.3-0.2 0.5l-7.1 7.1q-0.2 0.2-0.6 0.2-0.2 0-0.5-0.2t-0.2-0.5v-4.3h-5.7q-1.1 0-1.9 0.4t-1.6 1-1.1 1.3-1 1.8q-0.7 1.4-1.7 3.8-0.7 1.5-1.2 2.5t-1.2 2.3-1.4 2.2-1.6 1.9-2.1 1.5-2.3 1-2.9 0.3h-5q-0.3 0-0.5-0.2t-0.2-0.5v-4.3q0-0.3 0.2-0.5t0.5-0.2h5q1.1 0 2-0.3t1.5-1 1.1-1.4 1-1.7q0.8-1.4 1.8-3.8 0.6-1.5 1.1-2.5t1.2-2.4 1.4-2.2 1.7-1.9 2-1.5 2.4-0.9 2.8-0.4h5.7v-4.3q0-0.3 0.2-0.5t0.5-0.2q0.3 0 0.6 0.2l7.1 7.2q0.2 0.2 0.2 0.5z"},Y8OM:
/*!**********************************!*\
  !*** ./src/root/epics/notify.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"X9xb");function i(e){switch(e){case"DE":return"German";case"BG":return"Bulgarian";case"EN":return"English"}}function s(e){switch(e.type){case r.LANGUAGE_CHANGE_CLICK:return o.notifyInfo(function(e){return{message:`Now language direction is from '${i(e.payload.from)}' to '${i(e.payload.to)}'`,ms:1500}}(e))}}const a=[r.LANGUAGE_CHANGE_CLICK];t.notifyEpic=((e,t)=>e.ofType(...a).map(s))},YMUk:
/*!**********************************************!*\
  !*** ./src/select_article/selectArticle.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"WVUV"),i=n(/*! ./styled/grid */"GX+t"),s=n(/*! ./styled/image */"1keb"),a=n(/*! ./styled/select */"Jn2w"),c=n(/*! ./styled/translation */"VB+0"),l=n(/*! ./styled/words */"Vkj9");function u(e){const{article:t,i:n,dispatch:i,listen:s}=e,c=e=>{if(s)return i(o.click({article:t,word:e.target.textContent}));i(o.next())};return r.createElement(a.SelectContainer,null,t.articleSet.map((e,t)=>r.createElement(a.Select,{className:`selectable_${e.status.toLowerCase()}`,key:`${n}_${t}`,onClick:c},e.value)))}t.SelectArticle=class extends r.PureComponent{render(){const{wordList:e,toPart:t,imageSrc:n}=this.props.selectArticleStore.currentInstance;return r.createElement(i.Container,null,r.createElement(l.WordsContainer,null,e.map((e,t)=>"string"==typeof e?r.createElement("span",{key:t},e):r.createElement(u,{i:t,key:t,article:e,dispatch:this.props.dispatch,listen:this.props.selectArticleStore.listen}))),r.createElement(s.ImageContainer,null,r.createElement(s.Image,{src:n})),r.createElement(c.TranslationContainer,null,r.createElement(c.Translation,null,t)))}}},Yr0F:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/next.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! client-helpers */"RQK/"),i=n(/*! rambdax */"Ex95"),s=n(/*! rxjs/Observable */"4c1C"),a=n(/*! string-fn */"DOxJ"),c=n(/*! ../../_helpers/getNextIndex */"noCf"),l=n(/*! ../../_modules/selectors */"6QbG"),u=n(/*! ../actions */"o/T1"),d={type:r.SHARED_SPEAK,payload:"toPart"};t.nextEpic=((e,t)=>e.ofType(r.WRITE_SENTENCE_NEXT).concatMap(()=>new s.Observable(e=>{const{currentIndex:n,db:s,ready:p}=t.getState().writeSentenceStore,{easy:E,easier:f,easiest:g,random:h}=o.getterAnt(r.urlInputsDefault),{textToSpeechFlag:m}=l.getCommons(t),_=c.getNextIndex({index:n,length:s.length}),S=s[_],v=a.maskSentence({sentence:S.fromPart,easyMode:E,easierMode:f,randomMode:h,charLimit:g?1:4}),O=v.visible.map((e,t)=>({hidden:v.hidden[t],visible:e})),C={currentIndex:_,currentInstance:S,okCorrect:Array(O.length).fill(null),question:O};e.next(u.setNext(C));const T=p?r.NEXT_TICK:r.SHORT_DELAY;i.delay(T).then(()=>{e.next({type:r.WRITE_SENTENCE_READY}),m&&e.next(d),e.complete()})})))},YseZ:
/*!*****************************************************!*\
  !*** ./src/root/user/_helpers/removeCredentials.ts ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.removeCredentials=function(){r.setter("points",0),r.resetter(["userDBName","password"]),window.location.reload(!1)}},ZPtv:
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
`},Zfto:
/*!****************************************!*\
  !*** ./src/_helpers/bees/takeInput.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.takeInputBee=function(e){return e.trim().length>0?e.trim():document.getElementsByTagName("input")[0].value}},ZhGE:
/*!**********************************!*\
  !*** ./src/lesson/component.tsx ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),s=n(/*! react-redux */"/MKj"),a=n(/*! styled-components */"vOnD"),c=n(/*! ./actions */"a44Q"),l=n(/*! ./selectOption */"dGrs"),u=a.default.div`
  display: grid;
  grid-template-rows: 1fr 5fr 15fr 1fr;
  height: 89vh;
`,d=a.default.div`
  text-align: center;
  font-size: 4vh;
  padding-top: 8vh;
  background: ${r.dark2};
  color: ${r.light2};
`,p=a.default.p`
  font-size: 4vh;
  padding-left: 3vh;
`,E=a.default.div`
  padding-top: 2vh;
`,f=a.default.div``;class g extends i.Component{componentDidMount(){const e=o.last(window.location.href.split("/"));this.props.dispatch(c.init(e))}render(){const{lessonStore:e}=this.props;return e.ready?void 0!==e.currentStep.example?function(e,t){return e.showQuestion?i.createElement(l.SelectOption,{store:e,dispatch:t}):""}(e,this.props.dispatch):function(e){const{title:t,text:n}=e.lessonStore.currentStep;return i.createElement(u,null,i.createElement(f,null),i.createElement(d,null,t),i.createElement(E,null,n.map((e,t)=>i.createElement(p,{key:`single-line-${t}`},e))),i.createElement(f,null))}(this.props):""}}t.Lesson=g;t.LessonWrapped=s.connect(({lessonStore:e})=>({lessonStore:e}))(g)},a44Q:
/*!*******************************!*\
  !*** ./src/lesson/actions.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.next=r.createAction(o.LESSON_NEXT),t.click=r.createAction(o.LESSON_CLICK),t.initReady=r.createAction(o.LESSON_INIT_READY),t.init=r.createAction(o.LESSON_INIT)},ajio:
/*!*********************************!*\
  !*** ./src/_modules/getJSON.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getJSON=(async e=>{return(await fetch(e,{method:"GET"})).json()})},ay9D:
/*!*****************************************!*\
  !*** ./src/_helpers/mini/mobileFlag.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i={big:void 0,small:void 0};t.mobileFlag=o.once(()=>{const{big:e,small:t}=r.getterAnt(i);return!0!==e&&(!0===t||window.outerWidth<800)})},bELT:
/*!*****************************************!*\
  !*** ./src/choose_word/styled/grid.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv");t.cellHeight=25.7,t.Row=o.default.div`
  height: ${t.cellHeight}vh;
`;const s=o.default.div`
text-align: center;
padding-top: ${.12*t.cellHeight}vh;
line-height: ${.7*t.cellHeight}vh;
font-size: ${.17*t.cellHeight}vh;
height: ${t.cellHeight}vh;
`;t.Container=o.default(i.ContainerBase)`
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: "cw_question" "cw_solved" "cw_translation";
`,t.Translation=o.default(s)`
color: ${r.blue};
grid-area: cw_translation;
font-weight: bolder;
`,t.Solved=o.default(s)`
color:  ${r.darkblue7};
grid-area: cw_solved;
`},bVGQ:
/*!**************************************************************!*\
  !*** ./node_modules/css-loader!./src/root/carrier/style.css ***!
  \**************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){(t=e.exports=n(/*! ../../../node_modules/css-loader/lib/css-base.js */"I1BE")(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600,800&subset=cyrillic);",""]),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Kranky:400&subset=latin);",""]),t.push([e.i,"* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: 'Source Code Pro', monospace;\n}\nbody {\n  margin: 0;\n}\nhtml {\n  font-size: 16px;\n  overflow: hidden;\n  background-color: #b0bec5;\n}\n\n@media screen and (min-width: 1200px) {\n  font-size: 20px;\n}\n@media screen and (min-width: 900px) {\n  font-size: 18px;\n}\n@media screen and (min-width: 600px) {\n  font-size: 16px;\n}\n\n.hvr-pulse {\n  display: inline-block;\n  vertical-align: middle;\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px transparent;\n}\n.hvr-pulse:hover, .hvr-pulse:focus, .hvr-pulse:active {\n  animation-name: hvr-pulse;\n  animation-duration: 3s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n}\n@keyframes hvr-pulse {\n  25% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n  75% {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9);\n  }\n}\n\ndiv#driver-popover-item{display:none;position:absolute;background:#fff;color:#2d2d2d;margin:0;padding:15px;border-radius:5px;min-width:250px;max-width:300px;box-shadow:0 1px 10px rgba(0,0,0,.4);z-index:1000000000}div#driver-popover-item .driver-popover-tip{border:5px solid #fff;content:\"\";position:absolute}div#driver-popover-item .driver-popover-tip.bottom{bottom:-10px;border-top-color:#fff;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}div#driver-popover-item .driver-popover-tip.left{left:-10px;top:10px;border-top-color:transparent;border-right-color:#fff;border-bottom-color:transparent;border-left-color:transparent}div#driver-popover-item .driver-popover-tip.right{right:-10px;top:10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:#fff}div#driver-popover-item .driver-popover-tip.top{top:-10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:#fff;border-left-color:transparent}div#driver-popover-item .driver-popover-footer{display:block;clear:both;margin-top:5px}div#driver-popover-item .driver-popover-footer a{display:inline-block;padding:3px 10px;border:1px solid #d4d4d4;text-decoration:none;text-shadow:1px 1px 0 #fff;color:#2d2d2d;font:11px/normal sans-serif;cursor:pointer;outline:0;background-color:#f1f1f1;border-radius:2px;zoom:1;margin:10px 0 0}div#driver-popover-item .driver-popover-footer a.driver-disabled{color:gray;cursor:default;pointer-events:none}div#driver-popover-item .driver-popover-footer .driver-close-btn{float:left}div#driver-popover-item .driver-popover-footer .driver-btn-group{float:right}div#driver-popover-item .driver-popover-title{font:19px/normal sans-serif;margin:0 0 5px;font-weight:700;display:block;position:relative;line-height:1.5;zoom:1}div#driver-popover-item .driver-popover-description{margin-bottom:0;font:14px/normal sans-serif;line-height:1.5;color:#2d2d2d;font-weight:400;zoom:1}",""])},bjKX:
/*!**********************************************!*\
  !*** ./src/write_sentence/styled/answer.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_helpers/css_in_js/opacity */"gngI"),s=n(/*! ../../_styled/grid */"ZPtv"),a=n(/*! ./grid */"oOQG"),c=`color: ${r.darkblue};`,l=`color: ${r.light6};`,u=`border-top: solid 1px ${r.green4};`,d=`border-top: solid 1px ${r.red3};`;t.AnswerContainer=o.default(s.CenteredWithId("ws_answer"))`
  width: 100%;
  grid-area: ws_answer;
`;const p=`\n${c}\n\nspan:not(:first-child) {\n  margin-left: 6px;\n}\n`;t.Answer=o.default(a.Text)`
  ${p}
`,t.AnswerSmall=o.default(a.getText(.37))`
  ${p}
`,t.AnswerMobile=o.default(a.getText(.2))`
  ${p}
  span:not(:first-child) {
    margin-left: 4px;
  }
`,t.AnswerHidden=o.default.span`
  ${l}
  padding-top: 0.05vh;
  background: linear-gradient(to bottom right, ${r.bluegrey}, ${r.bluegrey7});  
  border-radius: 15%;
  padding-left: 0.6vw;
  padding-right: 0.6vw;
  visibility: hidden;
`,t.AnswerVisible=o.default(t.AnswerHidden)`
  ${i.opacity()}
  ${u}
  visibility: visible;
`,t.AnswerVisibleWrong=o.default(t.AnswerVisible)`
  ${d}
`},c9jG:
/*!*************************************************!*\
  !*** ./src/choose_word/internals/getFillers.ts ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=2,i=3;t.getFillers=function(e){const t=e.word.length;if(void 0===e.fillers[t]||e.fillers[t].length<i)return[e.word];const n=r.filter(t=>t!==e.word,e.fillers[t]),s=r.take(o,r.shuffle(n));return r.shuffle(r.append(e.word,s))}},dGrs:
/*!*************************************!*\
  !*** ./src/lesson/selectOption.tsx ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),s=n(/*! styled-components */"vOnD"),a=n(/*! ../_styled/grid */"ZPtv"),c=n(/*! ../select_article/styled/select */"Jn2w"),l=n(/*! ./actions */"a44Q");function u(e){const{options:t,i:n,dispatch:r}=e,o=e=>r(l.click({i:n,selection:e.target.textContent}));return i.createElement(c.SelectContainer,null,t.map((e,t)=>i.createElement(c.Select,{className:`selectable_${e.status.toLowerCase()}`,key:`${n}_${t}`,onClick:o},e.text)))}const d=s.default(a.ContainerBase)`
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 7fr 2fr 1fr;
`,p=s.default.div`
  width: 100%;
  text-align: center;
  span{
    margin: 0 0.4vw;
  }
`,E=s.default.div`
  width: 100%;
  text-align: center;
  color: ${r.darkblue3};
  text-decoration: underline;
`;t.SelectOption=function({store:e,dispatch:t}){const n=o.allTrue(function(e){return 0===o.piped(e,o.filter(Array.isArray),o.map(o.head),o.filter(e=>"ACTIVE"===e.status),o.length)}(e.question),""!==e.currentStep.translation);return i.createElement(d,null,i.createElement("div",null),i.createElement(p,null,e.question.map((e,n)=>"string"==typeof e?i.createElement("span",{key:n},e):i.createElement(u,{i:n,key:n,options:e,dispatch:t}))),n?i.createElement(E,null,e.currentStep.translation):"")}},dHhz:
/*!*****************************************!*\
  !*** ./src/guess_word/styled/input.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=n(/*! ../../_styled/grid */"ZPtv"),i=n(/*! ../../_styled/input */"XJKb"),s=n(/*! ./grid */"M5ZK");t.InputContainer=r.default(o.CenteredItem)`
  height: ${1*s.frHeight}vh;
  grid-area: gw_input;
`,t.Input=r.default(i.InputBase)`
  input{
    width: 70%;
  }
`},dMR8:
/*!************************************!*\
  !*** ./src/_helpers/instanceDB.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ./mini/putAhead */"MKED");function i(e,t){if(!t)return e;const n=r.replace(/-/g," ",t.payload),i=r.findIndex(e=>e.altTag===n,e);return o.putAhead(e,i)}t.instanceDB=function(e,t,n){return e?i(r.shuffle(t),n):1===r.random(0,1)?i(t,n):i(r.reverse(t),n)}},dt5O:
/*!***************************************!*\
  !*** ./src/root/epics/sharedSpeak.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_modules/selectors */"6QbG"),s=n(/*! ../../_modules/speak */"hUur"),a=n(/*! ../../constants */"he5r");let c=!1;t.sharedSpeakEpic=((e,t)=>e.ofType(a.SHARED_SPEAK).filter(()=>!c).switchMap(e=>new r.Observable(n=>{c=!0;const{fromLanguage:r,toLanguage:a}=i.getCommons(t),{name:l}=t.getState().store,u=`${o.camelCase(l)}Store`,d=t.getState()[u].currentInstance[e.payload],p={language:"fromPart"===e.payload?r:a,text:d};s.speak(p).then(()=>{c=!1,n.complete()})})))},e2sN:
/*!***********************************************!*\
  !*** ./src/_helpers/getConvertedNamespace.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.getConvertedNamespace=function(e){const[t]=r.match(/:\/\/[a-zA-Z0-9]{2,9}/,e),n=r.replace("://","",t),o=e.split("/");return`${n}_${r.last(o)}`}},eKGT:
/*!*************************************!*\
  !*** ./src/_helpers/normalizeDB.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=2;t.normalizeDB=function(e){const t=r.pluck("doc",e);return r.filter(e=>{const t=function(e){return t=>"string"==typeof e[t]&&e[t].length>o}(e);return r.allTrue(t("dePart"),t("deWord"),t("enPart"),t("enPart"),t("imageSrc"))},t)}},edGR:
/*!****************************************!*\
  !*** ./src/choose_word/chooseWord.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"MdxE"),i=n(/*! ./styled/grid */"bELT"),s=n(/*! ./styled/question */"F4XW");t.ChooseWord=class extends r.Component{constructor(e){super(e),this.onClickUp=this.onClickUp.bind(this),this.onClickRight=this.onClickRight.bind(this),this.onClickDown=this.onClickDown.bind(this),this.onClick=this.onClick.bind(this)}onClick(e){this.props.dispatch(o.click(e))}onClickUp(){this.onClick("UP")}onClickRight(){this.onClick("RIGHT")}onClickDown(){this.onClick("DOWN")}render(){const{question:e,index:t}=this.props.chooseWordStore;return r.createElement(i.Container,null,r.createElement(s.QuestionContainer,null,this.props.chooseWordStore.listen&&r.createElement(s.Question,null,r.createElement(s.ChoiceX,{onClick:this.onClickUp},e[t][0]),r.createElement(s.ChoiceY,{onClick:this.onClickRight},e[t][1]),r.createElement(s.ChoiceZ,{onClick:this.onClickDown},e[t][2]))),r.createElement(i.Solved,null,this.props.chooseWordStore.correctAnswer.filter((e,t)=>t<this.props.chooseWordStore.index).join(" ")),r.createElement(i.Translation,null,this.props.chooseWordStore.currentInstance.toPart))}}},fJpv:
/*!**************************************!*\
  !*** ./src/guess_word/guessWord.tsx ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ./actions */"0Yy6"),i=n(/*! colors */"dBCm"),s=n(/*! ./styled/grid */"M5ZK"),a=n(/*! ./styled/image */"XEOf"),c=n(/*! ./styled/input */"dHhz"),l=n(/*! ./styled/related */"BtHC"),u=n(/*! ./styled/word */"qjlp"),d=s.CTextContainer("gw_translated"),p=s.CText({color:i.blue7}),E=s.CTextContainer("gw_sentence"),f=s.CText({color:i.darkblue7});t.GuessWord=class extends r.PureComponent{constructor(e){super(e),this.onInput=this.onInput.bind(this),this.onKeyPress=this.onKeyPress.bind(this)}onInput(e){this.props.dispatch(o.input(e.target.value))}onKeyPress(e){"Enter"===e.key&&this.props.dispatch(o.check())}render(){const e=this.props.guessWordStore,t=e.currentInstance.imageSrc;return r.createElement(s.Container,null,r.createElement(c.InputContainer,null,r.createElement(c.Input,null,r.createElement("input",{type:"text",autoFocus:!0,value:e.inputState,onChange:this.onInput,onKeyPress:this.onKeyPress}))),r.createElement(u.WordContainer,null,e.listen&&r.createElement(u.Word,null,e.wordQuestion),!e.listen&&r.createElement(u.Word,null,e.wordAnswer)),r.createElement(l.RelatedContainer,null,r.createElement(l.Related,null,e.related[0]),r.createElement(l.Related,null,e.related[1])),r.createElement(E,null,e.listen&&r.createElement(f,null,e.question),!e.listen&&r.createElement(f,null,e.answer)),r.createElement(a.ImageContainer,null,r.createElement(a.Image,{src:t})),r.createElement(d,null,r.createElement(p,null,e.translated)))}}},flZ8:
/*!***********************************!*\
  !*** ./src/_modules/userLogin.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.userLogin=async function(e){const t=new(e.getPouchDB())(`https://couchdb-7ea601.smileupps.com/${e.userDBName}`,{skip_setup:!0}),{ok:n}=await t.login(e.userDBName,e.password);return{ok:n,userDBCloud:t}}},fqjP:
/*!******************************************!*\
  !*** ./src/select_article/component.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! react-redux */"/MKj"),i=n(/*! ./actions */"WVUV"),s=n(/*! ./selectArticle */"YMUk");class a extends r.Component{constructor(e){super(e)}componentDidMount(){this.props.dispatch(i.init())}render(){const{ready:e}=this.props.selectArticleStore;return r.createElement("div",null,e&&r.createElement(s.SelectArticle,Object.assign({},this.props)))}}t.SelectArticle=a;t.SelectArticleWrapped=o.connect(({store:e,selectArticleStore:t})=>({store:e,selectArticleStore:t}))(a)},gdWI:
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
`},gngI:
/*!*******************************************!*\
  !*** ./src/_helpers/css_in_js/opacity.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD"),o=r.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;t.opacity=((e=.3)=>r.css`animation: ${o} ${e}s ease-in;`)},hEQj:
/*!***************************************************!*\
  !*** ./src/write_sentence/styled/translation.tsx ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"oOQG");t.TranslationContainer=o.default(i.CenteredItem)`
  grid-area: ws_translation;
  width: 100%;            
`,t.Translation=o.default(s.Text)`
  color: ${r.darkblue5};
`,t.TranslationSmall=o.default(s.getText(.37))`
  color: ${r.darkblue5};
`},hKQu:
/*!*******************************************!*\
  !*** ./src/select_article/epics/click.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../constants */"he5r"),i=n(/*! ../../root/actions */"X9xb"),s=n(/*! ../actions */"WVUV");t.clickEpic=((e,t)=>e.ofType(o.SELECT_ARTICLE_CLICK).filter(e=>!e.payload.article.solved).switchMap(e=>new r.Observable(n=>{const{wordList:r}=t.getState().selectArticleStore.currentInstance,{word:o,article:a}=e.payload;o===a.correct&&n.next(i.sharedAddPoints(1));const c=r.map(e=>{const t="object"==typeof e&&e.index!==a.index;if("string"==typeof e||t)return e;const n=e.articleSet.map(e=>{const t=e.value===a.correct?"CORRECT":e.value===o?"WRONG":"INACTIVE";return Object.assign({},e,{status:t})});return Object.assign({},e,{solved:!0,articleSet:n})});n.next(s.clickReady(c)),function(e){return 0===e.filter(e=>"object"==typeof e&&!e.solved).length}(c)&&n.next(s.stop()),n.complete()})))},hULM:
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
`;t.CCell=function(e){return o.default(i)`grid-area: ${e};`}},hUur:
/*!*******************************!*\
  !*** ./src/_modules/speak.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=window.speechSynthesis,i=new SpeechSynthesisUtterance,s={lang:"en-US",rate:.85,volume:1,pitch:.9},a=Object.assign({},s,{rate:.8,lang:"de-DE"});t.speak=function(e){return new Promise(t=>{const n=function(e){return r.maybe("EN"===e.language,s,"DE"===e.language&&a)}(e);if(!1===n)return t();"EN"===e.language&&function(e){const[t]=speechSynthesis.getVoices().filter(e=>"Google UK English Female"===e.voiceURI);t&&(e.voice=t)}(i),i.lang=n.lang,i.pitch=n.pitch,i.rate=n.rate,i.text=e.text,i.volume=n.volume,o.speak(i),i.onend=(()=>{t()})})}},he5r:
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! rambdax */"Ex95"),i=n(/*! create-action */"Hxzp");t.defaultState={randomFlag:!1,textToSpeechFlag:!1,points:0,fromLanguage:"DE",toLanguage:"EN"},t.urlInputsDefault={easy:!1,easier:!1,easiest:!1,random:!1},t.allowedUrlInputs=o.glue("\n  auto,pause\n  random,id\n  child,adult\n  big,small\n  mic,lock\n  easy,easier,easiest\n",","),t.resetUrlInputs=o.remove("child,",t.allowedUrlInputs),t.LESSON_CLICK="lesson@CLICK",t.LESSON_SELECT="lesson@SELECT",t.LESSON_NEXT="lesson@NEXT",t.LESSON_QUESTION_READY="lesson@QUESTION_READY",t.LESSON_INIT_READY="lesson@INIT_READY",t.LESSON_INIT="lesson@INIT",t.SELECT_ARTICLE="selectArticle",t.SELECT_ARTICLE_SHOW="selectArticle@SHOW",t.SELECT_ARTICLE_STOP="selectArticle@STOP",t.SELECT_ARTICLE_CHECK="selectArticle@CHECK",t.SELECT_ARTICLE_CLICK="selectArticle@CLICK",t.SELECT_ARTICLE_CLICK_READY="selectArticle@CLICK_READY",t.SELECT_ARTICLE_INPUT="selectArticle@INPUT",t.SELECT_ARTICLE_INPUT_CHANGE="selectArticle@INPUT_CHANGE",t.SELECT_ARTICLE_NEXT="selectArticle@NEXT",t.SELECT_ARTICLE_NEXT_READY="selectArticle@NEXT_READY",t.SELECT_ARTICLE_INIT="selectArticle@INIT",t.SELECT_ARTICLE_UNMOUNT="selectArticle@UNMOUNT",t.SELECT_ARTICLE_INIT_READY="selectArticle@INIT_READY",t.GUESS_WORD="guessWord",t.GUESS_WORD_SHOW="guessWord@SHOW",t.GUESS_WORD_STOP="guessWord@STOP",t.GUESS_WORD_CHECK="guessWord@CHECK",t.GUESS_WORD_INPUT="guessWord@INPUT",t.GUESS_WORD_INPUT_CHANGE="guessWord@INPUT_CHANGE",t.GUESS_WORD_NEXT="guessWord@NEXT",t.GUESS_WORD_NEXT_READY="guessWord@NEXT_READY",t.GUESS_WORD_INIT="guessWord@INIT",t.GUESS_WORD_UNMOUNT="guessWord@UNMOUNT",t.GUESS_WORD_INIT_READY="guessWord@INIT_READY",t.WRITE_SENTENCE="writeSentence",t.WRITE_SENTENCE_CHECK="writeSentence@CHECK",t.WRITE_SENTENCE_INIT="writeSentence@INIT",t.WRITE_SENTENCE_INIT_READY="writeSentence@INIT_READY",t.WRITE_SENTENCE_LISTEN="writeSentence@LISTEN",t.WRITE_SENTENCE_NEXT="writeSentence@NEXT",t.WRITE_SENTENCE_READY="writeSentence@READY",t.WRITE_SENTENCE_SET_INDEX="writeSentence@SET_INDEX",t.WRITE_SENTENCE_SET_INPUT="writeSentence@SET_INPUT",t.WRITE_SENTENCE_SET_NEXT="writeSentence@SET_NEXT",t.WRITE_SENTENCE_SET_OK_CORRECT="writeSentence@SET_OK_CORRECT",t.WRITE_SENTENCE_SHOW="writeSentence@SHOW",t.WRITE_SENTENCE_STEP="writeSentence@STEP",t.WRITE_SENTENCE_STOP="writeSentence@STOP",t.WRITE_SENTENCE_UNMOUNT="writeSentence@UNMOUNT",t.LEARNING_MEME="learningMeme",t.LEARNING_MEME_CHECK="learningMeme@CHECK",t.LEARNING_MEME_INIT="learningMeme@INIT",t.LEARNING_MEME_INIT_READY="learningMeme@INIT_READY",t.LEARNING_MEME_LISTEN="learningMeme@LISTEN",t.LEARNING_MEME_NEXT="learningMeme@NEXT",t.LEARNING_MEME_NEXT_READY="learningMeme@NEXT_READY",t.LEARNING_MEME_READY="learningMeme@READY",t.LEARNING_MEME_SET_INPUT="learningMeme@SET_INPUT",t.LEARNING_MEME_SET_NEXT="learningMeme@SET_NEXT",t.LEARNING_MEME_SHOW="learningMeme@SHOW",t.LEARNING_MEME_STOP="learningMeme@STOP",t.LEARNING_MEME_UNMOUNT="learningMeme@UNMOUNT",t.CHOOSE_WORD="chooseWord",t.CHOOSE_WORD_CLICK="chooseWord@CLICK",t.CHOOSE_WORD_CHECK="chooseWord@CHECK",t.CHOOSE_WORD_INIT="chooseWord@INIT",t.CHOOSE_WORD_INIT_READY="chooseWord@INIT_READY",t.CHOOSE_WORD_NEXT="chooseWord@NEXT",t.CHOOSE_WORD_NEXT_READY="chooseWord@NEXT_READY",t.CHOOSE_WORD_INC_INDEX="chooseWord@INC_INDEX",t.CHOOSE_WORD_INC_POINTS="chooseWord@INC_POINTS",t.CHOOSE_WORD_SHOW="chooseWord@SHOW",t.CHOOSE_WORD_STEP="chooseWord@STEP",t.CHOOSE_WORD_STOP="chooseWord@STOP",t.CHOOSE_WORD_UNMOUNT="chooseWord@UNMOUNT",t.BACKGROUND="#b0bec5",t.DATA_READY="DATA_READY";t.DB_URL="https://rawcdn.githack.com/selfrefactor/front/ff2c66df5454f8f8e2d996bb62a1f00487e3e16f/files/db.json",t.DELAY=500,t.INFO="INFO",t.INIT="INIT",t.INIT_READY="INIT_READY",t.LONG_DELAY=1e3,t.NEXT_TICK=0,t.POUCH_USER_READY="POUCH_USER_READY",t.ROUTER_CHANGE="@@router/LOCATION_CHANGE",t.SETTINGS_RANDOM="settings@RANDOM",t.SETTINGS_TEXT_TO_SPEECH="settings@TEXT_TO_SPEECH",t.SHORT_DELAY=150,t.UPDATE_POINTS_DELAY=3e3,t.SHARED_ADD_POINTS="shared@ADD_POINTS",t.SHARED_ADD_POINTS_READY="shared@ADD_POINTS_READY",t.SHARED_INIT="shared@INIT",t.SHARED_SHOW_ANSWER="shared@SHOW_ANSWER",t.SHARED_SPEAK="shared@SPEAK",t.LANGUAGE_CHANGE="languageChange",t.LANGUAGE_CHANGE_TOGGLE="languageChange@TOGGLE",t.LANGUAGE_CHANGE_INIT="languageChange@INIT",t.LANGUAGE_CHANGE_CLICK="languageChange@CLICK",t.LANGUAGE_CHANGE_SET="languageChange@SET",t.LANGUAGE_SEPARATOR=" ⇨ ",t.CARRIER_CHECK="carrier@CHECK",t.CARRIER_INIT="carrier@INIT",t.CARRIER_INIT_READY="carrier@INIT_READY",t.CARRIER_LISTEN="carrier@LISTEN",t.CARRIER_READY="carrier@READY",t.CARRIER_SHOW="carrier@SHOW",t.CARRIER_STEP="carrier@STEP",t.CARRIER_STOP="carrier@STOP",t.CARRIER_UNMOUNT="carrier@UNMOUNT",t.USER_REGISTER="user@REGISTER",t.USER_LOGIN="user@LOGIN",t.USER_LOGOUT="user@LOGOUT",t.USER_INIT="user@INIT",t.USER="USER",t.NAVIGATION_TOGGLE="navigation@TOGGLE",t.NAVIGATION_CHANGE="navigation@CHANGE",t.ICON_ACTIVE=r.darkblue3,t.ICON_PASSIVE=r.pink5,t.NOTIFY_INFO="notify@INFO",t.sharedSpeak=i.createAction(t.SHARED_SPEAK)},hnD8:
/*!************************************************!*\
  !*** ./src/root/epics/sharedChangeSettings.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! string-fn */"DOxJ"),s=n(/*! ../../_modules/selectors */"6QbG");t.sharedChangeSettingsEpic=((e,t)=>e.ofType(r.SETTINGS_RANDOM,r.SETTINGS_TEXT_TO_SPEECH).switchMap(e=>new o.Observable(n=>{const{name:o}=s.getCommons(t),a={type:`${i.camelCase(o)}@INIT`},{userDBCloud:c}=t.getState().store;if(void 0===c)return n.next(a),n.complete();c.get("data").then(t=>{const o=((e,t)=>{if(t.type===r.SETTINGS_RANDOM)return Object.assign({},e,{randomFlag:!e.randomFlag})})(t,e);c.put(o).then(()=>{n.next(a),n.complete()})})})).debounceTime(r.LONG_DELAY))},iWvF:
/*!******************************************!*\
  !*** ./src/learning_meme/epics/index.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux-observable */"NOGq"),o=n(/*! ./check */"O39Z"),i=n(/*! ./init */"+0l1"),s=n(/*! ./initReady */"l1si"),a=n(/*! ./listen */"81cQ"),c=n(/*! ./next */"6QB+");t.learningMemeEpic=r.combineEpics(i.initEpic,s.initReadyEpic,c.nextEpic,a.listenEpic,o.checkEpic)},ikCi:
/*!**************************************!*\
  !*** ./src/guess_word/epics/init.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_helpers/instanceDB */"dMR8"),i=n(/*! ../../constants */"he5r"),s=n(/*! ../actions */"0Yy6");function a(e){const t=e.getState().store,{randomFlag:n,fromLanguage:r,toLanguage:i,db:s}=t,a=s.filter(e=>{const t=`${r.toLowerCase()}Related`,n=`${i.toLowerCase()}Part`,o=void 0!==e[t]&&e[t].length>0,s=void 0!==e[n]&&e[n].length>0;return o&&s});return o.instanceDB(n,a)}t.createDB=a,t.initEpic=((e,t)=>{const n=e.ofType(i.GUESS_WORD_INIT),o=e.ofType(i.INIT_READY);return r.Observable.combineLatest(n,o).map(()=>s.initReady(a(t)))})},jcVd:
/*!****************************************!*\
  !*** ./src/write_sentence/reducers.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../_helpers/rabbits/okCorrect */"3xLh"),o=n(/*! ../constants */"he5r"),i={ready:!1};t.writeSentenceStore=function(e=i,t){switch(t.type){case o.WRITE_SENTENCE_INIT_READY:return Object.assign({},e,{currentIndex:-1,db:t.payload});case o.WRITE_SENTENCE_READY:return Object.assign({},e,{ready:!0});case o.WRITE_SENTENCE_SET_INPUT:return Object.assign({},e,{inputState:t.payload.input,question:t.payload.question});case o.WRITE_SENTENCE_SET_INDEX:return Object.assign({},e,{index:e.index+1,inputState:""});case o.WRITE_SENTENCE_STOP:return Object.assign({},e,{index:e.index+1,inputState:"",listen:!1});case o.WRITE_SENTENCE_SET_NEXT:return Object.assign({},e,t.payload,{index:0,inputState:"",listen:!0});case o.WRITE_SENTENCE_SET_OK_CORRECT:return r.okCorrectRabbit(e,t.payload);case o.WRITE_SENTENCE_UNMOUNT:return Object.assign({},e,i);default:return e}}},jjzj:
/*!**************************************************!*\
  !*** ./src/write_sentence/ants/lastCharSpace.ts ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.lastCharSpace=(e=>" "===r.last(e))},"k+nP":
/*!***************************************!*\
  !*** ./src/choose_word/epics/next.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/getNextIndex */"noCf"),s=n(/*! ../../_modules/selectors */"6QbG"),a=n(/*! ../../constants */"he5r"),c=n(/*! ../../root/actions */"X9xb"),l=n(/*! ../actions */"MdxE"),u=n(/*! ../internals/getFillers */"c9jG");t.nextEpic=((e,t)=>e.ofType(a.CHOOSE_WORD_NEXT).switchMap(e=>new r.Observable(e=>{const{currentIndex:n,db:r,fillerWords:a}=t.getState().chooseWordStore,{textToSpeechFlag:d}=s.getCommons(t),p=i.getNextIndex({index:n,length:r.length}),E=r[p],f=o.wordsX(E.fromPart),g={correctAnswer:f,currentIndex:p,currentInstance:E,question:f.map(e=>u.getFillers({fillers:a,word:e}))};e.next(l.nextReady(g)),d&&e.next(c.sharedSpeak("toPart")),e.complete()})))},l1si:
/*!**********************************************!*\
  !*** ./src/learning_meme/epics/initReady.ts ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.LEARNING_MEME_INIT_READY).map(()=>({type:r.LEARNING_MEME_NEXT})))},"l7n/":
/*!**************************************!*\
  !*** ./src/root/combinedReducers.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! redux */"fvjX"),o=n(/*! notify/reducers */"kY1S"),i=n(/*! ../choose_word/reducers */"OJQa"),s=n(/*! ../guess_word/reducers */"2Skl"),a=n(/*! ../learning_meme/reducers */"HrOy"),c=n(/*! ../lesson/reducers */"8Qhz"),l=n(/*! ../select_article/reducers */"/ZOX"),u=n(/*! ../write_sentence/reducers */"jcVd"),d=n(/*! ./navigation/reducers */"uVC7"),p=n(/*! ./reducers */"7uE1"),E=n(/*! ./user/reducers */"l8xy"),f={lessonStore:c.lessonStore,selectArticleStore:l.selectArticleStore,chooseWordStore:i.chooseWordStore,guessWordStore:s.guessWordStore,learningMemeStore:a.learningMemeStore,navigationStore:d.navigationStore,notifyStore:o.notifyStore,store:p.store,userStore:E.userStore,writeSentenceStore:u.writeSentenceStore};t.combinedReducers=r.combineReducers(f)},l8xy:
/*!***********************************!*\
  !*** ./src/root/user/reducers.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! ../../constants */"he5r"),i=n(/*! ./_helpers/removeCredentials */"YseZ"),s={ready:!1};t.userStore=function(e=s,t){switch(t.type){case o.INIT_READY:return function(e,t){if(r.equals(e.userData.forRootReducer,{}))return t;const n=r.omit("_id,_rev",e.userData.userDoc);return Object.assign({},t,{data:n,ready:!0})}(t.payload,e);case o.USER_LOGOUT:return i.removeCredentials(),Object.assign({},e,{data:{},ready:!1});case o.POUCH_USER_READY:return Object.assign({},e,{data:t.payload.data,ready:!0});default:return e}}},luEA:
/*!*******************************************!*\
  !*** ./src/write_sentence/epics/check.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_modules/selectors */"6QbG"),s=n(/*! ../../constants */"he5r"),a=n(/*! ../../root/actions */"X9xb"),c=n(/*! ../actions */"o/T1");t.checkEpic=((e,t)=>e.ofType(s.WRITE_SENTENCE_CHECK).switchMap(()=>new r.Observable(e=>{const{fromLanguage:n}=i.getCommons(t),{inputState:r,question:s,index:l}=t.getState().writeSentenceStore,u=r.trim().length,d=("DE"===n?o.distanceGerman:o.distance)(r.trim(),s[l].hidden),p=u>1&&d<=(u>5?1:0),E=1===s[l].hidden.length||p;p&&e.next(a.sharedAddPoints(1)),e.next(c.setOkCorrect(E)),e.next(c.step()),e.complete()})))},"m+B3":
/*!**************************************!*\
  !*** ./src/guess_word/epics/next.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ"),i=n(/*! ../../_helpers/getNextIndex */"noCf"),s=n(/*! ../../_helpers/glueRelated */"q/ul"),a=n(/*! ../../constants */"he5r"),c=n(/*! ../actions */"0Yy6"),l=(e,t)=>{const[n]=e.split(","),i=o.maskWords({charLimit:4,words:n}),s=n.split(" ");return{wordAnswer:n,wordQuestion:i,words:!(1===s.length&&!t.includes(n))?s:[(e=>{return`${e[0].toUpperCase()}${r.tail(e)}`})(s[0])]}};t.nextEpic=((e,t)=>e.ofType(a.GUESS_WORD_NEXT).map(()=>c.nextReady(function(e){const{fromLanguage:t,toLanguage:n}=e.getState().store,{db:r,currentIndex:a}=e.getState().guessWordStore,c=i.getNextIndex({length:r.length,index:a}),u=r[c],d=`${t.toLowerCase()}Related`,p=`${t.toLowerCase()}Word`,E=`${t.toLowerCase()}Part`,f=`${n.toLowerCase()}Part`,g=s.glueRelated(u[d]),h=u[E],{wordAnswer:m,wordQuestion:_,words:S}=l(u[p],h),v=u[f],{hidden:O,visible:C}=o.maskSentence({sentence:h,words:S}),T=C.join(" ");return{answer:O.join(" "),currentIndex:c,currentInstance:{fromPart:h,fromWord:"",imageSrc:u.imageSrc,toPart:"",toWord:""},question:T,related:g,translated:v,wordAnswer:m,wordQuestion:_}}(t))))},mFFS:
/*!************************************!*\
  !*** ./src/_modules/getPouchDB.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! pouchdb */"FrJb"),o=n(/*! pouchdb-authentication */"/NOQ");r.default.plugin(o.default),t.getPouchDB=(()=>r.default)},mVbh:
/*!************************************************!*\
  !*** ./src/_helpers/mini/normalizeLanguage.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.normalizeLanguage=function(e){return`${e.toLowerCase()}-${e}`}},mfjz:
/*!******************************************!*\
  !*** ./src/write_sentence/component.tsx ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! rambdax */"Ex95"),i=n(/*! react */"q1tI"),s=n(/*! react-redux */"/MKj"),a=n(/*! ./actions */"o/T1"),c=n(/*! ./styled/grid */"oOQG"),l=n(/*! ./styled/image */"Ep3D"),u=n(/*! ./styled/input */"EkVV"),d=n(/*! ./styled/answer */"bjKX"),p=n(/*! ./styled/question */"MLjJ"),E=n(/*! ./styled/translation */"hEQj"),f=n(/*! ./answerList */"Jwh9"),g=n(/*! ./ants/lastCharSpace */"jjzj"),h=n(/*! ./questionList */"66FG"),m=n(/*! ./ants/auto */"49dL"),_=n(/*! ./ants/lock */"ucJp"),S=n(/*! ./ants/getX */"E6NO"),v=57;class O extends i.Component{constructor(e){super(e),this.onInputKeyPress=this.onInputKeyPress.bind(this),this.onInputChange=this.onInputChange.bind(this),this.state={lock:r.getter("lock")}}componentDidMount(){const{auto:e,pause:t,id:n}=r.masterGetter("auto,pause,id");"number"==typeof e&&m.autoAnt(this.props.dispatch,1e3*e,o.defaultTo(3e3*e,1e3*t)),this.props.dispatch(a.init(n))}onInputKeyPress(e){" "===e.key&&this.props.dispatch(a.listen("SPACE"))}onInputChange(e){g.lastCharSpace(e.target.value)||this.state.lock&&!_.lockAnt(this.props.writeSentenceStore,e)||this.props.dispatch(a.listen(e.target.value))}render(){const{ready:e,currentInstance:t,inputState:n}=this.props.writeSentenceStore,r=e?t.fromPart.length:0,o=S.getX(r>v);return i.createElement("div",null,e&&i.createElement(c.Container,null,i.createElement(u.InputContainer,null,i.createElement(u.Input,null,i.createElement("input",{type:"text",autoFocus:e,value:n,onChange:this.onInputChange,onKeyPress:this.onInputKeyPress}))),i.createElement(p.QuestionContainer,null,i.createElement(o.Question,null,i.createElement(h.QuestionList,Object.assign({},this.props.writeSentenceStore)))),i.createElement(d.AnswerContainer,null,i.createElement(o.Answer,null,i.createElement(f.AnswerList,Object.assign({},this.props.writeSentenceStore)))),i.createElement(l.ImageContainer,null,i.createElement(l.Image,{src:t.imageSrc})),i.createElement(E.TranslationContainer,null,i.createElement(o.Translation,null,t.toPart))))}}t.WriteSentence=O;t.WriteSentenceWrapped=s.connect(({writeSentenceStore:e})=>({writeSentenceStore:e}))(O)},mi1x:
/*!***********************************!*\
  !*** ./src/_helpers/infoSteps.ts ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r={context:function(e){return{element:`#${e}_context`,popover:{description:"This is a context to help you figure out the answer",position:"bottom",title:"Context"}}},image:function(e){return{element:`#${e}_image`,popover:{description:"This is image related to the context",position:"top",title:"Image"}}},input:function(e,t){return{element:`#${e}_input`,popover:{description:t,position:"bottom",title:"Input field"}}},question:function(e,t){return{element:`#${e}_question`,popover:{description:t,position:"bottom",title:"Question"}}},translated:function(e){return{element:`#${e}_translated`,popover:{description:"Translation of the context section",position:"top",title:"Translation"}}}};const o={lm:function(e,t){return t.map(t=>{if("string"==typeof t)return r[t](e);const[n,o]=Object.entries(t)[0];return r[n](e,o)})}("lm",[{question:"This is a hidden word that you need to guess correctly"},"context",{input:"This is a hidden word that you need to guess correctly.Submit by simply pressing 'Enter'"},"image","translated"])};t.infoSteps=function(e){return o[e]}},mmTX:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/init.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../actions */"o/T1"),s=n(/*! ../../_modules/createDB */"vQGA");t.initEpic=((e,t)=>{const n=e.ofType(r.WRITE_SENTENCE_INIT),a=e.ofType(r.INIT_READY);return o.Observable.combineLatest(a,n).map(([,e])=>i.initReady(s.createDB(t,e)))})},"mtq/":
/*!**********************************!*\
  !*** ./src/root/user/styled.tsx ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! styled-components */"vOnD");t.Container=r.default.div`
  height: ${89}vh;
  display: grid;
  grid-template-columns: auto 20rem auto;
  grid-template-rows: 1fr 2fr;
  grid-template-areas: ". u_top ." ". u_content .";
  
  input { 
    width: 100%;
    padding-left: 0.3rem;
  }

  button {
    width: 50%;
    cursor: pointer;
  }
`,t.FormContainer=r.default.div`
  grid-area: u_top;
`,t.SettingsContainer=r.default.div`
  grid-area: u_content;
`,t.Form=r.default.div`
  display: grid;
  grid-template-columns: repeat(1fr, 4);
  height: 100%;
  div {
    text-align: center;
    padding-top: 0.5rem;
    font-size: 1.05rem;
  }
`},noCf:
/*!**************************************!*\
  !*** ./src/_helpers/getNextIndex.ts ***!
  \**************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getNextIndex=function(e){const t=e.index+1;return t===e.length?0:t}},"o/T1":
/*!***************************************!*\
  !*** ./src/write_sentence/actions.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../constants */"he5r");t.check=r.createAction(o.WRITE_SENTENCE_CHECK),t.init=r.createAction(o.WRITE_SENTENCE_INIT),t.initReady=r.createAction(o.WRITE_SENTENCE_INIT_READY),t.listen=r.createAction(o.WRITE_SENTENCE_LISTEN),t.next=r.createAction(o.WRITE_SENTENCE_NEXT),t.setIndex=r.createAction(o.WRITE_SENTENCE_SET_INDEX),t.setNext=r.createAction(o.WRITE_SENTENCE_SET_NEXT),t.setOkCorrect=r.createAction(o.WRITE_SENTENCE_SET_OK_CORRECT),t.setInput=r.createAction(o.WRITE_SENTENCE_SET_INPUT),t.step=r.createAction(o.WRITE_SENTENCE_STEP),t.stop=r.createAction(o.WRITE_SENTENCE_STOP)},o2aO:
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
  grid-template-columns: 1fr 9fr 1fr;
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"0Yy6");t.inputEpic=((e,t)=>e.ofType(r.GUESS_WORD_INPUT).filter(()=>(function(e){return e.getState().guessWordStore.listen})(t)).map(e=>o.inputChange(e.payload)))},prBy:
/*!***********************************************!*\
  !*** ./src/write_sentence/epics/initReady.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r");t.initReadyEpic=((e,t)=>e.ofType(r.WRITE_SENTENCE_INIT_READY).map(()=>({type:r.WRITE_SENTENCE_NEXT})))},"q/ul":
/*!*************************************!*\
  !*** ./src/_helpers/glueRelated.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=(e,t)=>t.length-e.length,i=75,s="; ";function a(e){return e.reduce((e,t)=>e+t.length,0)}function c(e,t){let n=!0,r=-1;const o=[e];for(;n;){if(++r===t.length){n=!1;continue}const e=[...o,t[r]];a(e)+(e.length-1)*s.length<i&&o.push(t[r])}return o}t.glueRelated=function(e){const t=e.filter(e=>e.length<i),n=r.sort(o,t);if(0===n.length)return["",""];if(1===n.length)return[n[0],""];const a=c(n[0],r.tail(n)),l=n.filter(e=>!a.includes(e));if(l.join(s).length<i)return[a.join(s),l.join(s)];const u=c(l[0],r.tail(l));return[a.join(s),u.join(s)]}},qgRW:
/*!*******************************!*\
  !*** ./src/_modules/getDB.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ");t.getDB=function(e){const{fromLanguage:t,toLanguage:n,db:i}=e,s=r.filter(e=>{const i=e[`${t.toLowerCase()}Part`],s=e[`${t.toLowerCase()}Word`],a=void 0!==e[`${n.toLowerCase()}Word`],c=void 0!==e[`${n.toLowerCase()}Part`];if(void 0===i||void 0===s||!c||!a)return!1;const l=r.last(s.split(" "));return o.wordsX(i).map(e=>e.toLowerCase()).includes(l.toLowerCase())||function(e){return e.startsWith("по-")||e.startsWith("най-")}(l)},i);return r.map(e=>{const r=e[`${t.toLowerCase()}Part`],o=e[`${t.toLowerCase()}Word`],i=e.imageSrc,s=e[`${n.toLowerCase()}Part`],a=e[`${n.toLowerCase()}Word`];return{altTag:e.altTag,fromPart:r,fromWord:o,imageSrc:i,toPart:s,toWord:a}},s)}},qjlp:
/*!****************************************!*\
  !*** ./src/guess_word/styled/word.tsx ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! colors */"dBCm"),o=n(/*! styled-components */"vOnD"),i=n(/*! ../../_styled/grid */"ZPtv"),s=n(/*! ./grid */"M5ZK");t.WordContainer=o.default(i.CenteredItem)`
  height: ${1*s.frHeight}vh;
  grid-area: gw_word;
`,t.Word=o.default(s.Text)`
  color: ${r.darkblue3};
  letter-spacing: 0.4rem;
  word-spacing: 1rem;
`},qysT:
/*!***************************************!*\
  !*** ./src/choose_word/epics/step.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_modules/selectors */"6QbG"),i=n(/*! ../../constants */"he5r"),s=n(/*! ../../root/actions */"X9xb"),a=n(/*! ../actions */"MdxE");t.stepEpic=((e,t)=>e.ofType(i.CHOOSE_WORD_STEP).switchMap(e=>new r.Observable(e=>{const{index:n,correctAnswer:r,localPoints:i}=t.getState().chooseWordStore,c=n+1===r.length,l=r.length-i<=2;if(c){const{textToSpeechFlag:n}=o.getCommons(t);l&&e.next(s.sharedAddPoints(1)),n&&e.next(s.sharedSpeak("fromPart")),e.next(a.stop())}else e.next(a.incIndex());e.complete()})))},rC4W:
/*!***************************************!*\
  !*** ./src/choose_word/epics/init.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../_helpers/instanceDB */"dMR8"),s=n(/*! ../../_modules/getDB */"qgRW"),a=n(/*! ../../_modules/selectors */"6QbG"),c=n(/*! ../actions */"MdxE"),l=n(/*! ../internals/generateFillerWords */"v/sL");t.initEpic=((e,t)=>{const n=e.ofType(r.INIT_READY),u=e.ofType(r.CHOOSE_WORD_INIT);return o.Observable.combineLatest(n,u).map(()=>c.initReady(function(e){const{randomFlag:t,fromLanguage:n,toLanguage:r}=a.getCommons(e),{db:o}=e.getState().store,c=s.getDB({db:o,fromLanguage:n,toLanguage:r}),u=l.generateFillerWords(c);return{db:i.instanceDB(t,c),fillerWords:u}}(t)))})},reJz:
/*!******************************************!*\
  !*** ./src/write_sentence/epics/step.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../_modules/selectors */"6QbG"),i=n(/*! ../../constants */"he5r"),s=n(/*! ../actions */"o/T1"),a={type:i.SHARED_SPEAK,payload:"fromPart"};t.stepEpic=((e,t)=>e.ofType(i.WRITE_SENTENCE_STEP).switchMap(e=>new r.Observable(e=>{const{index:n,question:r}=t.getState().writeSentenceStore,{textToSpeechFlag:i}=o.getCommons(t);n+1===r.length?(e.next(s.stop()),i&&e.next(a)):e.next(s.setIndex()),e.complete()})))},s1Kj:
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! rxjs/Observable */"4c1C"),i=n(/*! ../../_helpers/instanceDB */"dMR8"),s=n(/*! ../../_modules/selectors */"6QbG"),a=n(/*! ../../constants */"he5r"),c=n(/*! ../actions */"WVUV"),l=n(/*! ../ants/filter */"JqQx");t.initEpic=((e,t)=>{const n=e.ofType(a.INIT_READY),u=e.ofType(a.SELECT_ARTICLE_INIT);return o.Observable.combineLatest(n,u).filter(()=>"DE"===s.getCommons(t).fromLanguage).map(()=>c.initReady(function(e){const{randomFlag:t}=s.getCommons(e),{db:n}=e.getState().store,o=l.filterAnt(n),a=t?r.shuffle(o):o;return{db:i.instanceDB(t,a)}}(t)))})},uVC7:
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
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95");t.lockAnt=function(e,t){const n=r.last(t.target.value).toLowerCase(),o=e.question[e.index].hidden[t.target.value.length-1];return void 0!==o&&n===o.toLowerCase()}},unZb:
/*!**********************************!*\
  !*** ./src/root/user/actions.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! create-action */"Hxzp"),o=n(/*! ../../constants */"he5r");t.login=r.createAction(o.USER_LOGIN),t.logout=r.createAction(o.USER_LOGOUT),t.register=r.createAction(o.USER_REGISTER)},"v/sL":
/*!**********************************************************!*\
  !*** ./src/choose_word/internals/generateFillerWords.ts ***!
  \**********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rambdax */"Ex95"),o=n(/*! string-fn */"DOxJ"),i=2,s=20;t.generateFillerWords=function(e){const t=r.pluck("fromPart",e),n=r.map(o.wordsX,t),a=r.uniq(r.flatten(n)),c=r.filter(e=>!e.includes(",")||!e.includes("."),a);return r.produce(function(){const e={};return r.range(i,s).map(t=>{e[t]=r.filter(e=>e.length===t)}),e}(),c)}},vQGA:
/*!**********************************!*\
  !*** ./src/_modules/createDB.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../_helpers/instanceDB */"dMR8"),o=n(/*! ./getDB */"qgRW"),i=n(/*! ./selectors */"6QbG");t.createDB=function(e,t){const{randomFlag:n,fromLanguage:s,toLanguage:a}=i.getCommons(e),{db:c}=e.getState().store,l=o.getDB({db:c,fromLanguage:s,toLanguage:a});return r.instanceDB(n,l,t)}},vrkp:
/*!*******************************!*\
  !*** ./src/root/rxImports.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(/*! rxjs/add/observable/combineLatest */"JwtW"),n(/*! rxjs/add/observable/dom/ajax */"4aHI"),n(/*! rxjs/add/observable/forkJoin */"5eVA"),n(/*! rxjs/add/observable/from */"7uu2"),n(/*! rxjs/add/observable/fromEvent */"sx9y"),n(/*! rxjs/add/observable/fromPromise */"K4wu"),n(/*! rxjs/add/observable/if */"tomz"),n(/*! rxjs/add/observable/interval */"TGZE"),n(/*! rxjs/add/observable/merge */"T3pr"),n(/*! rxjs/add/observable/of */"neMA"),n(/*! rxjs/add/observable/zip */"VBoa"),n(/*! rxjs/add/operator/combineAll */"yJZD"),n(/*! rxjs/add/operator/concat */"hyLG"),n(/*! rxjs/add/operator/concatAll */"wpj7"),n(/*! rxjs/add/operator/concatMap */"hh2c"),n(/*! rxjs/add/operator/debounce */"L+TF"),n(/*! rxjs/add/operator/debounceTime */"DlyV"),n(/*! rxjs/add/operator/delay */"yYKy"),n(/*! rxjs/add/operator/do */"92bn"),n(/*! rxjs/add/operator/filter */"fjAU"),n(/*! rxjs/add/operator/ignoreElements */"T6aK"),n(/*! rxjs/add/operator/map */"4XzM"),n(/*! rxjs/add/operator/mapTo */"Wj7N"),n(/*! rxjs/add/operator/mergeAll */"Jnez"),n(/*! rxjs/add/operator/sample */"RNrG"),n(/*! rxjs/add/operator/skip */"whEG"),n(/*! rxjs/add/operator/skipUntil */"Sg2c"),n(/*! rxjs/add/operator/switchMap */"MKA9"),n(/*! rxjs/add/operator/take */"VcZd"),n(/*! rxjs/add/operator/takeUntil */"6Ojo"),n(/*! rxjs/add/operator/throttle */"QU2U"),n(/*! rxjs/add/operator/throttleTime */"4PPT"),n(/*! rxjs/add/operator/toArray */"llKn"),n(/*! rxjs/add/operator/withLatestFrom */"964D")},wZsN:
/*!*******************************************!*\
  !*** ./src/_modules/setConvertedImage.ts ***!
  \*******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! localforage */"oAJy"),o=n(/*! ../_helpers/convertToBase64 */"8GXq"),i=n(/*! ../_helpers/getConvertedNamespace */"e2sN"),s=n(/*! ../_modules/getConvertedImage */"Ec1U");t.setConvertedImage=async function(e){const t=i.getConvertedNamespace(e.imageSrc);if(!1===await s.getConvertedImage(e)){const n=await o.convertToBase64(e.imageSrc);await r.setItem(t,n)}}},wbcH:
/*!***********************************************!*\
  !*** ./src/root/user/components/settings.tsx ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! react */"q1tI"),o=n(/*! ../actions */"unZb"),i=n(/*! ../styled */"mtq/");t.UserSettings=class extends r.Component{constructor(e){super(e),this.onClick=this.onClick.bind(this)}onClick(){this.props.dispatch(o.logout())}render(){const e=this.props.userStore.data.randomFlag.toString(),t=this.props.userStore.data.textToSpeechFlag.toString();return r.createElement(i.SettingsContainer,null,r.createElement(i.Form,null,r.createElement("div",null,"Points: ",this.props.userStore.data.points),r.createElement("div",null,"Member since: ",this.props.userStore.data.memberSince),r.createElement("div",null,"Random flag: ",e),r.createElement("div",null,"Text-to-speech flag: ",t),r.createElement("div",null,r.createElement("button",{onClick:this.onClick},"Logout"))))}}},wmyC:
/*!*****************************************!*\
  !*** ./src/root/user/epics/register.ts ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! rxjs/Observable */"4c1C"),o=n(/*! ../../../constants */"he5r");t.registerEpic=((e,t,{postRequest:n})=>e.ofType(o.USER_REGISTER).switchMap(e=>new r.Observable(t=>{const r={payload:{message:`Sent validation email to ${e.payload.email}`},type:"notify@INFO"};n("https://toteff.eu.ngrok.io/user-register",e.payload).subscribe(e=>{t.next(r),t.complete()})})))},"y5+H":
/*!*************************************************!*\
  !*** ./src/root/side_effects/settingsRandom.ts ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/");t.settingsRandom=function(e,t){const n=!t.randomFlag;t.logged||r.setter("randomFlag",n);const o=Object.assign({},t.roughData,{random:Object.assign({},t.roughData.random,{active:n})});return Object.assign({},t,{randomFlag:n,roughData:o})}},y8dd:
/*!*****************************************!*\
  !*** ./src/learning_meme/component.tsx ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! client-helpers */"RQK/"),o=n(/*! react */"q1tI"),i=n(/*! react-redux */"/MKj"),s=n(/*! ./actions */"1Wps"),a=n(/*! ./ants/acceptSpeech */"JO/r"),c=n(/*! ./styled/grid */"P2/E"),l=n(/*! ./styled/image */"s1Kj"),u=n(/*! ./styled/input */"6lbV"),d=n(/*! ./styled/question */"Wlfz"),p=n(/*! ./styled/sentence */"GfLB"),E=n(/*! ./styled/translation */"Qbxv");class f extends o.Component{constructor(e){super(e),this.onInput=this.onInput.bind(this)}onInput(e){if("Enter"===e.key)return this.props.dispatch(s.listen("ENTER"));this.props.dispatch(s.listen(e.target.value))}componentDidMount(){r.getter("mic")&&a.acceptSpeechAnt(),this.props.dispatch(s.init())}render(){const{convertedImage:e,currentInstance:t,inputState:n,listen:r,question:i,ready:s,sentence:a}=this.props.learningMemeStore,f=void 0===t?"":!1===e?t.imageSrc:e;return o.createElement("div",null,s&&o.createElement(c.Container,null,o.createElement(u.InputContainer,null,o.createElement(u.Input,{id:"lm_input"},o.createElement("input",{autoFocus:s,onChange:this.onInput,onKeyPress:this.onInput,type:"text",value:n}))),o.createElement(d.QuestionContainer,null,o.createElement(d.Question,{id:"lm_question"},r&&o.createElement("div",null,o.createElement("span",{className:"fromWord"},i),o.createElement("span",{className:"toWord"},t.toWord)),!r&&o.createElement("div",null,o.createElement("span",{className:"fromWord"},t.fromWord),o.createElement("span",{className:"toWord"},t.toWord)))),o.createElement(p.SentenceContainer,null,o.createElement(p.Sentence,{id:"lm_context"},!r&&o.createElement("span",null,a.hidden),r&&o.createElement("span",null,a.visible))),o.createElement(l.ImageContainer,{id:"lm_image"},o.createElement(l.Image,{src:f})),o.createElement(E.TranslationContainer,null,o.createElement(E.Translation,{id:"lm_translated"},t.toPart))))}}t.LearningMeme=f;t.LearningMemeWrapped=i.connect(({learningMemeStore:e})=>({learningMemeStore:e}))(f)},yU31:
/*!****************************************!*\
  !*** ./src/choose_word/epics/click.ts ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(/*! ../../constants */"he5r"),o=n(/*! ../actions */"MdxE");t.clickEpic=((e,t)=>e.ofType(r.CHOOSE_WORD_CLICK).filter(()=>t.getState().chooseWordStore.listen).map(({payload:e})=>o.check(e)))}},[["2YZa","runtime~main","common"]]]);