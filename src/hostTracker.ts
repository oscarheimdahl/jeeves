import { RequestHandler } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { filePath } from './filePath';
const ipfetch = require('ip-fetch');

export const hostTracker: RequestHandler = (req, res, next) => {
  const host = req.headers.host;
  console.log(host);
  saveHostInfo(host);
  next();
};

const saveHostInfo = async (host) => {
  const hosts = JSON.parse(readFileSync(filePath('../data/hosts.json'), 'utf8'));
  if (!hosts[host]) hosts[host] = {};
  hosts[host]['lastVisited'] = new Date().toISOString();
  const hostInfo = await ipfetch.getLocationNpm(host); // example => info = await ipfetch.getLocationNpm('1.1.1.1');
  hosts[host]['info'] = hostInfo;
  writeFileSync(filePath('../data/hosts.json'), JSON.stringify(hosts));
};
