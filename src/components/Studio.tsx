import { Studio } from 'sanity'
import config from '../../sanity/sanity.config'

export default function StudioComponent() {
  return <Studio config={config} />
}
