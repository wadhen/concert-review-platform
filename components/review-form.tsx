"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

interface ReviewFormProps {
  onSubmit: (review: {
    userName: string
    rating: number
    title: string
    content: string
  }) => void
  onCancel: () => void
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    userName: "",
    rating: 0,
    title: "",
    content: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.userName && formData.rating && formData.title && formData.content) {
      onSubmit(formData)
      setFormData({ userName: "", rating: 0, title: "", content: "" })
    }
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input
            id="userName"
            value={formData.userName}
            onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || formData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Review Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Summarize your experience"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Your Review</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="Tell us about your experience at this concert..."
          rows={4}
          required
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit Review</Button>
      </div>
    </form>
  )
}
