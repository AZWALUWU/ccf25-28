import { redirect } from "next/navigation"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, BookOpen, Settings } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (!profile || !profile.preferences?.is_admin) {
    redirect("/")
  }

  // Fetch counts
  const { count: blogCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

  const { count: guidesCount } = await supabase.from("guides").select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  return (
    <div className="container mx-auto px-4 py-12">
<<<<<<< HEAD
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
=======
      <h1 className="text-3xl font-bold mb-8">Dasbor Admin</h1>
>>>>>>> 5bb22b8 (edit ui and api)

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
=======
            <CardTitle className="text-sm font-medium">Artikel Blog</CardTitle>
>>>>>>> 5bb22b8 (edit ui and api)
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount || 0}</div>
<<<<<<< HEAD
            <p className="text-xs text-muted-foreground">Total published blog posts</p>
=======
            <p className="text-xs text-muted-foreground">Total artikel blog yang dipublikasikan</p>
>>>>>>> 5bb22b8 (edit ui and api)
          </CardContent>
          <CardFooter>
            <Link href="/admin/blog">
              <Button variant="outline" size="sm">
<<<<<<< HEAD
                Manage Posts
=======
                Kelola Artikel
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium">Health Guides</CardTitle>
=======
            <CardTitle className="text-sm font-medium">Panduan Kesehatan</CardTitle>
>>>>>>> 5bb22b8 (edit ui and api)
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guidesCount || 0}</div>
<<<<<<< HEAD
            <p className="text-xs text-muted-foreground">Total published guides</p>
=======
            <p className="text-xs text-muted-foreground">Total panduan yang dipublikasikan</p>
>>>>>>> 5bb22b8 (edit ui and api)
          </CardContent>
          <CardFooter>
            <Link href="/admin/guides">
              <Button variant="outline" size="sm">
<<<<<<< HEAD
                Manage Guides
=======
                Kelola Panduan
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium">Users</CardTitle>
=======
            <CardTitle className="text-sm font-medium">Pengguna</CardTitle>
>>>>>>> 5bb22b8 (edit ui and api)
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount || 0}</div>
<<<<<<< HEAD
            <p className="text-xs text-muted-foreground">Total registered users</p>
=======
            <p className="text-xs text-muted-foreground">Total pengguna terdaftar</p>
>>>>>>> 5bb22b8 (edit ui and api)
          </CardContent>
          <CardFooter>
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
<<<<<<< HEAD
                Manage Users
=======
                Kelola Pengguna
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
<<<<<<< HEAD
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
=======
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Tugas administratif umum</CardDescription>
>>>>>>> 5bb22b8 (edit ui and api)
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/blog/new">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
<<<<<<< HEAD
                Create New Blog Post
=======
                Buat Artikel Blog Baru
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
            <Link href="/admin/guides/new">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
<<<<<<< HEAD
                Create New Guide
=======
                Buat Panduan Baru
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
<<<<<<< HEAD
                System Settings
=======
                Pengaturan Sistem
>>>>>>> 5bb22b8 (edit ui and api)
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
<<<<<<< HEAD
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
=======
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Tindakan terbaru di platform</CardDescription>
>>>>>>> 5bb22b8 (edit ui and api)
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1">
<<<<<<< HEAD
                  <p className="text-sm">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
=======
                  <p className="text-sm">Pengguna baru terdaftar</p>
                  <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
>>>>>>> 5bb22b8 (edit ui and api)
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="flex-1">
<<<<<<< HEAD
                  <p className="text-sm">Blog post published</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
=======
                  <p className="text-sm">Artikel blog dipublikasikan</p>
                  <p className="text-xs text-muted-foreground">Kemarin</p>
>>>>>>> 5bb22b8 (edit ui and api)
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="flex-1">
<<<<<<< HEAD
                  <p className="text-sm">Guide updated</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
=======
                  <p className="text-sm">Panduan diperbarui</p>
                  <p className="text-xs text-muted-foreground">3 hari yang lalu</p>
>>>>>>> 5bb22b8 (edit ui and api)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

