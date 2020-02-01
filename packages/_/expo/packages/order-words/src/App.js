import React from 'react'
import { omit } from 'rambdax'
import { StyleSheet, Text, View } from 'react-native'
import { connect, Provider } from 'react-redux'
import { createStoreBee } from './bees/createStore'
import { press, next } from './actions'

const store = createStoreBee()
const BACKGROUND = '#e7e7e7'

const CONTAINER = {
  flex           : 1,
  flexWrap       : 'wrap',
  alignItems     : 'stretch',
  justifyContent : 'space-evenly',
}

const nextStyle = {
  fontWeight : 'bold',
  fontSize   : 33,
  padding    : 15,
  margin     : 30,
  color      : BACKGROUND,
}

const itemCell = {
  padding         : 4,
  margin          : 8,
  justifyContent  : 'center',
  alignItems      : 'center',
  minHeight       : '18%',
  backgroundColor : '#5d5a58',
  width           : 'auto',
}

const translationCell = omit('backgroundColor')(itemCell)

const styles = StyleSheet.create({
  rootContainer : {
    flex            : 0,
    backgroundColor : BACKGROUND,
    width           : '100%',
    height          : '100%',
  },
  translationMargin : {
    flex            : 0,
    backgroundColor : BACKGROUND,
    width           : '100%',
    height          : '5%',
  },
  translation : {
    flex            : 0,
    backgroundColor : BACKGROUND,
    width           : '100%',
    height          : '10%',
  },
  genericContainer : CONTAINER,
  answer           : {
    flex            : 0,
    backgroundColor : '#9eb4ad',
    width           : '100%',
    height          : '10%',
  },
  item : {
    flex   : 0,
    width  : '100%',
    height : '75%',
  },
  itemContainer : {
    flex           : 1,
    flexDirection  : 'row',
    flexWrap       : 'wrap',
    alignItems     : 'stretch',
    justifyContent : 'space-evenly',
  },
  itemCell,
  itemSolvedCell : {
    ...itemCell,
    backgroundColor : BACKGROUND,
  },
})

function getCellStyle(word){
  return word.hide ?
    styles.itemSolvedCell :
    styles.itemCell
}

function getItemStyle(word){
  const itemStyle = {
    fontWeight : 'bold',
    fontSize   : 18.8,
    color      : '#e4e1e1',
  }
  const whenWrongStyle = {
    ...itemStyle,
    color : '#ffa0aa',
  }
  const whenSolvedStyle = {
    ...itemStyle,
    color : BACKGROUND,
  }

  if (word.hide) return whenSolvedStyle
  if (word.wrong) return whenWrongStyle

  return itemStyle
}

class Root extends React.Component{
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.getVisibleAnswer = this.getVisibleAnswer.bind(this)
    this.getTranslation = this.getTranslation.bind(this)
  }

  handlePress(i){
    return () => this.props.dispatch(press(i))
  }

  handleNext(){
    this.props.dispatch(next())
  }

  getVisibleAnswer(){
    const { answer, index } = this.props.store

    return answer.filter((_, i) => i < index).join(' ')
  }

  getTranslation(){
    const { currentIndex, db } = this.props.store

    return db[ currentIndex ].to
  }

  render(){
    const { words, showNext } = this.props.store
    const nextButton = () =>
      <View style={ styles.itemContainer }>
        <View style={ styles.itemCell }>
          <Text onPress={ this.handleNext } style={ nextStyle }>
              Next
          </Text>
        </View>
      </View>

    const listOfQuestions = () =>
      <View style={ styles.itemContainer }>
        {words.map(
          (word, i) => 
              <View 
                key={`${words[0].word}-${i}`} 
                style={getCellStyle(word)}
              >
                <Text
                  onPress={this.handlePress(i)} 
                  style={getItemStyle(word)}
                >
                  {word.word}
                </Text>
              </View>
            
        )}
      </View>

    return (
      <View style={ styles.rootContainer }>

        <View style={ styles.translationMargin } />

        <View style={ styles.translation }>
          <View style={ styles.genericContainer }>
            <Text
              onPress={ this.handleNext }
              style={ translationCell }
            >
              {this.getTranslation()}
            </Text>
          </View>
        </View>

        <View style={ styles.answer }>
          <View style={ styles.genericContainer }>
            <Text style={ translationCell }>
              {this.getVisibleAnswer()}
            </Text>
          </View>
        </View>

        <View style={ styles.item }>
          {
            showNext ?
              nextButton() :
              listOfQuestions()
          }
        </View>

      </View>
    )
  }
}

const connectComponent = ({ store }) => ({ store })
const RootWrapped = connect(connectComponent)(Root)

const App = () =>
  (<Provider store={store}>
    <RootWrapped />
  </Provider>)

export default App
