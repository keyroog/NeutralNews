export interface INews  {
  date : Date
  description : string
  name : string
  provider: Provider
  url:string
  sentiment: Sentiment
  sentimetScores : SentimentScores
}

enum Sentiment{
  positive = "Positivo",
  negative = "Negativo",
  neutral = "Neutro",
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