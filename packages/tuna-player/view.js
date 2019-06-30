document.documentElement.style.overflow = 'hidden'
const Tuna = require('./tuna.js')

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import R from 'ramda'
import Select from 'react-select'
import { Notification } from 'react-notification'
import J from './commonReact.js'
import Slider from 'rc-slider'
const { dialog } = require('electron').remote

function openDialog () {
  return new Promise(resolve => {
    dialog.showOpenDialog({ properties : [ 'openDirectory' ] }, incoming => {
      resolve(incoming[ 0 ])
    })
  })
}

const filterArr = [ 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass' ]
const bufferSizeArr = [ 256, 512, 2048, 4096, 8192, 16384 ]

const defaultSettings = {
  tunaChorus : {
    feedback : 0.4, //[0,0.95]
    delay    : 0.05, //[0,1],
    depth    : 0.7, //[0,1]
    rate     : 1.5, //[0,8]
    bypass   : 1,
    flag     : 1,
  },
  tunaDelay : {
    feedback  : 0.1,
    delayTime : 100,
    wetLevel  : 0.5,
    dryLevel  : 1,
    cutoff    : 100,
    bypass    : 1,
    flag      : 0,
  },
  tunaPhaser : {
    rate                    : 1.2, //0.01 to 8 is a decent range, but higher values are possible
    depth                   : 0.3, //0 to 1
    feedback                : 0.2, //0 to 1+
    stereoPhase             : 30, //0 to 180
    baseModulationFrequency : 700, //500 to 1500
    bypass                  : 1,
    flag                    : 0,
  },
  tunaOverdrive : {
    outputGain     : 0.5, //0 to 1+
    drive          : 0.7, //0 to 1
    curveAmount    : 1, //0 to 1
    algorithmIndex : 0, //0 to 5, selects one of our drive algorithms
    bypass         : 1,
    flag           : 0,
  },
  tunaCompressor : {
    threshold  : -10, //-100 to 0
    makeupGain : 100, //0 and up
    attack     : 100, //0 to 1000
    release    : 300, //0 to 3000
    ratio      : 5, //1 to 20
    knee       : 10, //0 to 40
    automakeup : 1, //true/false
    bypass     : 1,
    flag       : 0,
  },
  tunaFilter : {
    frequency  : 440, //20 to 22050
    Q          : 16, //0.001 to 100
    gain       : 10, //-40 to 40
    filterType : 0,
    bypass     : 1,
    flag       : 0,
  },
  tunaTremolo : {
    intensity   : 0.3, //0 to 1
    rate        : 4, //0.001 to 8
    stereoPhase : 0, //0 to 180
    bypass      : 1,
    flag        : 0,
  },
  tunaBitcrusher : {
    bits       : 4, //1 to 16
    normfreq   : 0.1, //0 to 1
    bufferSize : 3, //256 to 16384
    flag       : 0,
  },
  tunaMoogFilter : {
    cutoff     : 0.065, //0 to 1
    resonance  : 3.5, //0 to 4
    bufferSize : 3, //256 to 16384
    flag       : 0,
  },
  tunaPingPongDelay : {
    wetLevel       : 0.5, //0 to 1
    feedback       : 0.3, //0 to 1
    delayTimeLeft  : 150, //1 to 1000 (milliseconds)
    delayTimeRight : 200, //1 to 1000 (milliseconds)
    flag           : 0,
  },
}

const defaultLocalState = {
  notificationMessage : '',
  notificationState   : false,
  audioContext        : null,
  song                : '',
  songs               : [],
  selectArr           : [],
  index               : 0,
  nextIndex           : 1,
  duration            : null,
}

const omitArr = [
  'notificationMessage',
  'notificationState',
  'audioContext',
  'song',
  'songs',
  'selectArr',
  'index',
  'duration',
  'overlayFlag',
]

class Overlay extends Component {

  constructor (props) {
    super(props)
    this.state = { flag : false }
  }
  componentWillMount () {
    let data = R.splitEvery(Math.floor(this.props.data.length / 4), this.props.data)

    data = R.take(4)(data)
    let firstRowArr, secondRowArr, thirdRowArr, fourthRowArr
    let flag = true

    switch (data.length) {

    case 1:
      firstRowArr = data[ 0 ]
      secondRowArr = []
      thirdRowArr = []
      fourthRowArr = []
      break
    case 2:
      firstRowArr = data[ 0 ]
      secondRowArr = data[ 1 ]
      thirdRowArr = []
      fourthRowArr = []
      break
    case 3:
      firstRowArr = data[ 0 ]
      secondRowArr = data[ 1 ]
      thirdRowArr = data[ 2 ]
      fourthRowArr = []
      break
    case 4:
      firstRowArr = data[ 0 ]
      secondRowArr = data[ 1 ]
      thirdRowArr = data[ 2 ]
      fourthRowArr = data[ 3 ]
      break
    default:
      flag = false

    }
    if (flag) {
      this.setState({
        flag : true,
        firstRowArr,
        secondRowArr,
        thirdRowArr,
        fourthRowArr,
      })
    }
  }
  render () {
    return (
      <div>
        {this.state.flag && <div className="overlay columns">
          <div className="column is-quarter">
            {this.state.firstRowArr.map(val => <p key={ J.randomSeed() } onClick={ () => { this.props.handleClick(val) } }><span>{val}</span></p>)}
          </div>
          <div className="column is-quarter">
            {this.state.secondRowArr.map(val => <p key={ J.randomSeed() } onClick={ () => { this.props.handleClick(val) } }><span>{val}</span></p>)}
          </div>
          <div className="column is-quarter">
            {this.state.thirdRowArr.map(val => <p key={ J.randomSeed() } onClick={ () => { this.props.handleClick(val) } }><span>{val}</span></p>)}
          </div>
          <div className="column is-quarter">
            {this.state.fourthRowArr.map(val => <p key={ J.randomSeed() } onClick={ () => { this.props.handleClick(val) } }><span>{val}</span></p>)}
          </div>
        </div>}
      </div>
    )
  }

}

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = R.merge(props.settings)(defaultLocalState)
    this.fileSelected = this.fileSelected.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.onMove = this.onMove.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
  }

  static get defaultProps () {
    return {
      port     : '3002',
      settings : defaultSettings,
    }
  }

  log (msg, seconds = 5) {
    const message = R.type(msg) === 'String' ? msg : JSON.stringify(msg)

    this.setState({
      notificationMessage : '',
      notificationState   : false,
    }, () => {
      this.setState({
        notificationMessage : message,
        notificationState   : true,
      })
    })
    setTimeout(() => {
      this.setState({ notificationState : false })
    }, seconds * 1000)
  }

  componentDidMount () {
    J.emitter.on('once init', () => {
      J.getData(`http://localhost:${ this.props.port }/files`).then(files => {
        if (files === false) {
          this.log(`Initial action required!
                        Please hit ⏏ to load MP3 folder`)
        } else {
          const filterFn = R.compose(R.replace('.mp3', ''), R.last, R.split('/'))
          const songs = R.compose(R.map(filterFn), R.filter(val => val.includes('.mp3')))(files)
          const selectArr = R.map(val => ({
            value : val,
            label : R.take(48, val),
          }))(songs)
          const song = songs[ this.state.index ]
          const index = 0

          this.setState({
            song,
            songs,
            selectArr,
            index,
            audioContext : null,
          })
        }
      })
    })

    J.emitter.on('init', () => {
      const AC = 'AudioContext' in window ? AudioContext : 'webkitAudioContext' in window ? webkitAudioContext : null
      const audioContext = new AC()
      const source = audioContext.createBufferSource()
      const xhr = new XMLHttpRequest()

      xhr.open('GET', `http://localhost:${ this.props.port }/file/${ this.state.song }.mp3`)
      xhr.responseType = 'arraybuffer'
      const self = this

      xhr.onload = function (e) {
        audioContext.decodeAudioData(e.target.response, incoming => {
          source.buffer = incoming
          console.log('song received')
        })
      }
      xhr.send(null)
      const tuna = new Tuna(audioContext)

      if (this.state.tunaChorus.flag) {
        const tunaProp = new tuna.Chorus(this.state.tunaChorus)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaDelay.flag) {
        const tunaProp = new tuna.Delay(this.state.tunaDelay)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaPhaser.flag) {
        const tunaProp = new tuna.Phaser(this.state.tunaPhaser)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaOverdrive.flag) {
        const tunaProp = new tuna.Overdrive(this.state.tunaOverdrive)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaCompressor.flag) {
        const automakeup = this.state.tunaCompressor === 1
        const tunaProp = new tuna.Compressor(R.merge(this.state.tunaCompressor, { automakeup }))

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaFilter.flag) {
        const filterType = filterArr[ this.state.tunaFilter.filterType ]
        const tunaProp = new tuna.Filter(R.merge(this.state.tunaFilter, { filterType }))

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaTremolo.flag) {
        const tunaProp = new tuna.Tremolo(this.state.tunaTremolo)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaBitcrusher.flag) {
        const bufferSize = bufferSizeArr[ this.state.tunaBitcrusher.bufferSize ]
        const tunaProp = new tuna.Bitcrusher(R.merge(this.state.tunaBitcrusher, { bufferSize }))

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaMoogFilter.flag) {
        const bufferSize = bufferSizeArr[ this.state.tunaMoogFilter.bufferSize ]
        const tunaProp = new tuna.MoogFilter(R.merge(this.state.tunaMoogFilter, { bufferSize }))

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      if (this.state.tunaPingPongDelay.flag) {
        const tunaProp = new tuna.PingPongDelay(this.state.tunaPingPongDelay)

        source.connect(tunaProp.input)
        tunaProp.connect(audioContext.destination)
      }
      source.start(audioContext.currentTime)
      this.setState({ audioContext })
    })

    J.emitter.on('next', () => {
      this.state.audioContext.close().then(() => {
        this.setState({ audioContext : null }, () => {
          let index

          if (this.state.index < this.state.songs.length - 1) {
            index = this.state.index + 1
          } else {
            index = 0
          }
          const song = this.state.songs[ index ]

          this.setState({
            song,
            index,
          }, () => {
            J.emitter.emit('init')
          })
        })
      })
    })

    J.emitter.on('select', () => {
      if (this.state.audioContext === null) {
        J.emitter.emit('init')
      } else {
        this.state.audioContext.close().then(() => {
          this.setState({ audioContext : null }, () => {
            J.emitter.emit('init')
          })
        })
      }
    })

    J.emitter.on('load', () => {
      openDialog().then(directoryPath => {
        J.postData(`http://localhost:${ this.props.port }/setDirectoryPath`, { directoryPath })
          .then(incoming => {
            if (incoming === true) {
              J.emitter.emit('once init')
            } else {
              this.log('ERROR')
            }
          })
      })
    })

    J.emitter.on('unmount', () => {
      ReactDOM.unmountComponentAtNode(document.getElementById('reactContainer'))
    })

    J.getData(`http://localhost:${ this.props.port }/load-settings`)
      .then(data => {
        if (R.type(data) === 'String') {
          this.setState(JSON.parse(data), () => {
            J.emitter.emit('once init')
          })
        } else {
          J.emitter.emit('once init')
        }
      })
  }

  fileSelected (song) {
    let index = R.indexOf(song, this.state.songs)

    if (index < this.state.songs.length - 1) {
      index += 1
    } else {
      index = 0
    }
    this.setState({
      song,
      index,
    }, () => {
      J.emitter.emit('select')
      J.emitter.emit('unmount')
    })
  }

  handleStart () {
    this.state.audioContext.close().then(() => {
      this.setState({ audioContext : null }, () => {
        J.emitter.emit('init')
      })
    })
  }

  handleNext () {
    J.emitter.emit('next')
  }

  handleStop () {
    this.state.audioContext.suspend()
  }

  handlePlay () {
    this.state.audioContext.resume()
  }

  handleSelect (song) {
    let index = 0

    this.state.selectArr.map((val, key) => {
      if (val.value === song) {
        index = key
      }
    })
    this.setState({
      song,
      index,
    }, () => { J.emitter.emit('select') })
  }

  handleChange (value, effect, prop) {
    const obj = {}
    const propObj = {}

    propObj[ prop ] = value
    obj[ effect ] = R.merge(this.state[ effect ], propObj)
    this.setState(R.merge(this.state, obj))
  }

  handleLoad (value, effect, prop) {
    if(this.state.audioContext !== null){
      this.state.audioContext.close().then(() => {
        this.setState({ audioContext : null }, () => {
          J.emitter.emit('load')
        })
      })
    }else{
      J.emitter.emit('load')
    }
  }

  selectFile () {
    ReactDOM.render(<Overlay data={ this.state.songs } handleClick={ this.fileSelected } />, document.getElementById('reactContainer'))
  }

  saveSettings () {
    const data = JSON.stringify(R.omit(omitArr, this.state))

    J.postData(`http://localhost:${ this.props.port }/save-settings`, { data }).then(result => {
      this.log(result)
    })
  }

  onMove () {
    J.postData(`http://localhost:${ this.props.port }/move`, { song : `${ this.state.song }.mp3` }).then(() => {
      this.log('moved')
    })
  }

  render () {
    return (
      <div>
        <div id="reactContainer" />
        <div className="tile is-ancestor" id="halfHeight">
          <div className="tile has-text-centered is-4 is-vertical is-parent">
            <div>

              <a className="button is-info is-small is-inverted" onClick={ this.saveSettings }>
                <span className="icon"><i className="fa fa-floppy-o" /></span>
              </a>

              <a className="button is-inverted is-small" onClick={ this.handleLoad }><span className="icon">
                <i className="fa fa-eject" /></span>
              </a>

              <a className="button is-danger is-small is-inverted" onClick={ this.onMove }><span className="icon">
                <i className="fa fa-heart" /></span>
              </a>

              <a className="button is-primary is-inverted is-small" onClick={ this.handleStart }><span className="icon">
                <i className="fa fa-check" /></span>
              </a>

              <a className="button is-success is-inverted is-small" onClick={ this.handleStop }><span className="icon">
                <i className="fa fa-pause-circle-o" /></span>
              </a>

              <a className="button is-success is-inverted is-small" onClick={ this.handlePlay }><span className="icon">
                <i className="fa fa-play-circle-o" /></span>
              </a>

              <a
                className="button is-success is-inverted is-small" id="next-button"
                onClick={ this.handleNext }
              ><span className="icon">
                <i className="fa fa-step-forward" /></span>
              </a>

              <a className="button is-danger is-inverted is-small" onClick={ this.selectFile }><span className="icon">
                <i className="fa fa-plus" /></span>
              </a>

            </div>
            <hr />
            <div className="til is-child box" id="marginlessTuna">
              {this.state.song}
            </div>
            <div className="tile is-child box" id="marginlessTuna">

              <Select
                clearable={ false }
                name="song"
                onChange={ this.handleSelect }
                options={ this.state.selectArr }
                searchable={ false }
                value={ this.state.song }
              />

            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            CHORUS
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Feedback
                <Slider
                  max={ 0.95 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'feedback') } } step={ 0.05 }
                  value={ this.state.tunaChorus.feedback }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Delay
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'delay') } } step={ 0.05 }
                  value={ this.state.tunaChorus.delay }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Depth
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'depth') } } step={ 0.05 }
                  value={ this.state.tunaChorus.depth }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Rate
                <Slider
                  max={ 8 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'rate') } } step={ 0.25 }
                  value={ this.state.tunaChorus.rate }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'bypass') } } step={ 1 }
                  value={ this.state.tunaChorus.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaChorus', 'flag') } } step={ 1 }
                  value={ this.state.tunaChorus.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            DELAY
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Delay Time
                <Slider
                  max={ 1000 } min={ 20 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'delayTime') } } step={ 20 }
                  value={ this.state.tunaDelay.delayTime }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Feedback
                <Slider
                  max={ 0.9 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'feedback') } } step={ 0.05 }
                  value={ this.state.tunaDelay.feedback }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Cutoff
                <Slider
                  max={ 20000 } min={ 50 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'cutoff') } } step={ 50 }
                  value={ this.state.tunaDelay.cutoff }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Wetlevel
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'wetLevel') } } step={ 0.05 }
                  value={ this.state.tunaDelay.wetLevel }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Dry Level
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'dryLevel') } } step={ 0.05 }
                  value={ this.state.tunaDelay.dryLevel }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaDelay', 'flag') } } step={ 1 }
                  value={ this.state.tunaDelay.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            PHASER
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Rate
                <Slider
                  max={ 8 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'rate') } } step={ 0.1 }
                  value={ this.state.tunaPhaser.rate }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Depth
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'depth') } } step={ 0.05 }
                  value={ this.state.tunaPhaser.depth }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Feedback
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'feedback') } } step={ 0.05 }
                  value={ this.state.tunaPhaser.feedback }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Stereo Phase
                <Slider
                  max={ 180 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'stereoPhase') } } step={ 10 }
                  value={ this.state.tunaPhaser.stereoPhase }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Base Modulation Frequency
                <Slider
                  max={ 1500 } min={ 500 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'baseModulationFrequency') } } step={ 100 }
                  value={ this.state.tunaPhaser.baseModulationFrequency }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPhaser', 'flag') } } step={ 1 }
                  value={ this.state.tunaPhaser.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            OVERDRIVE
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Drive
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'drive') } } step={ 0.05 }
                  value={ this.state.tunaOverdrive.drive }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Output Gain
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'outputGain') } } step={ 0.05 }
                  value={ this.state.tunaOverdrive.outputGain }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Curve Amount
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'curveAmount') } } step={ 0.05 }
                  value={ this.state.tunaOverdrive.curveAmount }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Algorithm Index
                <Slider
                  max={ 5 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'algorithmIndex') } } step={ 1 }
                  value={ this.state.tunaOverdrive.algorithmIndex }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'bypass') } } step={ 1 }
                  value={ this.state.tunaOverdrive.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaOverdrive', 'flag') } } step={ 1 }
                  value={ this.state.tunaOverdrive.flag }
                /></label>
            </div>
          </div>
        </div>
        <div className="tile is-ancestor" id="halfHeight">
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            COMPRESSOR
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Threshold
                <Slider
                  max={ 0 } min={ -60 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'threshold') } } step={ 5 }
                  value={ this.state.tunaCompressor.threshold }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Release
                <Slider
                  max={ 2000 } min={ 50 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'release') } } step={ 50 }
                  value={ this.state.tunaCompressor.release }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Makeup Gain
                <Slider
                  max={ 100 } min={ 1 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'makeupGain') } } step={ 1 }
                  value={ this.state.tunaCompressor.makeupGain }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Attack
                <Slider
                  max={ 1000 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'attack') } } step={ 20 }
                  value={ this.state.tunaCompressor.attack }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Ratio
                <Slider
                  max={ 20 } min={ 2 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'ratio') } } step={ 2 }
                  value={ this.state.tunaCompressor.ratio }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Knee
                <Slider
                  max={ 40 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'knee') } } step={ 1 }
                  value={ this.state.tunaCompressor.knee }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Automakeup
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'automakeup') } } step={ 1 }
                  value={ this.state.tunaCompressor.automakeup }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'bypass') } } step={ 1 }
                  value={ this.state.tunaCompressor.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaCompressor', 'flag') } } step={ 1 }
                  value={ this.state.tunaCompressor.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            FILTER
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Frequency
                <Slider
                  max={ 22050 } min={ 50 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'frequency') } } step={ 50 }
                  value={ this.state.tunaFilter.frequency }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Q
                <Slider
                  max={ 100 } min={ 2 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'Q') } } step={ 2 }
                  value={ this.state.tunaFilter.Q }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Gain
                <Slider
                  max={ 40 } min={ -40 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'gain') } } step={ 2 }
                  value={ this.state.tunaFilter.gain }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Filter Type - {filterArr[ this.state.tunaFilter.filterType ]}
                <Slider
                  max={ 7 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'filterType') } } step={ 1 }
                  value={ this.state.tunaFilter.filterType }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'bypass') } } step={ 1 }
                  value={ this.state.tunaFilter.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaFilter', 'flag') } } step={ 1 }
                  value={ this.state.tunaFilter.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            TREMOLO
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Intensity
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaTremolo', 'intensity') } } step={ 0.05 }
                  value={ this.state.tunaTremolo.intensity }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Stereo Phase
                <Slider
                  max={ 180 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaTremolo', 'stereoPhase') } } step={ 10 }
                  value={ this.state.tunaTremolo.stereoPhase }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Rate
                <Slider
                  max={ 11 } min={ 0.2 }
                  onChange={ val => { this.handleChange(val, 'tunaTremolo', 'rate') } } step={ 0.2 }
                  value={ this.state.tunaTremolo.rate }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaTremolo', 'bypass') } } step={ 1 }
                  value={ this.state.tunaTremolo.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaTremolo', 'flag') } } step={ 1 }
                  value={ this.state.tunaTremolo.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            BITCRUSHER
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Bits
                <Slider
                  max={ 16 } min={ 1 }
                  onChange={ val => { this.handleChange(val, 'tunaBitcrusher', 'bits') } } step={ 1 }
                  value={ this.state.tunaBitcrusher.bits }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Buffer Size
                <Slider
                  max={ 5 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaBitcrusher', 'bufferSize') } } step={ 1 }
                  value={ this.state.tunaBitcrusher.bufferSize }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Normfreq
                <Slider
                  max={ 1 } min={ 0.0025 }
                  onChange={ val => { this.handleChange(val, 'tunaBitcrusher', 'normfreq') } } step={ 0.0025 }
                  value={ this.state.tunaBitcrusher.normfreq }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaBitcrusher', 'bypass') } } step={ 1 }
                  value={ this.state.tunaBitcrusher.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaBitcrusher', 'flag') } } step={ 1 }
                  value={ this.state.tunaBitcrusher.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            MOOG FILTER
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Buffer Size
                <Slider
                  max={ 5 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaMoogFilter', 'bufferSize') } } step={ 1 }
                  value={ this.state.tunaMoogFilter.bufferSize }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Cutoff
                <Slider
                  max={ 1 } min={ 0.005 }
                  onChange={ val => { this.handleChange(val, 'tunaMoogFilter', 'cutoff') } } step={ 0.005 }
                  value={ this.state.tunaMoogFilter.cutoff }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Resonance
                <Slider
                  max={ 4 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaMoogFilter', 'resonance') } } step={ 0.2 }
                  value={ this.state.tunaMoogFilter.resonance }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Bypass
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaMoogFilter', 'bypass') } } step={ 1 }
                  value={ this.state.tunaMoogFilter.bypass }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaMoogFilter', 'flag') } } step={ 1 }
                  value={ this.state.tunaMoogFilter.flag }
                /></label>
            </div>
          </div>
          <div className="tile is-2 is-vertical is-parent">
            <div className="has-text-centered" id="marginlessTuna">
            PING PONG
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Feedback
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPingPongDelay', 'feedback') } } step={ 0.05 }
                  value={ this.state.tunaPingPongDelay.feedback }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Wet Level
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPingPongDelay', 'wetLevel') } } step={ 0.05 }
                  value={ this.state.tunaPingPongDelay.wetLevel }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Delay Time Left
                <Slider
                  max={ 1000 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPingPongDelay', 'delayTimeLeft') } } step={ 50 }
                  value={ this.state.tunaPingPongDelay.delayTimeLeft }
                /></label>
            </div>
            <div className="tile is-child box"id="marginlessTuna">
              <label>Delay Time Right
                <Slider
                  max={ 1000 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPingPongDelay', 'delayTimeRight') } } step={ 50 }
                  value={ this.state.tunaPingPongDelay.delayTimeRight }
                /></label>
            </div>
            <div className="tile is-child box" id="marginlessTuna">
              <label>Enable
                <Slider
                  max={ 1 } min={ 0 }
                  onChange={ val => { this.handleChange(val, 'tunaPingPongDelay', 'flag') } } step={ 1 }
                  value={ this.state.tunaPingPongDelay.flag }
                /></label>
            </div>
          </div>
          <Notification isActive={ this.state.notificationState } message={ this.state.notificationMessage } />
        </div>
      </div>
    )
  }

}
