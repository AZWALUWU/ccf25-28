"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Loader2 } from "lucide-react"
<<<<<<< HEAD

// Blog categories
const categories = [
  "Health Tips",
  "Nutrition",
  "First Aid",
  "Mental Health",
  "Wellness",
  "Chronic Care",
  "Preventive Care",
=======
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Blog categories
const categories = [
  "Tips Kesehatan",
  "Nutrisi",
  "Pertolongan Pertama",
  "Kesehatan Mental",
  "Kesejahteraan",
  "Perawatan Kronis",
  "Pencegahan",
>>>>>>> 5bb22b8 (edit ui and api)
]

interface BlogEditorProps {
  post?: any
  isEdit?: boolean
}

export default function BlogEditor({ post, isEdit = false }: BlogEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
=======
  const [error, setError] = useState<string | null>(null)
>>>>>>> 5bb22b8 (edit ui and api)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
<<<<<<< HEAD
=======
    checkAdmin()
  }, [])

  useEffect(() => {
>>>>>>> 5bb22b8 (edit ui and api)
    if (post && isEdit) {
      setTitle(post.title || "")
      setContent(post.content || "")
      setExcerpt(post.excerpt || "")
      setCategory(post.category || "")
      setImageUrl(post.image_url || "")
    }
  }, [post, isEdit])

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
=======
  const checkAdmin = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

      if (!profile || !profile.preferences?.is_admin) {
        setError("Anda tidak memiliki akses untuk mengedit artikel.")
        router.push("/")
      }
    } catch (err) {
      console.error("Error checking admin:", err)
      setError("Terjadi kesalahan saat memeriksa status admin.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
>>>>>>> 5bb22b8 (edit ui and api)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

<<<<<<< HEAD
=======
      // Check if user is admin
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

      if (!profile || !profile.preferences?.is_admin) {
        throw new Error("Anda tidak memiliki akses untuk mengedit artikel.")
      }

>>>>>>> 5bb22b8 (edit ui and api)
      const postData = {
        title,
        content,
        excerpt,
        category,
        image_url: imageUrl || "/placeholder.svg?height=400&width=800",
        author_id: session.user.id,
      }

      if (isEdit && post) {
        // Update existing post
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", post.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert(postData)

        if (error) throw error
      }

      router.push("/admin/blog")
      router.refresh()
<<<<<<< HEAD
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Failed to save post. Please try again.")
=======
    } catch (err: any) {
      console.error("Error saving post:", err)
      setError(err.message || "Gagal menyimpan artikel. Silakan coba lagi.")
>>>>>>> 5bb22b8 (edit ui and api)
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
=======
  if (error && error.includes("tidak memiliki akses")) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Artikel Blog" : "Buat Artikel Blog Baru"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Artikel Blog" : "Buat Artikel Blog Baru"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
>>>>>>> 5bb22b8 (edit ui and api)
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
<<<<<<< HEAD
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} required />
            <p className="text-sm text-muted-foreground">A brief summary of the post that will appear in listings.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required />
            <p className="text-sm text-muted-foreground">
              HTML content is supported. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc. for formatting.
=======
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} required />
            <p className="text-sm text-muted-foreground">
              Ringkasan singkat artikel yang akan muncul di daftar artikel.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required />
            <p className="text-sm text-muted-foreground">
              Konten HTML didukung. Gunakan &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, dll. untuk pemformatan.
>>>>>>> 5bb22b8 (edit ui and api)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
<<<<<<< HEAD
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
=======
              <Label htmlFor="category">Kategori</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Pilih kategori" />
>>>>>>> 5bb22b8 (edit ui and api)
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
<<<<<<< HEAD
              <Label htmlFor="imageUrl">Image URL</Label>
=======
              <Label htmlFor="imageUrl">URL Gambar</Label>
>>>>>>> 5bb22b8 (edit ui and api)
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/placeholder.svg?height=400&width=800"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
<<<<<<< HEAD
            Cancel
=======
            Batal
>>>>>>> 5bb22b8 (edit ui and api)
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
<<<<<<< HEAD
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : isEdit ? (
              "Update Post"
            ) : (
              "Create Post"
=======
                {isEdit ? "Memperbarui..." : "Membuat..."}
              </>
            ) : isEdit ? (
              "Perbarui Artikel"
            ) : (
              "Buat Artikel"
>>>>>>> 5bb22b8 (edit ui and api)
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

