"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, MapPin, Star, Plus } from "lucide-react"
import { ReviewForm } from "@/components/review-form"

// Mock data - in a real app, this would come from a database
const concertData = {
  1: {
    id: 1,
    title: "Arctic Monkeys World Tour",
    artist: "Arctic Monkeys",
    date: "2024-03-15",
    venue: "Madison Square Garden",
    location: "New York, NY",
    image: "/placeholder.svg?height=400&width=800",
    genre: "Indie Rock",
    description: "An electrifying performance featuring hits from their latest album and classic favorites.",
    setlist: ["Do I Wanna Know?", "R U Mine?", "Arabella", "505", "I Bet You Look Good on the Dancefloor"],
  },
}

const mockReviews = [
  {
    id: 1,
    concertId: 1,
    userName: "MusicLover23",
    rating: 5,
    title: "Absolutely incredible show!",
    content:
      "Arctic Monkeys delivered an unforgettable performance. Alex Turner's vocals were on point and the energy was electric throughout the entire show. The setlist was perfect with a great mix of old and new songs.",
    date: "2024-03-16",
    helpful: 24,
  },
  {
    id: 2,
    concertId: 1,
    userName: "RockFan87",
    rating: 4,
    title: "Great performance, amazing venue",
    content:
      "Really enjoyed the concert! The sound quality at MSG was fantastic and you could tell the band was having fun on stage. Only complaint is that I wished they played a few more songs from their earlier albums.",
    date: "2024-03-17",
    helpful: 12,
  },
  {
    id: 3,
    concertId: 1,
    userName: "ConcertGoer",
    rating: 5,
    title: "Best concert I've been to this year",
    content:
      "The atmosphere was incredible from start to finish. Every song was performed flawlessly and the crowd was so engaged. Definitely worth every penny!",
    date: "2024-03-18",
    helpful: 18,
  },
]

export default function ConcertPage({ params }: { params: { id: string } }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState(mockReviews)

  const concert = concertData[Number.parseInt(params.id) as keyof typeof concertData]

  if (!concert) {
    return <div>Concert not found</div>
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const handleReviewSubmit = (newReview: any) => {
    const review = {
      id: reviews.length + 1,
      concertId: concert.id,
      ...newReview,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }
    setReviews([review, ...reviews])
    setShowReviewForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to concerts
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Concert Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img src={concert.image || "/placeholder.svg"} alt={concert.title} className="object-cover w-full h-full" />
          </div>

          <div className="space-y-4">
            <div>
              <Badge className="mb-2">{concert.genre}</Badge>
              <h1 className="text-3xl font-bold">{concert.title}</h1>
              <p className="text-xl text-muted-foreground">{concert.artist}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(concert.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <div>
                  <div className="font-medium">{concert.venue}</div>
                  <div className="text-muted-foreground">{concert.location}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground">{concert.description}</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <Button onClick={() => setShowReviewForm(!showReviewForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              Write a Review
            </Button>
          </div>

          {showReviewForm && (
            <Card>
              <CardHeader>
                <CardTitle>Write Your Review</CardTitle>
                <CardDescription>Share your experience at this concert</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm onSubmit={handleReviewSubmit} onCancel={() => setShowReviewForm(false)} />
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{review.content}</p>
                  <div className="text-sm text-muted-foreground">{review.helpful} people found this helpful</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
