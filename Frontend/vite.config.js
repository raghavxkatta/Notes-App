import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
proxy:{
  /* toh woh jo problem aa rhi thi cross origin ki woh yaha se as jaha pe bhi ab yeh /api dekhega uske aage yeh puri url paste kardeg also yeh backend waali request  */
'/api':{
  target:'http://localhost:5000',
  changeOrigin:true,
  rewrite:path=>path.replace(/^\/api/,'')
}
}
  },
  plugins: [
    react(),
    tailwindcss(),
  ]
  ,

})
