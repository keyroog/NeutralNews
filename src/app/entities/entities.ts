export interface INews  {
  date : Date
  description : string
  name : string
  provider: Provider
  url:string
  sentiment: string
  sentimentScores : SentimentScores
  category: string
}

export interface IBingResponse{
  documents: INews[],
  sentiment: Sentiment[],
}

enum Sentiment{
  'positive' = "Positivo",
  'negative' = "Negativo",
  'neutral' = "Neutro",
}

interface SentimentScores{
  positive: number,
  negative: number,
  neutral: number
}

interface Provider {
  name: string
  type:string
}

interface Thumbnail{
  url: string
  width: number
  height: number
}

export const Categorie = [
  {id: 'ScienceAndTechnology', name : 'Science & Technology'},
  {id: 'Business', name : 'Business'},
  {id: 'Entertainment', name : 'Entertainment'},
  {id: 'World', name : 'World'},
  {id: 'Sports', name : 'Sports'},
  {id: 'Culture', name : 'Culture'},
]