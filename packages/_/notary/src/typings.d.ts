interface Result {
  acreage: string 
  address: string 
  identificator: string
  locationRegister: string 
  purpose: string
  permanentPurpose: string
  oldID: string
  previousNumber: string
  neighbours: string
  skitsa: string 
  zapoved: string
}

interface Match{
  regex: RegExp
  regexRemove: RegExp
  text: string
  label: string
}

interface MatchTwoSteps{
  regex: RegExp
  regexFirstRemove: RegExp
  regexSecondRemove: RegExp
  text: string
  label: string
}

interface BuildSamostoyatelen{
  acreage: string,
  address: string,
  attachments: string,
  id: string,
  locationRegister: string,
  neighboursAboveFloor: string,
  neighboursBelowFloor: string,
  neighboursSameFloor: string,
  shema: string,
  text: string,
  zapoved: string,
}

type ReturnString = (input: string) => string

type MatchFn = (label: string, fn?: ReturnString) => string

// EXPORTED
type Mode = 'POZEMLEN' | 'SAMOSTOYATELEN'

interface Methods{
  [key: string]: (convertedText: string) => string
} 

type notary = (sourceFilePath: string, mode?: Mode) => Promise<string>