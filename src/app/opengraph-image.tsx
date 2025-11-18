import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Ayo Sehat - Portal Kesehatan Keluarga Indonesia'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #18b3ab 0%, #15a098 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          Ayo Sehat
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, marginBottom: 40 }}>
          Kementerian Kesehatan RI
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Portal Kesehatan Keluarga Indonesia
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}