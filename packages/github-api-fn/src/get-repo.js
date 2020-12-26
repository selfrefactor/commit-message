import axios  from 'axios'

export async function getRepo(repo){
  const token = process.env.GITHUB
  if(!token) throw new Error("!token")
  if(!repo.includes('/')) throw new Error(`wrong repo input - ${repo}`)
  
  const url = `https://api.github.com/repos/${ repo }`
  const { status, data } = await axios({
    method  : 'get',
    url,
    timeout : 7000,
    headers : { Authorization : `token ${ process.env.GITHUB }` },
  })

  return data
}