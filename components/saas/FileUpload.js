'use client';
import { useRef, useState } from 'react';
import { Panel, Button, Icon, Notice } from './UI';

export default function FileUpload() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  function addFiles(list) {
    const incoming = [...list];
    const tooLarge = incoming.filter(file => file.size > 10 * 1024 * 1024);
    setError(tooLarge.length ? `${tooLarge.map(file => file.name).join(', ')} exceeds the 10 MB limit.` : '');
    setFiles(current => { const unique = new Map(current.map(file => [`${file.name}:${file.size}:${file.lastModified}`, file])); incoming.filter(file => file.size <= 10 * 1024 * 1024).forEach(file => unique.set(`${file.name}:${file.size}:${file.lastModified}`, file)); return [...unique.values()]; });
    setComplete(false);
  }
  return <Panel title="Good things start with a drop." description="Bring your files into your workspace. Up to 10 MB each." icon="upload"><div className={`s-dropzone ${dragging ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}><span className="s-upload-orbit"><Icon name="upload" size={32} /></span><h3>{dragging ? 'Let go. We’ve got it.' : 'Drop your files right here'}</h3><p>or choose something from your device</p><Button secondary onClick={() => inputRef.current.click()}>Browse files</Button><input className="s-sr-only" tabIndex={-1} ref={inputRef} aria-label="Choose files" type="file" multiple onChange={e => { addFiles(e.target.files); e.target.value = ''; }} /></div><Notice error>{error}</Notice><div className="s-files">{files.map((file, i) => <div className="s-row" key={`${file.name}:${file.size}:${file.lastModified}`}><Icon name={complete ? 'check' : 'code'} /><div><b>{file.name}</b><small>{(file.size / 1024).toFixed(1)} KB · {complete ? 'Ready locally' : 'Queued'}</small></div><button className="s-icon-button" aria-label={`Remove ${file.name}`} onClick={() => { setFiles(v => v.filter((_, index) => index !== i)); setComplete(false); }}><Icon name="close" size={16} /></button></div>)}</div><Button disabled={!files.length || complete} onClick={() => setComplete(true)}>{complete ? 'Files ready ✓' : `Prepare ${files.length || ''} file${files.length === 1 ? '' : 's'}`}</Button>{complete && <Notice>Files prepared in this browser only. Nothing was uploaded to a server.</Notice>}</Panel>;
}
