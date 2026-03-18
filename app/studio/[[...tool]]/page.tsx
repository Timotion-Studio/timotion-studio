import StudioClient from './StudioClient'

export default function StudioPage() {
  return <StudioClient token={process.env.SANITY_API_TOKEN!} />
}
