<<<<<<< HEAD
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
=======
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
>>>>>>> 5bb22b8 (edit ui and api)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
<<<<<<< HEAD
=======

>>>>>>> 5bb22b8 (edit ui and api)
