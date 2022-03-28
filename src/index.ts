import express = require('express');
import { readFileSync, writeFileSync } from 'fs';
import path = require('path');
import { filePath } from './filePath';
import { hostTracker } from './hostTracker';

const app = express();

app.use('/', hostTracker);
app.get('/', (req, res) => {
  const count = readFileSync(filePath('../data/count.txt'), 'utf8');
  const site = readFileSync(filePath('index.html'), 'utf8');
  res.send(site.replace('COUNT', toSpans(count)));
  const newCount = parseInt(count) + 1;
  writeFileSync(filePath('../data/count.txt'), newCount.toString());
});

app.listen(3000, () => {
  console.log('http://localhost:3000/');
});

function toSpans(count: string) {
  function toSpan(nr: string) {
    return `<span id="span-${nr}">${nr}</span>`;
  }

  let spans = '';
  for (let i = 0; i < count.length; i++) {
    spans += toSpan(count[i]);
  }
  return spans;
}
