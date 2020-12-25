import { dropLast, filter, piped, remove, split } from "rambdax";

export function getRepoData(rawData){
  return piped(rawData, remove(/\n/g),split(' '), 
  filter(x => x.trim()),
  x => ({
    repoUrl: (dropLast(2, x)).join(''),
    stars: Number(x[3])
  })
  ) 
}