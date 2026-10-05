#!/usr/bin/env python3
"""List arXiv papers by an author and mark which are already linked from the site.

Usage: arxiv_check.py ["Author Name"]   (default "Yair Amar")
Prints one line per paper: NEW|ON-SITE  id  first-submitted  title  |  authors
"""
import os
import subprocess
import sys
import urllib.parse
import xml.etree.ElementTree as ET

NS = {'a': 'http://www.w3.org/2005/Atom'}
name = sys.argv[1] if len(sys.argv) > 1 else 'Yair Amar'
url = ('https://export.arxiv.org/api/query?max_results=100&sortBy=submittedDate&search_query='
       + urllib.parse.quote(f'au:"{name}"'))
# urllib's default user agent is throttled by arXiv; curl is not.
xml = subprocess.run(['curl', '-sL', url], check=True, capture_output=True).stdout
root = ET.fromstring(xml)

root_dir = subprocess.run(['git', '-C', os.path.dirname(os.path.abspath(__file__)), 'rev-parse', '--show-toplevel'],
                          check=True, capture_output=True, text=True).stdout.strip()
site = open(os.path.join(root_dir, 'src/data/site.ts')).read()

entries = root.findall('a:entry', NS)
if not entries:
    print(f'no arXiv results for "{name}"')
for e in entries:
    arxiv_id = e.find('a:id', NS).text.split('/abs/')[-1].split('v')[0]
    title = ' '.join(e.find('a:title', NS).text.split())
    authors = ', '.join(a.find('a:name', NS).text for a in e.findall('a:author', NS))
    status = 'ON-SITE' if arxiv_id in site else 'NEW'
    print(f'{status:7}  {arxiv_id}  {e.find("a:published", NS).text[:10]}  {title}  |  {authors}')
