"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Loader2, Plus, Search, Edit, Trash2, Eye } from "lucide-react"
<<<<<<< HEAD
=======
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
>>>>>>> 5bb22b8 (edit ui and api)

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
<<<<<<< HEAD
=======
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
>>>>>>> 5bb22b8 (edit ui and api)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    checkAdmin()
<<<<<<< HEAD
    fetchPosts()
  }, [])

  const checkAdmin = async () => {
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
      router.push("/")
=======
  }, [])

  const checkAdmin = async () => {
    setLoading(true)
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
        setError("Anda tidak memiliki akses ke halaman ini.")
        setIsAdmin(false)
      } else {
        setIsAdmin(true)
        fetchPosts()
      }
    } catch (err) {
      console.error("Error checking admin:", err)
      setError("Terjadi kesalahan saat memeriksa status admin.")
    } finally {
      setLoading(false)
>>>>>>> 5bb22b8 (edit ui and api)
    }
  }

  const fetchPosts = async () => {
<<<<<<< HEAD
    setLoading(true)

    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
    } else {
      setPosts(data || [])
    }

    setLoading(false)
  }

  const deletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting post:", error)
    } else {
      fetchPosts()
=======
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setPosts(data || [])
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError("Gagal mengambil data blog.")
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      return
    }

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) {
        throw error
      }

      fetchPosts()
    } catch (err) {
      console.error("Error deleting post:", err)
      setError("Gagal menghapus artikel.")
>>>>>>> 5bb22b8 (edit ui and api)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

<<<<<<< HEAD
=======
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Anda tidak memiliki akses ke halaman ini."}</AlertDescription>
        </Alert>
      </div>
    )
  }

>>>>>>> 5bb22b8 (edit ui and api)
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
<<<<<<< HEAD
            <CardTitle className="text-2xl">Blog Posts</CardTitle>
            <CardDescription>Manage your blog posts</CardDescription>
=======
            <CardTitle className="text-2xl">Artikel Blog</CardTitle>
            <CardDescription>Kelola artikel blog Anda</CardDescription>
>>>>>>> 5bb22b8 (edit ui and api)
          </div>
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
<<<<<<< HEAD
              New Post
=======
              Artikel Baru
>>>>>>> 5bb22b8 (edit ui and api)
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
<<<<<<< HEAD
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
=======
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari artikel..."
>>>>>>> 5bb22b8 (edit ui and api)
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
<<<<<<< HEAD
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
=======
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
>>>>>>> 5bb22b8 (edit ui and api)
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
<<<<<<< HEAD
                      <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
=======
                      <TableCell>
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
>>>>>>> 5bb22b8 (edit ui and api)
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/blog/${post.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
<<<<<<< HEAD
              <p className="text-muted-foreground">No posts found</p>
=======
              <p className="text-muted-foreground">Tidak ada artikel ditemukan</p>
>>>>>>> 5bb22b8 (edit ui and api)
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

