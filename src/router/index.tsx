import { createBrowserRouter } from "react-router-dom";
import Home from '@/pages/Home/index.tsx'
import Base64ToPdf from '@/pages/Base64/Base64ToPdf'
import JsonTools from "@/pages/JSON/JSONTools/JsonToolPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Base64ToPdf',
    element: <Base64ToPdf />
  },
  {
    path: '/JsonTools',
    element: <JsonTools />
  },
])

export default router