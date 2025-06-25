import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star } from "lucide-react"

const concerts = [
  {
    id: 1,
    title: "Arctic Monkeys World Tour",
    artist: "Arctic Monkeys",
    date: "2024-03-15",
    venue: "Madison Square Garden",
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=500",
    genre: "Indie Rock",
    rating: 4.5,
    reviewCount: 127,
  },
  {
    id: 2,
    title: "Taylor Swift Eras Tour",
    artist: "Taylor Swift",
    date: "2024-04-22",
    venue: "MetLife Stadium",
    location: "East Rutherford, NJ",
    image: "/placeholder.svg?height=300&width=500",
    genre: "Pop",
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: 3,
    title: "The Weeknd After Hours Tour",
    artist: "The Weeknd",
    date: "2024-05-10",
    venue: "Barclays Center",
    location: "Brooklyn, NY",
    image: "/placeholder.svg?height=300&width=500",
    genre: "R&B",
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: 4,
    title: "Billie Eilish Happier Than Ever Tour",
    artist: "Billie Eilish",
    date: "2024-06-05",
    venue: "Radio City Music Hall",
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=500",
    genre: "Alternative",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: 5,
    title: "Ed Sheeran Mathematics Tour",
    artist: "Ed Sheeran",
    date: "2024-07-18",
    venue: "Central Park SummerStage",
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=500",
    genre: "Pop",
    rating: 4.4,
    reviewCount: 203,
  },
  {
    id: 6,
    title: "Dua Lipa Future Nostalgia Tour",
    artist: "Dua Lipa",
    date: "2024-08-12",
    venue: "Brooklyn Steel",
    location: "Brooklyn, NY",
    image: "/placeholder.svg?height=300&width=500",
    genre: "Pop",
    rating: 4.7,
    reviewCount: 98,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">ConcertReviews</h1>
          <p className="text-muted-foreground mt-2">Discover and review amazing live music experiences</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerts.map((concert) => (
            <Link key={concert.id} href={`/concert/${concert.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={concert.image || "/placeholder.svg"}
                    alt={concert.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{concert.genre}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{concert.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground">{concert.artist}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(concert.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{concert.venue}</div>
                      <div>{concert.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{concert.rating}</span>
                      <span className="text-muted-foreground">({concert.reviewCount})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
