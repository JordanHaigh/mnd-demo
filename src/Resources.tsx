import { ArrowUpRight, BookOpen, FileText } from 'lucide-react';
import { PageTitle } from './ui';

const resources = [
  { title: 'Speech and communication', url: 'https://www.mndaustralia.org.au/info/living-with-mnd/speech-and-communication/' },
  { title: 'Voice and message banking', url: 'https://www.mndaustralia.org.au/media/1wulmsp0/voice-and-message-banking-guide.pdf', pdf: true },
  { title: 'Information guides', url: 'https://www.mndaustralia.org.au/info/information-resources/' },
  { title: 'Find services and support', url: 'https://www.mndaustralia.org.au/info/find-services-support/' },
  { title: 'MND research', url: 'https://www.mndaustralia.org.au/research' },
  { title: 'MiNDAus Registry', url: 'https://www.mndaustralia.org.au/research/mindaus-registry/' },
];

export function Resources() {
  return <>
    <PageTitle title="Resources" eyebrow="MND AUSTRALIA" />
    <div className="resource-grid">
      {resources.map(resource => <a className="resource-card" key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
        <span className="resource-icon">{resource.pdf ? <FileText size={23} /> : <BookOpen size={23} />}</span>
        <span><h2>{resource.title}</h2><small>MND Australia{resource.pdf ? ' · PDF' : ''}</small></span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </a>)}
    </div>
  </>;
}
